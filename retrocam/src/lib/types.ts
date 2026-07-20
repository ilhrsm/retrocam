export type UserRole = "user" | "admin";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  profileImage?: string;
  role: UserRole;
  createdAt: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  specs: ProductSpec[];
  images: string[];
  coverImage: string;
  stock: number;
  collection?: string;
  hidden: boolean;
  featured: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export type OrderStatus =
  | "waiting_payment"
  | "payment_checking"
  | "paid"
  | "preparing"
  | "shipping"
  | "completed"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  buyerName: string;
  buyerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  createdAt: number;
  updatedAt: number;
}

export interface HeroSettings {
  imageUrl: string;
  title: string;
  description: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  featuredProductIds: string[];
  collections: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
  }[];
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  waiting_payment: "입금 대기",
  payment_checking: "입금 확인 중",
  paid: "결제 완료",
  preparing: "배송 준비중",
  shipping: "배송중",
  completed: "배송 완료",
  cancelled: "주문 취소",
};

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "waiting_payment",
  "payment_checking",
  "paid",
  "preparing",
  "shipping",
  "completed",
];
