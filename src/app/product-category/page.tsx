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
      "Make your design fresh and modern with porcelain planks, which will provide a sense of space due to their elongated shape as well as natural timber effects. Porcelain planks allow you to have a wood-like floor with less maintenance compared to the use of genuine timber.",
    labels: ["Scratch Resistant", "Zero Maintenance", "Anti-Slip R11"],
  },
  {
    title: "Outdoor Porcelain Tiles",
    slug: "outdoor-porcelain-tiles",
    image: OutdoorPorcelainTiles,
    description:
      "Your garden will look beautiful and elegant with the help of porcelain tiles. In addition, their clean look will be in harmony with all furniture and planting, and the thick surface makes their cleaning easy. Porcelain tiles are perfect for the British garden with a lot of activity.",
    labels: ["Precision Calibrated", "Frost Resistant", "Stain Proof"],
  },
  {
    title: "Cobblestone Paving",
    slug: "cobblestone-paving",
    image: CobblestonePaving,
    description:
      "No other style provides a unique charm of cobbling like this. With their small-sized and classical look, cobbling can give additional accents to driveways, pathways, gardens, and even the border of the garden. You can use them individually or together with large paving formats.",
    labels: ["Heavy Duty", "Permeable Options", "Natural Texture"],
  },
  {
    title: "Slate Stone",
    slug: "slate-stone",
    image: SlateStone,
    description:
      "If you need an intense natural look, then slate stone will be the right choice with its unique combination of colour variations and textures. The layered structure of slate stone makes any paved area very special and the natural riven face adds a tactile quality.",
    labels: ["Hand Split", "Natural Riven", "Rich Tones"],
  },
  {
    title: "Limestone Paving",
    slug: "limestone-paving",
    image: LimestonePaving,
    description:
      "Limestone creates a quiet and sophisticated alternative to paving materials. This material's modest colors and naturally occurring smoothness will enable the creation of harmonious surroundings. Limestone works best when the aim is to incorporate the paving into the architecture, plantings, and outdoor furniture.",
    labels: ["Sawn Edges", "Uniform Color", "Cool to Touch"],
  },
  {
    title: "Sandstone Paving",
    slug: "sandstone-paving",
    image: SandstonePaving,
    description:
      "Sandstone gives your garden a relaxing and natural feel. Each piece of stone has a unique combination of colors and markings so the finished product will have a natural appearance and not a perfectly flat surface. Its warm sandstone is an excellent choice for patios, seating areas and gardens.",
    labels: ["Ethically Sourced", "Weather Resistant", "Unique Veining"],
  },
  {
    title: "Wall Cladding",
    slug: "wall-cladding",
    image: WallCladding,
    description:
      "Alter the character of any wall without rebuilding it. Using cladding, you can create an interesting, layered texture that will transform ordinary walls into unique elements. This technique is useful for highlighting doorways, garden walls, building façades or creating special elements inside and outside your home.",
    labels: ["Easy Install", "Z-Panel Design", "Natural Finish"],
  },
  {
    title: "Bricks",
    slug: "bricks",
    image: Bricks,
    description:
      "The wide variety of bricks enables their use for building various structures such as fences and walls. You may use bricks to define boundaries of certain areas, create pathways, add decorative elements or construct complete walls.",
    labels: ["Herringbone Ready", "Clay & Concrete", "Edge Borders"],
  },
];

const materialGuides = [
  {
    title: "Natural Stone Care Guide",
    description:
      "Natural stone is characterized by individual tones, texture, and pattern that makes each installation unique. Sandstone and limestone will serve you well for decades with proper maintenance. Clean the surface regularly, seal it properly and use only products recommended for natural stone in order to protect the surface from daily dirt, moisture and stains and preserve its original condition.",
  },
  {
    title: "Why Porcelain Paving Stands Out?",
    description:
      "Porcelain is a great option for those who need a modern and low-maintenance surface. With minimal upkeep required, porcelain paving offers a practical and long-lasting solution while maintaining its elegant look for years to come. Denseness of the structure limits water absorption, which makes it perfect for varying weather conditions in Britain. Good frost, stain and daily wear resistance allows using porcelain paving tiles for creating durable patios, pathways, terraces and other outdoor surfaces.",
  },
  {
    title: "Selected Materials With Care",
    description:
      "Material quality is not only about what you buy but also where it comes from. We collaborate with carefully chosen suppliers to deliver paving materials that live up to our standards in terms of quality, reliability and sustainable manufacture. By evaluating the origin and the process of manufacture of our products, we strive to offer paving that will combine visual appeal with a more sustainable approach to material sourcing.",
  },
  {
    title: "Advice Beyond The Product",
    description:
      "Paving is only one aspect of successfully installing outdoor structures. We offer professional advice that will help you to select the right paving and install it. From the appropriateness of materials, laying procedures to the sub-base and technical issues, we are here to help you throughout the whole process.",
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
            TIMELESS IN NATURE
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
            className="text-stone-300 max-w-4xl mx-auto text-lg leading-relaxed"
            style={{
              opacity: 1,
              transform: "none",
            }}
          >
            Explore our range of quality natural stone and modern paving, perfect for adding character, style and function to any outdoor area. Find the materials you need to turn your ideas into spaces you'll enjoy for years to come - from understated textures to statement finishes.
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
                A good design for your outdoor space always starts with selecting the appropriate paving material. Whether you want to highlight the natural beauty of sandstone, limestone or create a sleek and contemporary surface with porcelain, different paving materials have their own unique qualities. Discover all of our paving choices and select the one that fits your design, budget, and needs.
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
    </>
  );
}
