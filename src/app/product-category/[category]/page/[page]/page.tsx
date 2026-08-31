// File: src/app/product-category/[category]/page/[page]/page.tsx

import Link from "next/link";
import { FileText, SlidersHorizontal, ChevronRight } from "lucide-react";
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
import { JSONObject, Schema } from "@/lib/types";


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

  /*
   * Filters should not be indexed.
   * Normal paginated pages can be indexed.
   */
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

    robots: hasFilters
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
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
     PAGE NUMBER
  ======================================================= */

  const page = parseInt(pageParam || "1", 10);

  /*
   * /page/1 should always redirect to the main category URL.
   */
  if (page === 1) {
    const queryString = new URLSearchParams(
      resolvedSearchParams
    ).toString();

    redirect(
      queryString
        ? `/product-category/${category}?${queryString}`
        : `/product-category/${category}`
    );
  }


  /*
   * Invalid page numbers
   */
  if (page < 1 || Number.isNaN(page)) {
    return notFound();
  }


  /* =======================================================
     PRODUCTS PER PAGE
  ======================================================= */

  const limit = parseInt(
    resolvedSearchParams.limit || "12",
    10
  );

  const offset = (page - 1) * limit;


  /* =======================================================
     FETCH CATEGORY
  ======================================================= */

  const categoryData = await getCategoryBySlug(category, {
    ...Object.fromEntries(
      Object.entries(resolvedSearchParams)
    ),
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

  const totalPages = Math.ceil(
    totalProducts / limit
  );

  /*
   * Requested page doesn't exist.
   *
   * Example:
   * 20 products
   * 12 per page
   *
   * Valid:
   * /page/2
   *
   * Invalid:
   * /page/3
   */
  if (page > totalPages && totalPages > 0) {
    return notFound();
  }


  /* =======================================================
     SAFE FILTER COUNTS
  ======================================================= */

  const safeFilterCounts =
    categoryData.filterCounts ?? {
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
          <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs">

            {/* Home */}

            <li>
              <Link
                href="/"
                className="text-stone-500 transition-colors hover:text-[#99a14e]"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight
                size={13}
                strokeWidth={1.5}
                className="text-stone-400"
              />
            </li>


            {/* Product Categories */}

            <li>
              <Link
                href="/product-category/"
                className="text-stone-500 transition-colors hover:text-[#99a14e]"
              >
                Product Categories
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight
                size={13}
                strokeWidth={1.5}
                className="text-stone-400"
              />
            </li>


            {/* Current Category */}

            <li>
              <span
                aria-current="page"
                className="font-semibold text-[#262a18]"
              >
                {categoryData.name}
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
          <div className="flex flex-wrap items-baseline-last justify-between gap-4 py-10">

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
                  flex
                  h-fit
                  w-fit
                  items-center
                  gap-2
                  bg-[#262a18]
                  px-6
                  py-3
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-[#d8c06a]
                  transition-all
                  hover:bg-[#30351e]
                "
              >
                <FileText
                  size={18}
                  strokeWidth={1.5}
                />

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

        <div className="container cat-container px-4">

          <div className="mb:pt-16 grid grid-cols-1 pt-8 lg:grid-cols-4 lg:gap-8">


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


              {/* =================================================
                  TOP BAR
              ================================================= */}

              <div
                className="
                  mb-6
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#262a18]/10
                  pb-4
                "
              >

                {/* LEFT */}

                <div className="flex w-full items-center gap-4 sm:w-6/12">

                  {/* Mobile Filters */}

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-2
                      border
                      border-[#262a18]/20
                      px-3
                      py-2
                      text-xs
                      font-medium
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

                  <span className="ml-3 block font-sans text-xs text-[#99a14e]">
                    {categoryData.totalProducts} products
                  </span>

                </div>


                {/* RIGHT */}

                {categoryData.totalProducts > 12 && (
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


              {/* =================================================
                  PRODUCT GRID
              ================================================= */}

              <ProductGrid
                products={categoryData.products}
              />


              {/* =================================================
                  PAGINATION
              ================================================= */}

              <Pagination
                totalPages={totalPages}
                currentPage={page}
                category={category}
                currentFilters={resolvedSearchParams}
              />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          FAQ
      ===================================================== */}

      {categoryData.faqs && (
        <div className="bg-[#f9f7f3]">

          <FaqsAccordion
            mainHeading={
              categoryData.faqs.mainHeading
            }
            subHeading={
              categoryData.faqs.subHeading
            }
            items={
              categoryData.faqs.items
            }
          />

        </div>
      )}

    </>
  );
}