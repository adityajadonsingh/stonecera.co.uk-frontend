// app/product/[slug]/page.tsx
import CartSidebar from "@/components/product/CartSidebar";
import ImageGallery from "@/components/product/ImageGallery";
import NeedHelpBox from "@/components/product/NeedHelpBox";
import ProductHighlights from "@/components/product/ProductHighlights";
import ShareButton from "@/components/product/ShareButton";
import SchemaInjector from "@/components/SchemaInjector";
import { getProductBySlug } from "@/lib/api/product";
import { buildMetadata } from "@/lib/seo";
import type { JSONObject, Product, Schema } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import VariationTable from "@/components/product/VariationTable";
import ProductTabs from "@/components/product/ProductTabs";
import ProductGrid from "@/components/product/ProductGrid";

type ParamsPromise = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await getProductBySlug(slug);
  if (!data) return {};

  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default async function ProductPage({
  params,
}: {
  params: ParamsPromise;
}) {
  const { slug } = await params;

  const product: Product = await getProductBySlug(slug);

  if (!product || !product.name) return notFound();

  const variations = product.variations ?? [];
  const selectedVariation = product.selectedVariation;

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
        name: product.category?.name ?? "Category",
        item: `https://stonecera.co.uk/product-category/${product.category?.slug}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://stonecera.co.uk/product-category/${product.category?.slug}/${product.slug}/`,
      },
    ],
  };
  const reviewsSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: `${process.env.NEXT_PUBLIC_MEDIA_URL}${product.images[0]?.url}`,
    description: product.seo?.meta_description ?? product.description,
    brand: {
      "@type": "Brand",
      name: "Stonecera",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "15",
    },
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    reviewsSchema,
    ...(Array.isArray(product.seo?.schemas) ? product.seo?.schemas : []),
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
      <div className="bg-[#fcfcfc]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1440px] px-4 py-4 font-sans lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-2 text-[13px]">
            {/* Home */}
            <li className="flex items-center gap-2">
              <Link
                href="/"
                className="text-[#a67c52] transition-colors hover:underline"
              >
                Home
              </Link>

              <ChevronRight
                size={14}
                strokeWidth={1.5}
                className="text-gray-400"
                aria-hidden="true"
              />
            </li>

            {/* Product Category */}
            <li className="flex items-center gap-2">
              <Link
                href="/product-category"
                className="text-[#a67c52] transition-colors hover:underline"
              >
                Product Category
              </Link>

              <ChevronRight
                size={14}
                strokeWidth={1.5}
                className="text-gray-400"
                aria-hidden="true"
              />
            </li>

            {/* Category */}
            <li className="flex items-center gap-2">
              <Link
                href={`/product-category/${product.category?.slug}/`}
                className="text-[#a67c52] transition-colors hover:underline"
              >
                {product.category?.name}
              </Link>

              <ChevronRight
                size={14}
                strokeWidth={1.5}
                className="text-gray-400"
                aria-hidden="true"
              />
            </li>

            {/* Current Product */}
            <li>
              <span aria-current="page" className="text-gray-500 font-semibold">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-4">
              <ImageGallery
                images={product.images ?? []}
                productId={product.id}
                product={product}
              />
            </div>

            <div className="lg:col-span-5">
              {product.labels?.length > 0 && (
                <span className="bg-[#a67c52]/10 font-sans text-[#a67c52] text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                  {product.labels[0].name}
                </span>
              )}
              <h1 className="text-3xl font-bold text-[#262a18] tracking-tight">
                {product.name}
              </h1>

              {/* Starting Price */}
              <div className="mb-6 ">
                <div className="flex  items-baseline flex-wrap gap-x-2 gap-y-1">
                  <span className="text-xl font-medium text-[#a67c52]">
                    From :
                  </span>

                  {selectedVariation ? (
                    <>
                      {selectedVariation.pricing.isDiscounted && (
                        <span className="text-sm text-gray-400 font-sans line-through">
                          £{selectedVariation.pricing.perM2.original.toFixed(2)}
                        </span>
                      )}

                      <span className="text-lg font-semibold font-sans text-[#a67c52]">
                        £{selectedVariation.pricing.perM2.selling.toFixed(2)}{" "}
                        /m²
                      </span>

                      <span className="text-xs font-sans text-gray-400">
                        (Inc VAT)
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-semibold font-sans text-gray-400">
                      —
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm mb-2 font-bold text-[#262a18ad] uppercase tracking-wider flex items-center gap-2">
                Available Variations
              </div>
              <VariationTable productId={product.id} variations={variations} />
              <ProductHighlights />
              {/* <ProductSidebarTrigger description={product.description} /> */}
              <NeedHelpBox pageName={product.slug} />
              <ShareButton title={product.name} />
            </div>
          </div>
        </div>
        <div className="max-w-[1440px]  mx-auto px-4 lg:px-8 pb-20">
          <ProductTabs product={product} faqs={product.faqs} />
        </div>
        <div className="max-w-[1440px]  mx-auto px-4 lg:px-8 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-[#262a18] tracking-tight">
              You May Also Like
            </h2>
            <Link
              className="text-sm font-sans font-bold text-[#a67c52] hover:underline uppercase tracking-widest"
              href="/product-category/"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={product.youMayAlsoLike} isProductPage={true} />
        </div>
        <SchemaInjector schemas={safeSchemas} />
        <CartSidebar />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.API_URL}/products/slugs`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const slugs: { slug: string }[] = await res.json();

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}
