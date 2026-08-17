
export default function PageContent2() {
  return (
    <>
      <section className="py-24 bg-[#f9f7f3] section-border">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="max-w-full">
            <h2 className="text-4xl mb-10 text-[#262a18]">
              Leading Suppliers of Premium Natural Stone Paving & Outdoor
              Porcelain
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-600 leading-relaxed text-sm font-sans">
              {/* Left Column */}
              <div className="space-y-6 ">
                <p>
                  Transform your outdoor living space with Stonecera&apos;s
                  exquisite collection of natural stone and vitrified porcelain
                  paving. We specialize in sourcing the highest quality{" "}
                  <strong>Indian Sandstone</strong>, including the popular{" "}
                  <em>Raj Green</em> and <em>Kandla Grey</em> varieties, as well
                  as premium <strong>Portuguese Limestone</strong> and{" "}
                  <strong>Brazilian Slate</strong>.
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
