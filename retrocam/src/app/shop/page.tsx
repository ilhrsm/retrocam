import { ProductGrid } from "@/components/product/ProductGrid";
import { getVisibleProducts } from "@/lib/firebase/products";

export const revalidate = 60;

export const metadata = { title: "Shop | RetroCam" };

export default async function ShopPage() {
  const products = await getVisibleProducts().catch(() => []);

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-8 md:py-16">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-[0.2em] text-muted">ALL PRODUCTS</p>
        <h1 className="font-display text-3xl text-ink md:text-4xl">Shop</h1>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
