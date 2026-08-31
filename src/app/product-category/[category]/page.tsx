// File: src/app/product-category/%5Bcategory%5D/page.tsx

import Link from "next/link";
import Filters from "@/components/category/Filter";
import Pagination from "@/components/category/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import { FileText, SlidersHorizontal } from "lucide-react";
import ProductsPerPageSelector from "@/components/product/ProductsPerPageSelector";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategoryBySlugForMeta,
} from "@/lib/api/category";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import PageContentBox from "@/components/PageContentBox";
import { buildMetadata } from "@/lib/seo";
import { JSONObject, Schema } from "@/lib/types";
import SchemaInjector from "@/components/SchemaInjector";
import { ChevronRight } from "lucide-react";
import FaqsAccordion from "@/components/FaqAccordion";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category: { slug: string }) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string>>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams.page || "1", 10);

  const hasFilters = Object.keys(resolvedSearchParams).some(
    (key) => !["page", "limit"].includes(key),
  );

  const shouldNoIndex = hasFilters;

  const data = await getCategoryBySlugForMeta(category);
  if (!data) return {};

  const baseMetadata = buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });

  return {
    ...baseMetadata,

    // override robots ONLY when needed
    robots: shouldNoIndex
      ? { index: false, follow: true }
      : baseMetadata.robots,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  // Determine current page
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  if (page === 1 && resolvedSearchParams.page) {
    redirect(`/product-category/${category}`);
  }

  // Number of products per page (default 12)
  const limit = parseInt(resolvedSearchParams.limit || "12", 10);
  const offset = (page - 1) * limit;

  // Fetch category data
  const categoryData = await getCategoryBySlug(category, {
    ...Object.fromEntries(Object.entries(resolvedSearchParams)),
    limit,
    offset,
  });

  if (!categoryData.name) return notFound();
  const totalProducts = categoryData.totalProducts || 0;
  const totalPages = Math.ceil(totalProducts / limit);

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

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://stonecera.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Product Category",
        item: "https://stonecera.co.uk/product-category/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryData.name,
        item: `https://stonecera.co.uk/product-category/${categoryData.slug}/`,
      },
    ],
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    ...(Array.isArray(categoryData.seo?.schemas)
      ? categoryData.seo.schemas
      : []),
  ];

  const safeSchemas: Schema[] = Array.from(
    new Map(
      rawSchemas.map((schema) => {
        const normalized = normalizeSchema(schema);
        return [JSON.stringify(normalized.schema_json), normalized];
      }),
    ).values(),
  );
  return (
    <>
      <div className="border-b-[0.5px] border-[rgba(38,42,24,0.12)]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1440px] px-4 py-3 lg:px-8"
        >
          <ol className="flex flex-wrap font-sans items-center gap-1.5 text-xs">
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

            {/* Current Page */}
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

      <section className="border-b border-[#262a18]/10 bg-[#f5f0e8] ">
        <div className="container">
          <div className="py-10 gap-4 flex flex-wrap justify-between items-baseline-last">
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

            {categoryData.catalogue && (
              <Link
                title={`View ${categoryData.name} Catalogue`}
                target="_blank"
                rel="noopener noreferrer"
                href={`${process.env.NEXT_PUBLIC_MEDIA_URL}${categoryData.catalogue.file}`}
                className="flex items-center gap-2 bg-[#262a18] w-fit h-fit px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#d8c06a] transition-all hover:bg-[#30351e]"
              >
                <FileText size={18} />
                View Category Catalogue
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Layout grid */}
      <div className="bg-[#f9f7f3]">
        <div className="container px-4 cat-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mb:pt-16 pt-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Filters
                currentFilters={resolvedSearchParams}
                categorySlug={category}
                filterCounts={safeFilterCounts}
              />
            </div>

            {/* Products + Pagination */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between border-b border-[#262a18]/10 pb-4">
                {/* Left */}
                <div className="flex sm:w-6/12 w-full items-center gap-4">
                  {/* Mobile Filters */}
                  <button
                    type="button"
                    className="flex items-center gap-2 border border-[#262a18]/20 px-3 py-2 text-xs font-medium text-[#262a18] lg:hidden"
                  >
                    <SlidersHorizontal size={13} strokeWidth={1.5} />
                    Filters
                  </button>

                  <span className="text-xs text-[#99a14e] ml-3 block font-sans">
                    {categoryData.totalProducts} products
                  </span>
                </div>

                {/* Right */}
                {categoryData.totalProducts > 12 && (
                  <div className="flex items-center gap-3">
                    {/* Products Per Page */}
                    <ProductsPerPageSelector
                      currentLimit={limit}
                      currentFilters={resolvedSearchParams}
                      categorySlug={category}
                      currentPage={page}
                    />
                  </div>
                )}
              </div>

              <ProductGrid products={categoryData.products} />

              <Pagination
                totalPages={totalPages}
                currentPage={page}
                category={category}
                currentFilters={resolvedSearchParams}
              />
            </div>
          </div>

          {categoryData.footerContent && (
            <PageContentBox
              content={categoryData.footerContent}
              isFullPage={false}
            />
          )}
        </div>
      </div>
      {
        categoryData.faqs && (
          <div className="bg-[#f9f7f3]">
            <FaqsAccordion mainHeading={categoryData.faqs?.mainHeading} subHeading={categoryData.faqs?.subHeading} items={categoryData.faqs?.items} />
          </div>
        )
      }
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}
