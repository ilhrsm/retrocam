"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getOrderById, updateOrderStatus } from "@/lib/firebase/orders";
import { OrderProgress } from "@/components/order/OrderProgress";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Aperture } from "@/components/ui/Aperture";
import { useToast } from "@/context/ToastContext";
import { formatDate, formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABEL, type Order, type OrderStatus } from "@/lib/types";

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  payment_checking: "paid",
  paid: "preparing",
  preparing: "shipping",
  shipping: "completed",
};

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!params.id) return;
    getOrderById(params.id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [params.id]);

  async function advanceStatus() {
    if (!order) return;
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, next);
      setOrder({ ...order, status: next });
      showToast(`${ORDER_STATUS_LABEL[next]} 상태로 변경했습니다`, "success");
    } finally {
      setUpdating(false);
    }
  }

  async function cancelOrder() {
    if (!order) return;
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, "cancelled");
      setOrder({ ...order, status: "cancelled" });
      showToast("주문이 취소되었습니다", "success");
    } finally {
      setUpdating(false);
      setCancelConfirm(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Aperture size={28} className="animate-spin text-ink/25" />
      </div>
    );
  }

  if (!order) {
    return <p className="font-body text-sm text-muted">주문을 찾을 수 없습니다.</p>;
  }

  const next = NEXT_STATUS[order.status];

  return (
    <div>
      <p className="font-mono text-xs text-muted">{order.orderNumber}</p>
      <h1 className="mt-1 mb-8 font-display text-2xl text-ink">주문 상세</h1>

      <div className="mb-8 overflow-x-auto rounded-lg border border-line px-6 py-8">
        <OrderProgress status={order.status} />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {next && (
          <Button onClick={advanceStatus} disabled={updating}>
            {ORDER_STATUS_LABEL[next]}(으)로 변경
          </Button>
        )}
        {order.status !== "cancelled" && order.status !== "completed" && (
          <Button variant="danger" onClick={() => setCancelConfirm(true)} disabled={updating}>
            주문 취소
          </Button>
        )}
      </div>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-body text-sm font-medium text-ink">구매자 정보</h2>
          <div className="flex flex-col gap-1 font-body text-sm text-ink/80">
            <p>{order.buyerName}</p>
            <p>{order.buyerPhone}</p>
            <p>{order.shippingAddress}</p>
            <p className="text-xs text-muted">{formatDate(order.createdAt)} 주문</p>
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-body text-sm font-medium text-ink">결제 정보</h2>
          <div className="flex justify-between font-body text-sm">
            <span className="text-muted">총 결제금액</span>
            <span className="font-mono text-ink">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-body text-sm font-medium text-ink">주문 상품</h2>
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {order.items.map((item, i) => (
            <li key={i} className="flex gap-4 py-4">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-line">
                {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
              </div>
              <div className="flex-1">
                <p className="font-body text-xs text-muted">{item.brand}</p>
                <p className="font-body text-sm text-ink">{item.name}</p>
                <p className="font-body text-xs text-muted">수량 {item.quantity}개</p>
              </div>
              <p className="font-mono text-sm text-ink">{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
      </section>

      <ConfirmModal
        open={cancelConfirm}
        title="주문을 취소할까요?"
        description="취소 후에는 되돌릴 수 없습니다."
        confirmLabel="주문 취소"
        danger
        onConfirm={cancelOrder}
        onCancel={() => setCancelConfirm(false)}
      />
    </div>
  );
}
