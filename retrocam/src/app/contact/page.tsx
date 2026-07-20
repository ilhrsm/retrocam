export const metadata = { title: "Contact | RetroCam" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-display text-3xl text-ink md:text-4xl">문의하기</h1>
      <p className="mt-4 font-body text-sm text-muted">
        상품, 주문, 협업 관련 문의는 아래 채널로 연락 주시면 빠르게 답변드리겠습니다.
      </p>

      <div className="mt-10 divide-y divide-line border-y border-line font-body text-sm">
        <div className="flex justify-between py-4">
          <span className="text-muted">이메일</span>
          <span className="text-ink">hello@retrocam.example.com</span>
        </div>
        <div className="flex justify-between py-4">
          <span className="text-muted">전화</span>
          <span className="text-ink">02-1234-5678</span>
        </div>
        <div className="flex justify-between py-4">
          <span className="text-muted">운영 시간</span>
          <span className="text-ink">평일 10:00 – 18:00 (주말·공휴일 휴무)</span>
        </div>
        <div className="flex justify-between py-4">
          <span className="text-muted">주소</span>
          <span className="text-ink">서울특별시 성동구 서울숲길 12</span>
        </div>
      </div>
    </div>
  );
}
