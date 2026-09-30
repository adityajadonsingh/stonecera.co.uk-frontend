import { getCatalogues } from "@/lib/api/catalogue";
import Image from "next/image";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrum from "@/components/Breadcrum";
import { Download, ExternalLink, FileText } from "lucide-react";

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
      <Breadcrum
        breadcrum={[
          {
            pageName: "Product Catalogue",
            pageUrl: "/product-catalogue",
          },
        ]}
      />

      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 lg:px-8">
        {/* Header */}
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

        {/* Catalogues */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogues.map((c) => (
            <div
              key={c.id}
              className="group border border-stone-200 bg-white p-6 transition-all hover:border-[#262a18]"
            >
              {/* Top */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center bg-[#f5f0e8] text-[#99a14e]">
                  <FileText size={20} strokeWidth={2} />
                </div>

                <span className="bg-stone-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#99a14e]">
                  PDF
                </span>
              </div>

              {/* Title */}
              <h3
                className="mb-1 font-serif text-xl text-[#262a18]"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                {c.name}
              </h3>

              <p className="mb-6 text-xs text-[#4a5530]">Download PDF</p>

              {/* Actions */}
              <div className="flex gap-3">
                {/* Download */}
                <a
                  href={`/api/catalogue/download?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_MEDIA_URL}${c.file?.url}`,
                  )}`}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-none bg-[#262a18] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#3d4428]"
                >
                  <Download size={14} strokeWidth={2} />
                  Download
                </a>

                {/* Open */}
                <a
                  href={`${process.env.NEXT_PUBLIC_MEDIA_URL}${c.file?.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${c.name}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-stone-200 bg-white p-0 text-stone-400 transition-colors hover:text-[#262a18]"
                >
                  <ExternalLink size={14} strokeWidth={2} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
