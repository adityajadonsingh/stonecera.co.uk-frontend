// app/product/[slug]/page.tsx
import Breadcrum from "@/components/Breadcrum";
import ImageGallery from "@/components/product/ImageGallery";
import NeedHelpBox from "@/components/product/NeedHelpBox";
import ProductHighlights from "@/components/product/ProductHighlights";
import ProductSidebarTrigger from "@/components/product/ProductSidebarTrigger";
import VariationTable from "@/components/product/VariationTable";
import { getProductBySlug } from "@/lib/api/product";
import type { Product } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ParamsPromise = Promise<{ slug: string }>;
type SearchParamsPromise = Promise<Record<string, string>>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: ParamsPromise;
  searchParams?: SearchParamsPromise;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  return {
    title: product?.name ?? "Product",
    description: product?.name ?? undefined,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: ParamsPromise;
  searchParams: SearchParamsPromise;
}) {
  // MUST await params/searchParams before using
  const { slug } = await params;
  const _search = await searchParams; // keep if use query params later

  const product: Product = await getProductBySlug(slug);

  if (!product || !product.name) return notFound();

  const variations = product.variations ?? [];

  // -------- DISCOUNT LOGIC --------
  const usedDiscount =
    product.productDiscount && product.productDiscount > 0
      ? product.productDiscount
      : product.category?.categoryDiscount &&
        product.category.categoryDiscount > 0
      ? product.category.categoryDiscount
      : 0;

  const fromPerM2 =
    variations.length > 0
      ? Math.min(...variations.map((v) => v.Per_m2 ?? Infinity))
      : null;

  const beforePerM2 =
    usedDiscount > 0 && product.priceBeforeDiscount?.Per_m2
      ? product.priceBeforeDiscount.Per_m2
      : null;

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="col-span-1 lg:col-span-5 relative h-full">
          <ImageGallery images={product.images ?? []} productId={product.id} />
        </div>

        <div className="col-span-1 lg:col-span-7">
          <nav className="text-sm text-gray-500 mb-3">
            {/* Home / {product.category?.name ?? "Category"} / {product.name} */}
            <Breadcrum
              breadcrum={[
                {
                  pageName: "Product Category",
                  pageUrl: "/product-category/",
                },
                {
                  pageName: product.category?.name,
                  pageUrl: `/product-category/${product.category?.slug}/`,
                },
                {
                  pageName: product.name,
                  pageUrl: `/product-category/${product.category?.slug}/${product.slug}/`,
                },
              ]}
            />
          </nav>

          <h1 className="text-3xl font-semibold mb-2 text-gray-800">
            {product.name}
          </h1>

          <div className="text-lg font-medium mb-4 flex gap-2">
            <span className="text-[#4c4331] font-semibold">From :</span>
            {fromPerM2 ? (
              <div className="flex items-center gap-2">
                {beforePerM2 && (
                  <span className="text-gray-400 line-through">
                    £{beforePerM2.toFixed(2)}
                  </span>
                )}

                <span className="text-amber-700 font-semibold">
                  £{fromPerM2.toFixed(2)} /m²
                </span>

                {usedDiscount > 0 && (
                  <span className="animate-pulse-bg text-white text-xs font-semibold px-2 py-1 rounded">
                    {usedDiscount}% OFF
                  </span>
                )}
              </div>
            ) : (
              "—"
            )}
          </div>

          <VariationTable
            productId={product.id}
            variations={variations}
            productDiscount={product.productDiscount}
            categoryDiscount={product.category?.categoryDiscount}
          />
          <ProductHighlights />
          <ProductSidebarTrigger description={product.description} />
          <NeedHelpBox />
        </div>
      </div>
    </div>
  );
}
