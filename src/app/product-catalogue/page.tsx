import { getCatalogues } from "@/lib/api/catalogue";
import Image from "next/image";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Product Catalogue | Stonecera Natural Stone Collection",
      meta_description:
        "View the Stonecera product catalogue for a complete range of natural stone tiles, paving slabs, and flooring solutions for residential and outdoor projects.",
      canonical_tag: "https://stonecera.co.uk/product-catalogue/",
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
    <div className="bg-[#f9f7f3]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16 ">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1
              className="mb-6 font-serif text-5xl text-[#262a18] lg:text-7xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Digital Catalogues
            </h1>

            <p className="text-lg text-[#4a5530]">
              Download our latest product guides, technical specifications, and
              installation manuals in PDF format.
            </p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogues.map((c) => (
              <a
                key={c.id}
                href={process.env.NEXT_PUBLIC_MEDIA_URL + c.file?.url}
                target="_blank"
                className="group bg-white transition overflow-hidden border border-stone-200 hover:border-[#262a18]"
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
                  <h3 className="font-medium text-[#262a18] text-xl group-hover:text-[#cb934f]">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Download PDF</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
