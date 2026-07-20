import Link from "next/link";
import { Aperture } from "@/components/ui/Aperture";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-ivory">
      <div className="mx-auto max-w-content px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <Aperture size={20} className="text-ink/60" />
              <span className="font-display text-lg text-ink">RETROCAM</span>
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted">
              어제의 손맛과 오늘의 정밀함을 함께 담은 카메라를 소개합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 font-body text-sm text-ink/70 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="mb-1 text-xs uppercase tracking-widest text-muted">Shop</span>
              <Link href="/shop">전체 상품</Link>
              <Link href="/collection">컬렉션</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mb-1 text-xs uppercase tracking-widest text-muted">Company</span>
              <Link href="/about">브랜드 소개</Link>
              <Link href="/contact">문의하기</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mb-1 text-xs uppercase tracking-widest text-muted">My</span>
              <Link href="/mypage">마이페이지</Link>
              <Link href="/cart">장바구니</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line/70 pt-6 font-body text-xs text-muted md:flex-row md:justify-between">
          <p>(주)레트로캠 · 대표 김레트로 · 사업자등록번호 000-00-00000</p>
          <p>© {new Date().getFullYear()} RetroCam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
