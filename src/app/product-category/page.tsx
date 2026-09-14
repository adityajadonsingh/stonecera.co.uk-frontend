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
import FaqsAccordion from "@/components/FaqAccordion";

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
      "Create a contemporary look with durable porcelain planks designed to replicate the natural character of timber and stone. Ideal for modern interiors and spaces where easy maintenance and lasting performance matter.",
    labels: ["DURABLE", "LOW MAINTENANCE", "WOOD-LOOK DESIGN"],
  },
  {
    title: "Outdoor Porcelain Tiles",
    slug: "outdoor-porcelain-tiles",
    image: OutdoorPorcelainTiles,
    description:
      "Create stylish patios, terraces and garden pathways with durable outdoor porcelain tiles. With low water absorption, easy maintenance and a wide choice of colours and finishes, porcelain is a practical choice for modern outdoor spaces.",
    labels: [
      "Precision Calibrated",
      "Frost Resistant",
      "Stain Proof",
      "EASY TO MAINTAIN",
    ],
  },
  {
    title: "Cobblestone Paving",
    slug: "cobblestone-paving",
    image: CobblestonePaving,
    description:
      "Add traditional character and texture with natural cobblestone paving. Ideal for driveways, pathways, borders and landscaping, cobbles create durable surfaces with a distinctive, time-worn appearance.",
    labels: ["Heavy Duty", "Permeable Options", "Natural Texture"],
  },
  {
    title: "Slate Stone",
    slug: "slate-stone",
    image: SlateStone,
    description:
      "Bring natural texture and rich colour variation to your project with slate stone. Its distinctive layered surface makes it a versatile choice for paving, flooring, feature areas and architectural applications.",
    labels: ["Hand Split", "Natural Riven", "Rich Tones"],
  },
  {
    title: "Limestone Paving",
    slug: "limestone-paving",
    image: LimestonePaving,
    description:
      "Limestone paving brings soft natural tones and understated elegance to patios, pathways and garden spaces. Choose from a range of colours, finishes and textures to suit traditional and contemporary designs.",
    labels: ["Sawn Edges", "Uniform Color", "Cool to Touch"],
  },
  {
    title: "Sandstone Paving",
    slug: "sandstone-paving",
    image: SandstonePaving,
    description:
      "Discover natural sandstone paving in a range of colours, finishes and sizes. From warm Raj Green and Autumn Brown to contemporary Kandla Grey, Indian sandstone brings natural variation, texture and character to patios, pathways and driveways.",
    labels: ["Ethically Sourced", "Weather Resistant", "Unique Veining"],
  },
  {
    title: "Wall Cladding",
    slug: "wall-cladding",
    image: WallCladding,
    description:
      "Transform walls and architectural features with natural stone wall cladding. Add depth, texture and character to interior feature walls, garden walls, facades and landscaping projects.",
    labels: ["Easy Install", "Z-Panel Design", "Natural Finish"],
  },
  {
    title: "Bricks",
    slug: "bricks",
    image: Bricks,
    description:
      "Create durable, characterful surfaces with our range of bricks for landscaping and architectural projects. Ideal for pathways, borders, walls and traditional designs where texture and timeless appeal matter.",
    labels: ["Herringbone Ready", "Clay & Concrete", "Edge Borders"],
  },
];

const materialGuides = [
  {
    title: "Natural Stone",
    description:
      "Natural stone offers individuality that manufactured surfaces cannot fully replicate. Sandstone, limestone and slate each have their own colours, textures and natural variations, making every installation distinctive.",
  },
  {
    title: "Porcelain",
    description:
      "Porcelain tiles offer a consistent appearance with excellent durability and low maintenance. They are available in a wide range of colours, patterns and finishes for contemporary indoor and outdoor spaces.",
  },
  {
    title: "Sandstone vs Limestone",
    description:
      "Sandstone offers warmer colours and natural variation, while limestone is known for its softer tones and understated appearance. Both can create beautiful patios, pathways and garden spaces when the right product and finish are selected.",
  },
  {
    title: "Paving & Driveways",
    description:
      "For areas exposed to regular foot traffic or vehicles, consider the stone's thickness, strength, surface finish and installation requirements. Cobblestones, sandstone and suitable porcelain paving can all offer different solutions depending on the project.",
  },
];

const stoneCollectionsFaq = {
  mainHeading: "Frequently Asked Questions",
  subHeading:
    "Find answers to common questions about our natural stone, porcelain and architectural surfaces.",
  items: [
    {
      question: "What types of stone and paving does Stonecera supply?",
      answer:
        "Stonecera supplies a wide range of natural stone and modern surfaces, including sandstone, limestone, slate, cobblestone paving, porcelain tiles, porcelain planks, wall cladding and bricks.",
      sort_order: 1,
    },
    {
      question: "Are Stonecera products suitable for indoor and outdoor spaces?",
      answer:
        "Yes. Our collection includes materials suitable for a variety of indoor and outdoor applications. Product suitability depends on the material, finish and intended use, so always check the individual product specifications before ordering.",
      sort_order: 2,
    },
    {
      question: "What is the difference between natural stone and porcelain paving?",
      answer:
        "Natural stone has naturally occurring variations in colour, texture and pattern, giving every installation a distinctive appearance. Porcelain offers a more consistent finish and is generally easy to maintain, with a wide range of colours and designs.",
      sort_order: 3,
    },
    {
      question: "Which stone is best for a patio?",
      answer:
        "The best paving material depends on your preferred style, maintenance requirements, budget and how the space will be used. Sandstone and limestone offer natural character, while outdoor porcelain provides a consistent contemporary finish and low-maintenance option.",
      sort_order: 4,
    },
    {
      question: "What should I consider when choosing paving?",
      answer:
        "Consider where the material will be installed, expected foot or vehicle traffic, required thickness, surface finish, slip resistance, maintenance requirements, colour and installation method. These factors will help you choose a material that suits both the project and its surroundings.",
      sort_order: 5,
    },
  ],
};
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
          <p className="text-[#d8c06a] text-xs tracking-[0.4em] uppercase mb-6 font-medium">
            TIMELESS IN NATURE
          </p>

          <h1 className="text-3xl font-medium lg:text-6xl mb-4 text-[#f5f0e8]">
            Natural Stone & Porcelain <em>Collections</em>
          </h1>

          <p className="text-stone-300 max-w-3xl mx-auto lg:text-lg sm:text-base text-sm  leading-relaxed">
            Explore quality natural stone and modern surfaces, crafted to bring
            character, style and lasting beauty to every space.
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
                    <h3 className="text-3xl text-[#262a18]">
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

      <section className="bg-stone-900 py-24 text-stone-300">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Left Content */}
            <div className="lg:col-span-1">
              <h2 className="mb-8 text-4xl text-[#f5f0e8]">
                Choosing the Right <em>Material</em> for Your Project
              </h2>

              <p className="mb-8 leading-relaxed font-sans">
                Selecting the right surface starts with understanding how the
                material will be used. Consider the location, expected traffic,
                maintenance requirements, finish and overall style before
                choosing your stone or porcelain.
              </p>

              <Link
                href="/product-catalogue"
                className="inline-flex items-center gap-2 border-b border-[#d8c06a]/30 pb-1 text-sm font-medium text-[#d8c06a] transition-colors hover:border-[#d8c06a]"
              >
                See Our Digital Catalogue
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

      <FaqsAccordion
        mainHeading={stoneCollectionsFaq.mainHeading}
        subHeading={stoneCollectionsFaq.subHeading}
        items={stoneCollectionsFaq.items}
      />
    </>
  );
}

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
