import PageBanner from "@/components/PageBanner";
import { getCatalogues } from "@/lib/api/catalogue";
import PageBannerImg from "../../../public/media/bg/image.webp";
import Image from "next/image";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Product Catalogue | Stonecera Natural Stone Collection",
      meta_description:
        "View the Stonecera product catalogue for a complete range of natural stone tiles, paving slabs, and flooring solutions for residential and outdoor projects.",
      canonical_tag: "https://stonecera.co.uk/product-catalogue",  
      robots: "index, follow",
    },
  };
  if (!data) return {};
  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default async function ProductCataloguePage() {
  const catalogues = await getCatalogues();
  return (
    <>
      <PageBanner
        pageName="Product Catalogue"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Product Catalogue",
            pageUrl: "/product-catalogue/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogues.map((c) => (
            <a
              key={c.id}
              href={process.env.NEXT_PUBLIC_MEDIA_URL + c.file?.url}
              target="_blank"
              className="group bg-white rounded-md shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative aspect-[2/1]">
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL + c.thumbnail?.url}
                  alt={c.thumbnail?.alt || c.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[#4c4331] text-lg group-hover:text-[#cb934f]">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Download PDF</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
