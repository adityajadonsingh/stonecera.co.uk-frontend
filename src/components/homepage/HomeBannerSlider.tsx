import Image from "next/image";
import Link from "next/link";
import { Banner } from "@/lib/types";
import {
  Award,
  Headset,
  LockKeyhole,
  Truck,
} from "lucide-react";
import BannerImg from "../../../public/media/County-Lgy-Porcelain.webp";

export default function HomeBannerSlider({ banners }: { banners: Banner[] }) {
  const item = banners[0];

  if (!banners || banners.length === 0) return null;

  return (
    <>
      <section className="banner bg-[#fafbfc]">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:gap-6 md:gap-3 gap-6 items-center md:py-12 py-6">
            {/* Content Overlay */}
            <div className="flex items-center">
              <div className="text-start">
                <h1 className="md:text-3xl sm:text-4xl text-2xl text-[#2b2b2b] leading-tight xl:text-5xl font-bold mb-3">
                  Premium Porcelain & <br className="md:block hidden" /> Natural Stone <br />{" "}
                  <span className="heading">Delivered Across the UK</span>
                </h1>
                <p className="text-sm xl:text-lg opacity-90 mb-5">
                  {item.subHeading}
                </p>

                <div className="flex gap-4">
                  <Link
                    href="/product-category/outdoor-porcelain-tiles/"
                    className="inline-block lg:text-lg text-base bg-[#bd7e40] text-[#F7F3EB] lg:font-semibold font-medium lg:px-6 lg:py-3 px-3 py-1 rounded-md shadow hover:bg-[#4A3A2A] hover:text-[#F7F3EB] transition"
                  >
                    Shop Porcelain
                  </Link>
                  <Link
                    href="/contact-us/"
                    className="inline-block lg:text-lg text-base bg-[#ffff] text-[#000] border-2 lg:font-semibold font-medium lg:px-6 lg:py-3 px-3 py-1 rounded-md shadow hover:bg-[#4A3A2A] hover:text-[#F7F3EB] transition"
                  >
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
            {/* Banner Image */}
            <div className="relative md:shadow-2xl shadow-lg z-0  aspect-[7/5] rounded-2xl overflow-hidden">
              <Image
                src={BannerImg}
                alt={"County Lgy Porcelain Tile"}
                fill
                priority
                className="object-cover z-10 object-center"
              />
              <div className="absolute z-20 rounded-lg md:top-4 top-2 md:right-4 right-2 md:px-4 px-2 py-2 bg-white">
                <span className="font-bold block md:text-lg text-base text-[#bd7e40]">From £23.38 /m²</span>
                <span className="text-xs block">Premium Porcelain</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="advantages py-7 bg-skin ">
        <div className="container">
          <div className="grid md:grid-cols-4 grid-cols-2 lg:px-10  gap-y-5">
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <div className="flex shadow-md w-[60px] h-[60px] items-center justify-center rounded-full bg-[#ffff]">
                <Truck color={"#bd7e40"} className="w-[clamp(24px,4vw,30px)] h-[clamp(24px,4vw,30px)]" />
              </div>
              <span className="font-semibold text-center lg:leading-tight leading-1 mt-3 lg:text-base text-sm">
                UK Wide Delivery
              </span>
              <span className="lg:text-sm text-xs text-center">Fast & reliable shipping</span>
            </div>
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <div className="flex shadow-md w-[60px] h-[60px] items-center justify-center rounded-full bg-[#ffff]">
                <Award color={"#bd7e40"} className="w-[clamp(24px,4vw,30px)] h-[clamp(24px,4vw,30px)]" />
              </div>
              <span className="font-semibold text-center lg:leading-tight leading-1 mt-3 lg:text-base text-sm">
                Premium Materials
              </span>
              <span className="lg:text-sm text-xs text-center">Highest quality guaranteed</span>
            </div>
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <div className="flex shadow-md w-[60px] h-[60px] items-center justify-center rounded-full bg-[#ffff]">
                <LockKeyhole color={"#bd7e40"} className="w-[clamp(24px,4vw,30px)] h-[clamp(24px,4vw,30px)]" />
              </div>
              <span className="font-semibold text-center lg:leading-tight leading-1 mt-3 lg:text-base text-sm">
                Secure Transaction
              </span>
              <span className="lg:text-sm text-xs text-center">100% protected checkout</span>
            </div>

            <div className="flex flex-col gap-y-2 items-center justify-center">
              <div className="flex shadow-md w-[60px] h-[60px] items-center justify-center rounded-full bg-[#ffff]">
                <Headset color={"#bd7e40"} className="w-[clamp(24px,4vw,30px)] h-[clamp(24px,4vw,30px)]" />
              </div>
              <span className="font-semibold text-center lg:leading-tight leading-1 mt-3 lg:text-base text-sm">
                Trusted Support
              </span>
              <span className="lg:text-sm text-xs text-center">Expert advice available</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// "use client";

// import { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import Image from "next/image";
// import Link from "next/link";
// import { Banner } from "@/lib/types";
// import { Award, BadgePoundSterling, HeartHandshake, LockKeyhole, Truck } from "lucide-react";

// export default function HomeBannerSlider({ banners }: { banners: Banner[] }) {
//   const swiperRef = useRef<SwiperType | null>(null);

//   if (!banners || banners.length === 0) return null;

//   return (
//     <>
//       <section className="banner h-[52vh] md:h-[75vh] w-full">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         loop
//         speed={1500}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         className="w-full h-full swiper-btn-1 swiper-pgn-1"
//       >
//         {banners.map((item, i) => (
//           <SwiperSlide key={item.id}>
//             <div className="relative w-full h-full">
//               {/* Banner Image */}
//               <Image
//                 src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.bannerImage.url}`}
//                 alt={item.bannerImage.alternativeText || "Banner Image"}
//                 fill
//                 priority={i === 0}
//                 fetchPriority={i === 0 ? "high" : "auto"}
//                 className="object-cover"
//               />

//               {/* Content Overlay */}
//               <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-8 md:px-16">
//                 <div
//                   className="text-white max-w-4xl text-center"
//                   onMouseEnter={() => swiperRef.current?.autoplay.stop()}
//                   onMouseLeave={() => swiperRef.current?.autoplay.start()}
//                 >
//                   <h2 className="text-3xl md:text-5xl font-bold mb-3">
//                     {item.heading}
//                   </h2>
//                   <p className="text-lg md:text-xl opacity-90 mb-5">
//                     {item.subHeading}
//                   </p>
//                   {item.link && (
//                     <Link
//                       href={item.link}
//                       className="inline-block bg-[#F7F3EB] text-[#bd7e40] font-semibold px-6 py-3 rounded-md shadow hover:bg-[#4A3A2A] hover:text-[#F7F3EB] transition"
//                     >
//                       Shop Now
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//     <section className="advantages py-7 bg-skin ">
//       <div className="container">
//         <div className="grid grid-cols-5">
//           <div className="flex items-center justify-center gap-x-2 border-r-2">
//             <LockKeyhole size={40} />
//             <span className="font-medium leading-tight">Secure <br></br> Transaction</span>
//           </div>
//           <div className="flex items-center justify-center gap-x-2 border-r-2">
//             <Truck size={40} />
//             <span className="font-medium leading-tight">Timely <br></br> Delivery</span>
//           </div>
//           <div className="flex items-center justify-center gap-x-2 border-r-2">
//             <Award size={40} />
//             <span className="font-medium leading-tight">Certified  <br></br> Quality</span>
//           </div>
//           <div className="flex items-center justify-center gap-x-2 border-r-2">
//             <HeartHandshake size={40} />
//             <span className="font-medium leading-tight">Customer <br></br> Satisfaction</span>
//           </div>
//           <div className="flex items-center justify-center gap-x-2 ">
//             <BadgePoundSterling size={40} />
//             <span className="font-medium leading-tight">Reasonable <br></br> Price</span>
//           </div>
//         </div>
//       </div>
//     </section>
//     </>
//   );
// }
