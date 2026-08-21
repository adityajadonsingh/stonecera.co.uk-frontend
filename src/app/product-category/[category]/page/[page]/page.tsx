// File: src/app/product-category/%5Bcategory%5D/page/%5Bpage%5D/page.tsx

import Link from "next/link";
import { FileText, SlidersHorizontal } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import {
  getCategoryBySlug,
  getCategoryBySlugForMeta,
} from "@/lib/api/category";

import Filters from "@/components/category/Filter";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/category/Pagination";
import ProductsPerPageSelector from "@/components/product/ProductsPerPageSelector";
import PageContentBox from "@/components/PageContentBox";
import FaqsAccordion from "@/components/FaqAccordion";

import { buildMetadata } from "@/lib/seo";


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; page: string }>;
  searchParams: Promise<Record<string, string>>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const hasFilters = Object.keys(resolvedSearchParams).some(
    (key) => !["page", "limit"].includes(key)
  );

  const data = await getCategoryBySlugForMeta(category);

  if (!data) return {};

  const baseMetadata = buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });

  return {
    ...baseMetadata,

    /*
     * Paginated category pages can be indexed.
     * Filtered versions should remain noindex.
     */
    robots: hasFilters
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}


/* =========================================================
   PAGE
========================================================= */

export default async function CategoryPaginatedPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; page: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { category, page: pageParam } = await params;
  const resolvedSearchParams = await searchParams;

  /* =======================================================
     PAGE
  ======================================================= */

  const page = parseInt(pageParam || "1", 10);

  /*
   * /page/1 should always redirect to the main category URL.
   */
  if (page === 1) {
    const queryString = new URLSearchParams(resolvedSearchParams).toString();

    redirect(
      queryString
        ? `/product-category/${category}?${queryString}`
        : `/product-category/${category}`
    );
  }


  /* =======================================================
     PRODUCTS PER PAGE
  ======================================================= */

  const limit = parseInt(resolvedSearchParams.limit || "12", 10);

  const offset = (page - 1) * limit;


  /* =======================================================
     FETCH CATEGORY
  ======================================================= */

  const categoryData = await getCategoryBySlug(category, {
    ...Object.fromEntries(Object.entries(resolvedSearchParams)),
    limit,
    offset,
  });

  if (!categoryData.name) {
    return notFound();
  }


  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalProducts = categoryData.totalProducts || 0;

  const totalPages = Math.ceil(totalProducts / limit);


  /*
   * If the requested page doesn't exist, return 404.
   *
   * Example:
   * Category has 20 products
   * limit = 12
   * valid pages = 1, 2
   * /page/3 => 404
   */
  if (page > totalPages && totalPages > 0) {
    return notFound();
  }


  /* =======================================================
     SAFE FILTER COUNTS
  ======================================================= */

  const safeFilterCounts = categoryData.filterCounts ?? {
    price: {
      min: 0,
      max: 0,
    },
    colorTone: {},
    finish: {},
    thickness: {},
    size: {},
    pcs: {},
    packSize: {},
  };


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="border-b-[0.5px] border-[rgba(38,42,24,0.12)]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1440px] px-4 py-3 lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-sans">

            <li>
              <Link
                href="/"
                className="text-stone-500 transition-colors hover:text-[#99a14e]"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <span className="text-stone-400">›</span>
            </li>

            <li>
              <Link
                href="/categories"
                className="text-stone-500 transition-colors hover:text-[#99a14e]"
              >
                Product Categories
              </Link>
            </li>

            <li aria-hidden="true">
              <span className="text-stone-400">›</span>
            </li>

            <li>
              <span
                aria-current="page"
                className="font-semibold text-[#262a18]"
              >
                {categoryData.name}
              </span>
            </li>

            <li aria-hidden="true">
              <span className="text-stone-400">›</span>
            </li>

            <li>
              <span className="text-stone-500">
                Page {page}
              </span>
            </li>

          </ol>
        </nav>
      </div>


      {/* =====================================================
          CATEGORY HEADER
      ===================================================== */}

      <section className="border-b border-[#262a18]/10 bg-[#f5f0e8]">
        <div className="container">
          <div className="py-10 gap-4 flex justify-between items-baseline-last">

            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#99a14e]">
                Natural Stone Collection
              </p>

              <h1 className="mb-3 text-4xl capitalize text-[#262a18] lg:text-5xl">
                {categoryData.name}
              </h1>

              <p className="max-w-3xl text-sm text-[#4a5530]">
                {categoryData.short_description}
              </p>
            </div>


            {/* Catalogue */}

            {categoryData.catalogue && (
              <Link
                title={`View ${categoryData.name} Catalogue`}
                target="_blank"
                rel="noopener noreferrer"
                href={`${process.env.NEXT_PUBLIC_MEDIA_URL}${categoryData.catalogue.file}`}
                className="
                  flex items-center gap-3
                  bg-[#262a18]
                  w-fit h-fit
                  px-6 py-3
                  text-xs font-medium uppercase tracking-wider
                  text-[#d8c06a]
                  transition-all
                  hover:bg-[#30351e]
                "
              >
                <FileText size={18} />

                View Category Catalogue
              </Link>
            )}

          </div>
        </div>
      </section>


      {/* =====================================================
          PRODUCTS AREA
      ===================================================== */}

      <div className="bg-[#f9f7f3]">

        <div className="container px-4 cat-container">

          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mb:pt-16 pt-8">


            {/* =================================================
                SIDEBAR FILTERS
            ================================================= */}

            <div className="lg:col-span-1">

              <Filters
                currentFilters={resolvedSearchParams}
                categorySlug={category}
                filterCounts={safeFilterCounts}
              />

            </div>


            {/* =================================================
                PRODUCTS
            ================================================= */}

            <div className="lg:col-span-3">


              {/* ===============================================
                  TOP BAR
              =============================================== */}

              <div
                className="
                  mb-6
                  flex items-center justify-between
                  border-b border-[#262a18]/10
                  pb-4
                "
              >

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  {/* Mobile Filters */}

                  <button
                    type="button"
                    className="
                      flex items-center gap-2
                      border border-[#262a18]/20
                      px-3 py-2
                      text-xs font-medium
                      text-[#262a18]
                      lg:hidden
                    "
                  >
                    <SlidersHorizontal
                      size={13}
                      strokeWidth={1.5}
                    />

                    Filters
                  </button>


                  {/* Product Count */}

                  <span className="text-xs font-sans text-[#99a14e]">
                    {totalProducts} products
                  </span>

                </div>


                {/* RIGHT */}

                {totalProducts > 12 && (
                  <div className="flex items-center gap-3">

                    <ProductsPerPageSelector
                      currentLimit={limit}
                      currentFilters={resolvedSearchParams}
                      categorySlug={category}
                      currentPage={page}
                    />

                  </div>
                )}

              </div>


              {/* ===============================================
                  PRODUCT GRID
              =============================================== */}

              <ProductGrid products={categoryData.products} />


              {/* ===============================================
                  PAGINATION
              =============================================== */}

              <Pagination
                totalPages={totalPages}
                currentPage={page}
                category={category}
                currentFilters={resolvedSearchParams}
              />

            </div>

          </div>


          {/* =================================================
              FOOTER CONTENT
          ================================================= */}

          {categoryData.footerContent && (
            <PageContentBox
              content={categoryData.footerContent}
              isFullPage={false}
            />
          )}

        </div>

      </div>


      {/* =====================================================
          FAQ
      ===================================================== */}

      {categoryData.faqs && (
        <div className="bg-[#f9f7f3]">

          <FaqsAccordion
            mainHeading={categoryData.faqs.mainHeading}
            subHeading={categoryData.faqs.subHeading}
            faqs={categoryData.faqs.items}
          />

        </div>
      )}

    </>
  );
}