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
                  <Link href="/product-category/sandstone-paving/"><strong>Sandstone</strong></Link> brings a touch of warmth and individuality, while <Link href="/product-category/limestone-paving/"><strong>Limestone</strong></Link> offers a smoother look. For more detailed visual solutions, slate will provide you with naturally textured surface; porcelain is a modern alternative with its neat surfaces and ease of maintenance.
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <p>
                  Our paving is supplied by reputable producers and suppliers, enabling us to provide customers with reliable range at affordable prices. Whether it is a private patio or bigger landscaping project - we can help you to select suitable materials for your needs.
                </p>

                <ul className="space-y-3 font-bold text-[#262a18] uppercase tracking-tighter text-[11px]">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Carefully selected paving ranges
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Affordable direct supplier prices
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Delivery across the UK via pallet
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Advice on installation and technical issues
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#99a14e]" />
                    Support for landscaping professionals
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
