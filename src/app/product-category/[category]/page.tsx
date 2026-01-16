import Filters from "@/components/category/Filter";
import Pagination from "@/components/category/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import PageBanner from "@/components/PageBanner";
import ProductsPerPageSelector from "@/components/product/ProductsPerPageSelector";
import { getCategoryBySlug } from "@/lib/api/category";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import PageContentBox from "@/components/PageContentBox";

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
    (key) => !["page", "limit"].includes(key)
  );

  const canonical = `https://stonecera.co.uk/product-category/${category}/`;
  const robots = page > 1 || hasFilters ? "noindex, follow" : "index, follow";

  return {
    robots,
    alternates: {
      canonical: page > 1 || hasFilters ? canonical : undefined,
    },
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
    price: {},
    colorTone: {},
    finish: {},
    thickness: {},
    size: {},
    pcs: {},
    packSize: {},
  };


  return (
    <>
    <PageBanner pageName={categoryData.name} pageDescription={categoryData.short_description} breadcrum={[{
                        pageName: "Product Category",
                        pageUrl: "/product-category/"
                },
                    {
                        pageName: categoryData.name,
                        pageUrl: `/product-category/${categoryData.slug}/`
                    }
                ]} bgImage={`${process.env.NEXT_PUBLIC_MEDIA_URL}${categoryData.bannerImg?.url}`} />
      

      {/* Layout grid */}
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-16">
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
            <div className="flex justify-end mb-4">
              <ProductsPerPageSelector
                currentLimit={limit}
                currentFilters={resolvedSearchParams}
                categorySlug={category}
                currentPage={page}
              />
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

        {
          categoryData.footerContent && (
            <PageContentBox
              content={categoryData.footerContent}
              isFullPage={true}
            />
          )
        }

      </div>
    </>
  );
}