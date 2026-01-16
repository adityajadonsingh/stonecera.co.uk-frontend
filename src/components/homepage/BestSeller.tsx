
import Link from "next/link";
import Image from "next/image";
import { BestSellerSection } from "@/lib/types";

export default function BestSeller({
  content,
}: {
  content: BestSellerSection;
}) {
  if (!content?.products?.length) return null;

  return (
    <section className="best-seller py-16">
      <div className="container">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr] items-center gap-2 mb-10">
          <div>
            <h2 className="text-3xl heading font-bold mb-2">
              {content.sectionTitle}
            </h2>
            <p className="text-lg text-dark opacity-90">
              {content.sectionSubtitle}
            </p>
          </div>

          <div className="flex justify-end">
            <Link href="/product/">
              <button className="button-1 cursor-pointer py-3 px-4">View All Products</button>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {content.products.map((p, i) => {
            const price = p.priceAfterDiscount;
            const oldPrice = p.priceBeforeDiscount;
            const hasDiscount = oldPrice !== null;

            // if backend failed to send price, skip item to avoid crash
            if (!price) {
              console.warn("Missing priceAfterDiscount for product:", p.slug);
              return null;
            }

            const discountPercent =
              p.productDiscount && p.productDiscount > 0
                ? p.productDiscount
                : p.category?.categoryDiscount &&
                  p.category.categoryDiscount > 0
                ? p.category.categoryDiscount
                : 0;
            return (
              <Link
                key={`best-seller-${i}`}
                href={`/product/${p.slug}`}
                className="relative rounded-md p-3 bg-skin group shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Discount Badge */}
                {hasDiscount && discountPercent > 0 && (
                  <div className="absolute z-10 top-2 left-2 bg-dark text-xs font-semibold px-2 py-1 rounded">
                    {discountPercent}% OFF
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-square mb-3 overflow-hidden rounded">
                  {p.image ? (
                    <Image
                      src={process.env.NEXT_PUBLIC_MEDIA_URL + p.image.url}
                      alt={p.image.alt || p.name}
                      fill
                      className="object-cover group-hover:scale-105"
                    />
                  ) : (
                    <div className="bg-gray-100 h-full flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem]">
                  {p.name}
                </h3>

                {/* Pricing */}
                <div className="mt-2 text-sm">
                  {/* Per m² */}
                  <div>
                    <span className="text-gray-500">Per m²</span>
                    {hasDiscount && (
                      <span className="line-through ml-2 text-gray-400">
                        £{oldPrice?.Per_m2}
                      </span>
                    )}
                    <span className="ml-2 font-bold text-primary">
                      £{price?.Per_m2 ?? "-"}
                    </span>
                  </div>

                  {/* Per Pack */}
                  <div className="mt-1">
                    <span className="text-gray-500">Per Pack</span>
                    {hasDiscount && (
                      <span className="line-through ml-2 text-gray-400">
                        £{oldPrice?.Price}
                      </span>
                    )}
                    <span className="ml-2 font-bold text-primary">
                      £{price?.Price ?? "-"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
