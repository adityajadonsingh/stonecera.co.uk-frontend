import Link from "next/link";


export default function PageContent2() {
  return (
    <>
      <section className="md:py-32 py-8 bg-[#f9f7f3] section-border">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="max-w-full">
            <h2 className="text-4xl mb-10 text-[#262a18]">
              Trusted Suppliers of Premium Natural Stone Paving & Outdoor Porcelain
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-stone-600 leading-relaxed text-sm font-sans">
              {/* Left Column */}
              <div className="space-y-6 ">
                <p>
                  Using selected paving in terms of looks and functionality, you are able to create an attractive outdoor area from a standard garden. Stonecera is the only company that offers all-natural stones combined with <Link href="/product-category/outdoor-porcelain-tiles/"><strong>Outdoor Porcelain Paving</strong></Link>, with many options to create a beautiful outside space.
                </p>

                <p>
                  Our <strong>Outdoor Porcelain</strong> range represents the
                  pinnacle of paving technology. Vitrified porcelain is fired at
                  extreme temperatures, resulting in a non-porous, incredibly
                  durable slab that is frost-proof, slip-resistant (R11 rated),
                  and completely resistant to moss and algae growth. It&apos;s
                  the perfect choice for modern, low-maintenance patios.
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <p>
                  At Stonecera, we believe that quality stone should be
                  accessible. By working directly with quarries in India,
                  Portugal, Italy, and beyond, we eliminate the unnecessary
                  costs of intermediaries. This allows us to provide
                  professional-grade materials at competitive prices, whether
                  you&apos;re ordering a single pack for a DIY project or
                  multiple crates for a commercial development.
                </p>

                <ul className="space-y-3 font-bold text-[#262a18] uppercase tracking-tighter text-[11px]">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Ethically Sourced & CE Certified
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Nationwide Pallet Delivery in 3-5 Working Days
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Full Technical Support for Installation
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Trade Accounts for Landscaping Professionals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
