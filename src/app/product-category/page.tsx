import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Truck, ShieldCheck, Star, Map, ChevronRight } from "lucide-react";
import Banner from "../../../public/media/bg/product-category-banner.webp";
import Bricks from "../../../public/media/product-category/bricks.webp";
import CobblestonePaving from "../../../public/media/product-category/cobblestone-paving.webp";
import LimestonePaving from "../../../public/media/product-category/limestone-paving.webp";
import OutdoorPorcelainTiles from "../../../public/media/product-category/outdoor-porcelain-tiles.webp";
import PorcelainPlanks from "../../../public/media/product-category/porcelain-planks.webp";
import SandstonePaving from "../../../public/media/product-category/sandstone-paving.webp";
import SlateStone from "../../../public/media/product-category/slate-stone.webp";
import WallCladding from "../../../public/media/product-category/wall-cladding.webp";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Nationwide in 3-5 days",
  },
  {
    icon: ShieldCheck,
    title: "Premium Grade",
    description: "Triple inspected batches",
  },
  {
    icon: Star,
    title: "Expert Choice",
    description: "Trusted by architects",
  },
  {
    icon: Map,
    title: "Global Sourcing",
    description: "Quarries in 12 countries",
  },
];

const collections = [
  {
    title: "Porcelain Planks",
    slug: "porcelain-planks",
    image: PorcelainPlanks,
    description:
      "Combining the warmth of natural wood with the extreme durability and low maintenance of porcelain. Perfect for contemporary seamless indoor-outdoor transitions.",
    labels: ["Scratch Resistant", "Zero Maintenance", "Anti-Slip R11"],
  },
  {
    title: "Outdoor Porcelain Tiles",
    slug: "outdoor-porcelain-tiles",
    image: OutdoorPorcelainTiles,
    description:
      "Precision-engineered tiles offering a sleek, modern aesthetic. Non-porous and frost-resistant, making them ideal for the unpredictable British weather.",
    labels: ["Precision Calibrated", "Frost Resistant", "Stain Proof"],
  },
  {
    title: "Cobblestone Paving",
    slug: "cobblestone-paving",
    image: CobblestonePaving,
    description:
      "Timeless and exceptionally durable paving for driveways and decorative edging. Available in granite, limestone, and sandstone variations.",
    labels: ["Heavy Duty", "Permeable Options", "Natural Texture"],
  },
  {
    title: "Slate Stone",
    slug: "slate-stone",
    image: SlateStone,
    description:
      "Characterised by its unique riven texture and deep, sophisticated color palette. Our slate is ethically sourced and split by hand for authentic character.",
    labels: ["Hand Split", "Natural Riven", "Rich Tones"],
  },
  {
    title: "Limestone Paving",
    slug: "limestone-paving",
    image: LimestonePaving,
    description:
      "Favoured for its consistent color and smooth finish. Limestone offers an elegant, understated look that complements both traditional and modern designs.",
    labels: ["Sawn Edges", "Uniform Color", "Cool to Touch"],
  },
  {
    title: "Sandstone Paving",
    slug: "sandstone-paving",
    image: SandstonePaving,
    description:
      "The UK's most popular natural stone choice. Durable, versatile, and featuring a beautiful array of natural earth tones and textures.",
    labels: ["Ethically Sourced", "Weather Resistant", "Unique Veining"],
  },
  {
    title: "Wall Cladding",
    slug: "wall-cladding",
    image: WallCladding,
    description:
      "Transform vertical surfaces with our natural stone walling. Ideal for garden retaining walls, building facades, and interior feature walls.",
    labels: ["Easy Install", "Z-Panel Design", "Natural Finish"],
  },
  {
    title: "Bricks",
    slug: "bricks",
    image: Bricks,
    description:
      "Classic clay and concrete bricks for traditional paving, borders, and walling. Available in various finishes from reclaimed styles to crisp modern edges.",
    labels: ["Herringbone Ready", "Clay & Concrete", "Edge Borders"],
  },
];

