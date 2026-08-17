import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import Image1 from "../../../public/media/natural-stone-supplier.webp"

export default function PageContent1() {
  return (
    <section className="py-24 lg:py-40 bg-[#262a18] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Content */}
        <div>
          <p className="text-[10px] font-sans tracking-[0.4em] uppercase mb-6 font-bold text-[#d8c06a]">
            The Stonecera Advantage
          </p>

          <h2 className=" text-5xl lg:text-7xl leading-[1.1] mb-10 text-[#f5f0e8]">
            Ethically Sourced.
            <br />
            <em>Expertly</em> Graded.
          </h2>

          <div className="space-y-8 text-stone-400 leading-relaxed text-lg">
            <p>
              As a family-owned business with over 20 years of experience in
              the stone industry, Stonecera has built its reputation on a
              simple promise: providing architectural-grade paving materials
              directly to your doorstep without the middleman markups.
            </p>

            {/* Advantages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
              {/* Quality Control */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CircleCheck
                    size={18}
                    className="text-[#99a14e] shrink-0"
                  />

                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                    Rigorous Quality Control
                  </h4>
                </div>

                <p className="text-sm leading-relaxed">
                  Every pallet is inspected at the source and again at our UK
                  distribution hub.
                </p>
              </div>

              {/* Direct Import Pricing */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CircleCheck
                    size={18}
                    className="text-[#99a14e] shrink-0"
                  />

                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                    Direct Import Pricing
                  </h4>
                </div>

                <p className="text-sm leading-relaxed">
                  We own our supply chain, ensuring we offer the best value for
                  premium materials.
                </p>
              </div>

              {/* Trade Support */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CircleCheck
                    size={18}
                    className="text-[#99a14e] shrink-0"
                  />

                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                    Trade Support
                  </h4>
                </div>

                <p className="text-sm leading-relaxed">
                  Dedicated account managers for landscape designers and
                  contractors.
                </p>
              </div>

              {/* Technical Advice */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CircleCheck
                    size={18}
                    className="text-[#99a14e] shrink-0"
                  />

                  <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                    Expert Technical Advice
                  </h4>
                </div>

                <p className="text-sm leading-relaxed">
                  From sub-base preparation to sealing, our team knows stone.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-widest bg-white text-[#262a18] hover:bg-[#f5f0e8] transition-all"
            >
              Speak to a Stone Specialist

              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/5] relative z-10 shadow-2xl overflow-hidden">
            <Image
              src={Image1}
              alt="Detailed close up of premium limestone textures and precise joints in a luxury outdoor living space"
              fill
              className="object-cover"
            />
          </div>

          {/* Decorative shapes */}
          <div className="absolute -top-12 -right-12 w-2/3 aspect-square bg-[#d8c06a]/10 -z-0" />

          <div className="absolute -bottom-12 -left-12 w-2/3 aspect-square border border-white/10 -z-0" />
        </div>
      </div>
    </section>
  );
}
