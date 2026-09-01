import PageBanner from "@/components/PageBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/api/product";
import PaginationProducts from "@/components/product/PaginationProducts";
import ProductsPerPageSelectorProducts from "@/components/product/ProductsPerPageSelectorProducts";
import PageBannerImg from "../../../public/media/bg/image.webp";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    seo: {
      meta_title: "Explore Natural Stone Tiles & Outdoor Paving | Stonecera",

      meta_description:
        "Find premium natural stone tiles, paving slabs, and flooring at Stonecera. Perfect for patios, landscaping, and beautiful indoor spaces.",

      canonical_tag: "https://stonecera.co.uk/products/",

      robots: "index, follow",
    },

    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  const page = Math.max(parseInt(params.page || "1", 10), 1);

  const limit = Math.max(parseInt(params.limit || "12", 10), 1);

  const data = await getAllProducts({
    page,
    limit,
  });

  return (
    <>
      <section className="bg-[#262a18] px-4 py-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-[#d8c06a]">
            Our Full Catalogue
          </p>

          <h1 className="mb-6  text-5xl text-[#f5f0e8] lg:text-7xl">
            All Stone <em>Products</em>
          </h1>

          <p className="mx-auto max-w-2xl leading-relaxed text-stone-400">
            From architectural-grade sandstone to precision-engineered Italian
            porcelain. Browse our complete selection of premium paving
            solutions.
          </p>
        </div>
      </section>

      <div className="bg-[#f9f7f3]">
        <div className="container px-4 py-16">
          {/* Products Per Page */}
          <div className="mb-4 flex justify-end">
            <ProductsPerPageSelectorProducts
              currentLimit={limit}
              currentFilters={params}
            />
          </div>

          {/* Product Grid */}
          <ProductGrid products={data.products} isProductPage={true} />

          {/* Pagination */}
          <PaginationProducts
            totalPages={data.totalPages}
            currentPage={page}
            currentFilters={params}
          />
        </div>
      </div>

      <section className="border-t border-stone-100 bg-white py-20">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 text-center lg:grid-cols-3 lg:text-left">
            {/* Expertly Curated */}
            <div>
              <h3 className="mb-4  text-2xl text-[#262a18]">
                Expertly Curated
              </h3>

              <p className="text-sm leading-relaxed text-stone-600">
                Every stone in our collection is hand-selected for its quality,
                durability, and aesthetic appeal. We only source from ethically
                managed quarries.
              </p>
            </div>

            {/* Nationwide Delivery */}
            <div>
              <h3 className="mb-4  text-2xl text-[#262a18]">
                Nationwide Delivery
              </h3>

              <p className="text-sm leading-relaxed text-stone-600">
                We offer reliable delivery across the UK mainland. Our
                specialized logistics network ensures your stone arrives safely
                and on time for your project.
              </p>
            </div>

            {/* Technical Support */}
            <div>
              <h3 className="mb-4 text-2xl text-[#262a18]">
                Technical Support
              </h3>

              <p className="text-sm leading-relaxed text-stone-600">
                Need advice on installation or maintenance? Our technical team
                is available to assist you with material calculations and best
                practice guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