const materialGuides = [
  {
    title: "Natural Stone Maintenance",
    description:
      "Natural stones like Limestone and Sandstone are porous and require sealing to prevent staining and water ingress. We recommend high-performance impregnating sealers that preserve the stone's breathability while enhancing its natural color and providing long-term protection against the elements.",
  },
  {
    title: "Porcelain Performance",
    description:
      "Our vitrified porcelain paving is engineered for extreme durability. With a water absorption rate of less than 0.1%, it is inherently frost-proof and stain-resistant. The R11 anti-slip rating ensures a safe surface even when wet, making it the premier choice for poolside applications and high-traffic modern patios.",
  },
  {
    title: "Ethical Sourcing",
    description:
      "We are committed to the Ethical Stone Register. Every natural stone product in our collection is sourced from quarries that adhere to strict environmental and social standards, ensuring fair wages and safe working conditions for all quarry workers.",
  },
  {
    title: "Technical Support",
    description:
      "Our team provides comprehensive technical support including CAD drawings, load-bearing specifications, and sub-base preparation guides. Whether you are installing over a traditional sand/cement bed or a modern pedestal system, we have the expertise to assist.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Premium Natural Stone Tiles & Paving Slabs | Stonecera",
      meta_description:
        "Find premium natural stone tiles, paving slabs, and flooring in Stonecera product categories. Ideal for patios, gardens, and interior design.",
      canonical_tag: "https://stonecera.co.uk/product-category",
      robots: "index, follow",
    },
  };
  if (!data) return {};
  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default function ProductCategoryPage() {
  return (
    <>
      <section className="bg-[#262a18] py-20 px-4 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            fill
            priority
            quality={100}
            className="w-full h-full object-cover"
            src={Banner}
            alt="Abstract aerial texture of various stone paving materials arranged in a geometric grid"
          />
        </div>

        {/* Content */}
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <p
            className="text-[#d8c06a] text-xs tracking-[0.4em] uppercase mb-6 font-medium"
            style={{
              opacity: 1,
              transform: "none",
            }}
          >
            Exquisite Materials
          </p>

          <h1
            className="font-serif text-5xl lg:text-8xl mb-8 text-[#f5f0e8]"
            style={{
              fontFamily: '"Instrument Serif", serif',
              opacity: 1,
              transform: "none",
            }}
          >
            Stone <em>Collections</em>
          </h1>

          <p
            className="text-stone-400 max-w-3xl mx-auto text-lg leading-relaxed"
            style={{
              opacity: 1,
              transform: "none",
            }}
          >
            Discover our curated range of premium natural stone and
            precision-engineered porcelain. Sourced from the finest quarries
            globally and delivered directly to your project.
          </p>
        </div>
      </section>
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-stone-100 px-4 lg:grid-cols-4 lg:px-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-center gap-4 px-6 py-6"
              >
                <Icon
                  size={24}
                  strokeWidth={2}
                  className="shrink-0 text-[#99a14e]"
                />

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {feature.title}
                  </p>

                  <p className="text-xs text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-[#f9f7f3]">
        <div className="mx-auto max-w-[1440px] px-4 py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/product-category/${collection.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative mb-8 aspect-[16/10] overflow-hidden border border-stone-200 shadow-sm">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/0" />

                  {/* Arrow */}
                  <div className="absolute right-6 top-6">
                    <div className="flex h-12 w-12 translate-x-12 items-center justify-center rounded-full bg-white/90 text-[#262a18] opacity-0 shadow-xl transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h3
                      className="text-3xl text-[#262a18]"

                    >
                      {collection.title}
                    </h3>

                    <div className="h-px flex-1 bg-stone-200" />
                  </div>

                  <p className="max-w-xl font-sans  leading-relaxed text-stone-600">
                    {collection.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {collection.labels.map((label) => (
                      <span
                        key={label}
                        className="border border-[#99a14e]/10 bg-[#99a14e]/5 px-3 py-1 text-[12px] font-bold uppercase tracking-widest font-sans text-[#99a14e]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* <FaqsAccordion
        mainHeading="Frequently Asked Questions"
        subHeading="Find answers to common questions about our products and services."
        faqs={productCategoryFaqs}
      /> */}

      <section className="bg-stone-900 py-24 text-stone-300">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-1">
              <h2
                className="mb-8 text-4xl text-[#f5f0e8]"
              >
                Material Selection <em>Guide</em>
              </h2>

              <p className="mb-8 leading-relaxed font-sans">
                Choosing the right paving material is a critical decision for
                any landscape project. From the natural variation of Sandstone
                to the precision of Italian Porcelain, each material offers
                unique technical and aesthetic properties.
              </p>

              <Link
                href="/idjudha5g8q1jss8u4rpt/preview/journal"
                className="inline-flex items-center gap-2 border-b border-[#d8c06a]/30 pb-1 text-sm font-medium text-[#d8c06a] transition-colors hover:border-[#d8c06a]"
              >
                Read our material guides
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Guides */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:col-span-2">
              {materialGuides.map((guide) => (
                <div key={guide.title}>
                  <h4 className="mb-4 text-md font-bold font-sans uppercase tracking-wider text-white">
                    {guide.title}
                  </h4>

                  <p className=" leading-relaxed font-sans text-stone-400">
                    {guide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
