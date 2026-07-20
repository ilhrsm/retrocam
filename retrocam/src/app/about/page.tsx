import { Aperture } from "@/components/ui/Aperture";

export const metadata = { title: "About | RetroCam" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Aperture size={32} className="text-ink/40" />
      <h1 className="mt-6 font-display text-3xl text-ink md:text-4xl">브랜드 소개</h1>
      <div className="mt-8 flex flex-col gap-6 font-body text-base leading-relaxed text-ink/80">
        <p>
          RetroCam은 2015년, 한 대의 필름 카메라를 수리하는 것에서 시작했습니다. 오래된 기계의
          정교함을 되살리는 과정에서, 우리는 사진을 찍는 행위 자체가 가진 고유한 감각에 매료되었습니다.
        </p>
        <p>
          오늘날 RetroCam은 클래식한 조작감과 현대적인 정밀함을 함께 갖춘 카메라를 만듭니다. 모든
          제품은 실제 사용을 전제로 설계하고 검수하며, 유행이 아닌 오래 곁에 둘 수 있는 물건을
          지향합니다.
        </p>
        <p>
          우리는 사진이 기록을 넘어 하나의 태도라고 믿습니다. RetroCam과 함께, 조금 더 천천히 세상을
          바라보시길 바랍니다.
        </p>
      </div>
    </div>
  );
}
