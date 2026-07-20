import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Collections } from "@/components/home/Collections";
import { BrandStory } from "@/components/home/BrandStory";
import { getVisibleProducts } from "@/lib/firebase/products";
import { getSiteSettings } from "@/lib/firebase/settings";

export const revalidate = 60;

export default async function HomePage() {
  const [products, settings] = await Promise.all([
    getVisibleProducts().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  const hero = settings?.hero ?? {
    imageUrl: "",
    title: "시간을 초월한 사진의 감각",
    description: "RetroCam은 오늘의 손끝에 어제의 감성을 담습니다.",
  };
  const featured = settings?.featuredProductIds?.length
    ? products.filter((p) => settings.featuredProductIds.includes(p.id))
    : products.filter((p) => p.featured);

  return (
    <>
      <Hero hero={hero} />
      <FeaturedProducts products={featured} />
      <NewArrivals products={products} />
      <Collections collections={settings?.collections ?? []} />
      <BrandStory />
    </>
  );
}
