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
    <section className="md:py-16 py-8 bg-skin">
      <div className="container mx-auto px-4">
        <div className={isProductPage ? "block" : "flex md:flex-nowrap flex-wrap gap-10 items-center"}>
          {/* LEFT CONTENT */}
          <div className={isProductPage ? "w-full" : "md:w-4/12 w-full" }>
            {!isProductPage ? (
              <div className="md:text-start text-center">
                <h2 className="sm:text-3xl text-2xl heading font-bold  mb-2">
                  {content.sectionTitle}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {content.sectionSubtitle}
                </p>{" "}
              </div>
            ) : (
              <>
                <h2 className="text-3xl text-center font-bold heading mb-4">
                  Testimonials
                </h2>
                <p className="text-gray-600 text-center leading-relaxed">
                  {content.sectionSubtitle}
                </p>{" "}
              </>
            )}
          </div>

          {/* RIGHT SLIDER */}
          <div className={isProductPage ? "w-full relative mt-8" : "relative md:w-8/12 w-full"}>
            {/* Navigation buttons */}
            <button className="review-prev cursor-pointer absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2">
              <ChevronLeft size={20} />
            </button>
            <button className="review-next cursor-pointer absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2">
              <ChevronRight size={20} />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".review-prev",
                nextEl: ".review-next",
              }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {content.reviews.map((review, index) => (
                <SwiperSlide key={`review-${index}`}>
                  <div className="h-full bg-white border rounded-sm border-gray-200  p-6">
                    {/* Name + stars */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">
                        {review.name}
                      </h4>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.stars
                                ? "fill-[#c97c3a] text-[#c97c3a]"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
