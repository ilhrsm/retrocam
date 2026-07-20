import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";

export function Collections({ collections }: { collections: SiteSettings["collections"] }) {
  if (collections.length === 0) return null;
  return (
    <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
      <p className="font-mono text-xs tracking-[0.2em] text-muted">EXPLORE</p>
      <h2 className="mb-8 font-display text-2xl text-ink md:text-3xl">컬렉션</h2>
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
    </section>
  );
}
