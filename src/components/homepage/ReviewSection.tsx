"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

type Review = {
  name: string;
  stars: number;
  review: string;
};

type ReviewSectionProps = {
  content: {
    sectionTitle: string;
    sectionSubtitle: string;
    reviews: Review[];
  };
  isProductPage?: boolean;
};

export default function ReviewSection({
  content,
  isProductPage,
}: ReviewSectionProps) {
  if (!content?.reviews?.length) return null;

  return (
    <section className="md:py-32 py-8 bg-[#262a18]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4 font-sans font-bold text-[#d8c06a]">
            Client Experiences
          </p>

          <h2 className="text-5xl lg:text-6xl text-[#f5f0e8]">
            {isProductPage ? "Trusted by Professionals" : content.sectionTitle}
          </h2>

          {content.sectionSubtitle && (
            <p className="mt-5 max-w-2xl mx-auto text-stone-400 leading-relaxed">
              {content.sectionSubtitle}
            </p>
          )}
        </div>

        {/* REVIEWS */}
        <div className="relative">
          {/* Previous */}
          <button
            aria-label="Previous review"
            className="review-prev cursor-pointer absolute -left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            aria-label="Next review"
            className="review-next cursor-pointer absolute -right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".review-prev",
              nextEl: ".review-next",
            }}
            spaceBetween={48}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {content.reviews.map((review, index) => (
              <SwiperSlide key={`review-${index}`} className="h-auto">
                <div className="h-full bg-white/5 p-8 lg:p-12 border border-white/10 relative">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.stars
                            ? "fill-[#d8c06a] text-[#d8c06a]"
                            : "text-stone-600"
                        }
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-stone-300 leading-relaxed italic mb-8">
                    &quot;{review.review}&quot;
                  </p>

                  {/* Name */}
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-widest">
                      {review.name}
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}