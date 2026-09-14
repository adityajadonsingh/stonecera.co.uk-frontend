import { redirect, notFound } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import ProductsPerPageSelectorProducts from "@/components/product/ProductsPerPageSelectorProducts";
import PaginationProducts from "@/components/product/PaginationProducts";
import { getAllProducts } from "@/lib/api/product";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";


/* =========================================================
   METADATA
========================================================= */

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


/* =========================================================
   PAGE
========================================================= */

export default async function ProductsPaginatedPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { page: pageParam } = await params;
  const paramsData = await searchParams;


  /* =======================================================
     PAGE NUMBER
  ======================================================= */

  const page = Math.max(
    parseInt(pageParam || "1", 10),
    1
  );


  /*
   * /products/page/1
   * should always redirect to /products
   */

  if (page === 1) {
    const queryString = new URLSearchParams(paramsData).toString();

    redirect(
      queryString
        ? `/products?${queryString}`
        : "/products"
    );
  }


  /* =======================================================
     PRODUCTS PER PAGE
  ======================================================= */

  const limit = Math.max(
    parseInt(paramsData.limit || "12", 10),
    1
  );


  /* =======================================================
     FETCH PRODUCTS
  ======================================================= */

  const data = await getAllProducts({
    page,
    limit,
  });


  /* =======================================================
     CHECK PAGE EXISTS
  ======================================================= */

  if (page > data.totalPages && data.totalPages > 0) {
    notFound();
  }


  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-[#262a18] px-4 py-20">
        <div className="mx-auto max-w-[1440px] text-center">

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-[#d8c06a]">
            Our Full Catalogue
          </p>

          <h1 className="mb-6 text-5xl text-[#f5f0e8] lg:text-7xl">
            All Stone <em>Products</em>
          </h1>

          <p className="mx-auto max-w-2xl leading-relaxed text-stone-400">
            From architectural-grade sandstone to precision-engineered Italian
            porcelain. Browse our complete selection of premium paving
            solutions.
          </p>

        </div>
      </section>


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <div className="bg-[#f9f7f3]">
        <div className="container px-4 py-16">

          {/* =================================================
              PRODUCTS PER PAGE
          ================================================= */}

          <div className="mb-4 flex justify-end">
            <ProductsPerPageSelectorProducts
              currentLimit={limit}
              currentFilters={paramsData}
            />
          </div>


          {/* =================================================
              PRODUCT GRID
          ================================================= */}

          <ProductGrid
            products={data.products}
            isProductPage={true}
          />


          {/* =================================================
              PAGINATION
          ================================================= */}

          <PaginationProducts
            totalPages={data.totalPages}
            currentPage={page}
            currentFilters={paramsData}
          />

        </div>
      </div>


      {/* =====================================================
          INFORMATION SECTION
      ===================================================== */}

      <section className="border-t border-stone-100 bg-white py-20">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">

          <div className="grid grid-cols-1 gap-12 text-center lg:grid-cols-3 lg:text-left">

            {/* =================================================
                EXPERTLY CURATED
            ================================================= */}

            <div>
              <h2 className="mb-4 text-2xl text-[#262a18]">
                Expertly Curated
              </h2>

              <p className="text-sm leading-relaxed text-stone-600">
                Every stone in our collection is hand-selected for its quality,
                durability, and aesthetic appeal. We only source from ethically
                managed quarries.
              </p>
            </div>


            {/* =================================================
                NATIONWIDE DELIVERY
            ================================================= */}

            <div>
              <h2 className="mb-4 text-2xl text-[#262a18]">
                Nationwide Delivery
              </h2>

              <p className="text-sm leading-relaxed text-stone-600">
                We offer reliable delivery across the UK mainland. Our
                specialized logistics network ensures your stone arrives safely
                and on time for your project.
              </p>
            </div>


            {/* =================================================
                TECHNICAL SUPPORT
            ================================================= */}

            <div>
              <h2 className="mb-4 text-2xl text-[#262a18]">
                Technical Support
              </h2>

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