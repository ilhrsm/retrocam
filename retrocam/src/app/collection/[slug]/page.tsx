import { getProductsByCollection } from "@/lib/firebase/products";
import { getSiteSettings } from "@/lib/firebase/settings";
import { ProductGrid } from "@/components/product/ProductGrid";

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export default async function CollectionDetailPage({ params }: Props) {
  const [products, settings] = await Promise.all([
    getProductsByCollection(params.slug).catch(() => []),
    getSiteSettings().catch(() => null),
  ]);
  const collection = settings?.collections.find((c) => c.slug === params.slug);

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-xs tracking-[0.2em] text-muted">COLLECTION</p>
      <h1 className="mb-10 font-display text-3xl text-ink md:text-4xl">
        {collection?.name ?? params.slug}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}
