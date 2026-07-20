import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/firebase/settings";

export const revalidate = 60;
export const metadata = { title: "Collection | RetroCam" };

export default async function CollectionListPage() {
  const settings = await getSiteSettings().catch(() => null);
  const collections = settings?.collections ?? [];

  return (
    <div className="mx-auto max-w-content px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-xs tracking-[0.2em] text-muted">EXPLORE</p>
      <h1 className="mb-10 font-display text-3xl text-ink md:text-4xl">Collection</h1>

      {collections.length === 0 ? (
        <p className="font-body text-sm text-muted">준비 중인 컬렉션입니다.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`/collection/${c.slug}`}
              className="group relative aspect-[5/4] overflow-hidden rounded-md bg-line"
            >
              {c.imageUrl && (
                <Image
                  src={c.imageUrl}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-lg text-ivory">{c.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
