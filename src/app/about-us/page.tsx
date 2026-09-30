import Link from "next/link";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import AboutImg1 from "../../../public/media/about-us/about-us-page-1.webp";
import AboutImg2 from "../../../public/media/about-us/about-us-page-2.webp";
import AboutImg3 from "../../../public/media/about-us/about-us-page-3.webp";
import AboutImg4 from "../../../public/media/about-us/about-us-page-4.webp";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Breadcrum from "@/components/Breadcrum";
export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "About Stonecera | Trusted Natural Stone Supplier & Exporter",
      meta_description:
        "Get to know Stonecera, specialists in natural stone tiles, paving slabs, and flooring. Dedicated to quality products and elegant design solutions.",
      canonical_tag: "https://stonecera.co.uk/about-us",
      robots: "index, follow",
    },
  };
  if (!data) return {};
  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}
export default function AboutUsPage() {
  return (
    <>
      <Breadcrum breadcrum={[{ pageName: "About Us", pageUrl: "" }]} />
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#262a18",
          minHeight: "460px",
        }}
      >

        {/* Content */}
        <div
          className="relative z-10 mx-auto flex max-w-[1440px] flex-col justify-center px-4 lg:px-8"
          style={{
            minHeight: "460px",
          }}
        >
          <p
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em]"
            style={{
              color: "#d8c06a",
            }}
          >
            About Us
          </p>

          <h1
            className="mb-4 font-serif text-5xl leading-tight lg:text-6xl xl:text-7xl"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: "#f5f0e8",
            }}
          >
            Natural stone expertise,
            <br /> built for the modern UK market.
          </h1>

          <p
            className="max-w-xl text-base"
            style={{
              color: "rgba(245, 240, 232, 0.65)",
            }}
          >
            Stonecera brings together carefully selected natural stone,
            porcelain paving and architectural materials for projects across the
            UK. From product selection and technical guidance to reliable
            delivery, we make it easier to specify materials that combine
            lasting performance with timeless character.
          </p>
        </div>
      </section>
      <section className="overflow-hidden bg-white py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* =========================
              IMAGE COLLAGE
          ========================== */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
              {/* Left Column */}
              <div className="space-y-3 pt-8 sm:space-y-4 sm:pt-12">
                {/* Image 1 */}
                <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-[#262a18]/10">
                  <Image
                    src={AboutImg1}
                    alt="Modern grey patio paving with clean lines"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Image 2 */}
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-[#262a18]/10">
                  <Image
                    src={AboutImg2}
                    alt="Close up of premium natural stone texture"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3 sm:space-y-4">
                {/* Image 3 */}
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-[#262a18]/10">
                  <Image
                    src={AboutImg3}
                    alt="Sleek porcelain outdoor tile installation"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Image 4 */}
                <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-[#262a18]/10">
                  <Image
                    src={AboutImg4}
                    alt="Modern landscaping with architectural stone"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* =========================
              CONTENT
          ========================== */}
            <div className="flex flex-col justify-center lg:col-span-5 lg:h-full">
              <div>
                <h2
                  className="mb-6 font-serif text-5xl leading-tight text-[#262a18] sm:text-6xl lg:mb-8"
                  style={{ fontFamily: '"Instrument Serif", serif' }}
                >
                  About Us
                </h2>

                <div className="space-y-5 sm:space-y-6">
                  <p className="text-base leading-relaxed text-[#4a5530] sm:text-lg">
                    At Stonecera, we believe that paving is not only about covering an outdoor area but making sure that it becomes somewhere you really want to spend some time. If you are about to design a new patio, refurbish your garden, redesign your driveway or build an up-to-date outdoor space, we will give you carefully chosen products from stones and porcelain.
                  </p>

                  <p className="text-base leading-relaxed text-[#4a5530]">
                    We are a UK-based paving distributor with a wide range of natural stones and porcelain paving to meet the demands of all sorts of projects. We have natural sandstone and limestone paving as well as up-to-date porcelain paving in a number of different colors, textures, sizes and finishes. You can find both warm and traditional tones and cold and contemporary ones. We know that choosing paving can be a hard task. There is a lot of material to consider before choosing anything. We are here to make it easier for you.
                  </p>

                  <p className="text-base leading-relaxed text-[#4a5530]">
                    We choose quality, aesthetics and practicality. Porcelain is modern and elegant with uniform colors and finishes, while natural stone has its own characteristics and variations.
                  </p>

                  <p className="text-base leading-relaxed text-[#4a5530]">
                    We're excited to help customers find the right materials for their areas at Stonecera. From a little garden project to a complete landscaping plan, we would like to make selecting the correct paving easy and fun.
                  </p>
                  <p className="text-base leading-relaxed text-[#4a5530]">
                    Stonecera is about quality products, smart decisions and great outdoor spaces. Discover the stone and porcelain paving from our range and make your choice!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y-[0.5px] border-y-[rgba(38,42,24,0.1)] py-16 md:py-20 lg:py-24 bg-[#f9f7f3]">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* =========================
              OUR JOURNEY
          ========================== */}
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#99a14e]">
                Our Story
              </p>

              <h2
                className="mb-6 font-serif text-4xl leading-tight text-[#262a18]"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                Stone with purpose. Design with character.
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                At Stonecera, we believe that there’s no such thing as a perfect material unless combined with high-quality design and excellent performance. Stonecera history started with one simple idea - creating a combination of natural stone and porcelain that would be unique in its appearance, high in quality, and reliable enough to meet the needs of any project.
              </p>

              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                The materials we offer are selected taking into account their look, texture, finish, durability, and suitability for specific purposes. The natural variations of stone like sandstone or limestone, as well as the elegant porcelain tiles with their unique textures and patterns – everything that gives us new design opportunities.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                For us, a large variety of products is not only about having a big collection. It is also about providing an opportunity to choose products that are both stylish and practical. We work with reliable suppliers and create strict standards for our collections so that the selection process for each client will become easier.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3
                    className="mb-1 font-serif text-2xl text-[#d8c06a]"
                    style={{ fontFamily: '"Instrument Serif", serif' }}
                  >
                    5+
                  </h3>

                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#262a18]">
                    Years of Innovation
                  </p>
                </div>

                <div>
                  <h3
                    className="mb-1 font-serif text-2xl text-[#d8c06a]"
                    style={{ fontFamily: '"Instrument Serif", serif' }}
                  >
                    5k+
                  </h3>

                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#262a18]">
                    Projects Completed
                  </p>
                </div>
              </div>
            </div>

            {/* =========================
              TECHNICAL EXCELLENCE
          ========================== */}
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#99a14e]">
                QUALITY & PERFORMANCE
              </p>

              <h2
                className="mb-6 text-4xl leading-tight text-[#262a18]"
              >
                Exquisite materials. Consistent performance.
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                Stonecera believes that quality must both speak for itself once the project is complete, and perform dependably every day. For this reason, performance is a vital factor in our collection selection process. We move past aesthetics to consider factors that could make all the difference in the completed project.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
               Every material is unique in terms of its attributes and properties, and this is information that should be considered when customers are making their decisions. Our selection of products takes into account the factors of color, texture, surface finish, consistency, durability, and application suitability.
              </p>
              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                No matter whether your project requires paving for an outdoor area, porcelain tiles for a modern look, natural stone for interior spaces, or wall cladding for a unique touch, we try to offer materials which strike the right balance between style, quality and functionality.
              </p>

              {/* Technical Points */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Well-selected natural stone and porcelain
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Quality-minded selection of products
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Exquisite natural colors and textures
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Consistent finishes for selected collections
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Selection based on intended applications
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Durable materials for appropriate indoor/outdoor applications
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-4 text-center lg:px-8">
          <h2
            className="mb-8 font-serif text-4xl lg:text-5xl"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: "#262a18",
            }}
          >
            Create spaces that stand the test of time.
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products/"
              className="inline-flex items-center gap-2 bg-[#262a18] px-10 py-4 text-sm font-medium tracking-wide text-[#f5f0e8] transition-colors hover:bg-[#4a5530]"
            >
              Explore Products
            </Link>

            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 border border-[#262a18] px-10 py-4 text-sm font-medium tracking-wide text-[#262a18] transition-colors hover:bg-[#262a18] hover:text-[#f5f0e8]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
      {/* <ContactForm page="about-us" /> */}
    </>
  );
}
