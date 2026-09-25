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
                    Welcome to Stonecera! A name that has become synonymous with
                    quality, trust, and timeless stone solutions. Stonecera is a
                    respected supplier in the UK, just like other natural and
                    engineered stone businesses. We pride ourselves on creating
                    a strong reputation for comfort and consistency in the
                    quality of products for clients, whether they were for
                    domestic or commercial use.
                  </p>

                  <p className="text-base leading-relaxed text-[#4a5530]">
                    We started with the vision of connecting our customers with
                    the finest natural materials sourced from the best quarries
                    and manufacturers. Our collection is filled with natural
                    sandstone, limestone, granite, or precision-made porcelain
                    and quartz. We have represented craftsmanship, durability,
                    and style.
                  </p>

                  <p className="text-base leading-relaxed text-[#4a5530]">
                    All products sold through this website are delivered to you
                    “as is” and “as available”. While we use our best efforts to
                    make sure the information about products and their
                    performance that our website offers is correct, we make no
                    warranties, express or implied, concerning the appropriate
                    of any information, completeness of the content, or fitness
                    for a particular purpose or products.
                  </p>

                  <p className="text-base leading-relaxed text-[#4a5530]">
                    At Stonecera, we're aware that selecting the ideal stone is
                    not just about appearance, it's about performance,
                    durability and ultimately value. That's why our teams go the
                    extra mile to provide suitable recommendations to provide
                    our customers with valuable insight that meets their design
                    and functional goals.
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
                Our Journey
              </p>

              <h2
                className="mb-6 font-serif text-4xl leading-tight text-[#262a18]"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                A modern legacy in the making.
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                Founded 5 years ago, Stonecera was born from a vision to disrupt
                the traditional stone industry. While we are a relatively young
                company, our expertise spans decades of combined experience in
                geological sourcing and architectural design. We've quickly
                grown from a small Yorkshire-based team into one of the UK's
                most trusted suppliers of premium natural stone and porcelain.
              </p>

              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                Our growth has been driven by a simple mission: to provide the
                highest quality materials with absolute transparency. By
                building direct relationships with quarry owners in India,
                Italy, and Portugal, we've removed the middlemen, ensuring that
                every slab delivered meets our exacting standards for
                calibration, color consistency, and durability.
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
                Technical Excellence
              </p>

              <h2
                className="mb-6 font-serif text-4xl leading-tight text-[#262a18]"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                Performance is not an optional extra.
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-[#4a5530]">
                At Stonecera, technical integrity is at the heart of everything
                we do. We don't just sell stone; we provide engineered solutions
                for modern living. Every product in our collection undergoes
                rigorous testing to meet and exceed British Standards.
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
                    Every batch personally inspected at source quarry
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Calibration tolerance of ±2mm on all products
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Water absorption class A tested by independent lab
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Frost resistance certified to BS EN 12371
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Colour sorting at our Yorkshire yard before dispatch
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CircleCheck
                    size={16}
                    strokeWidth={1.8}
                    className="mt-1 shrink-0 text-[#99a14e]"
                  />

                  <span className="text-sm text-[#4a5530]">
                    Guaranteed replacement on any substandard stone
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
