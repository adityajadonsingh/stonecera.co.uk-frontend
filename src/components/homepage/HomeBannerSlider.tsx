import Image from "next/image";
import Link from "next/link";
import { Banner } from "@/lib/types";
import { Award, BadgePoundSterling, HeartHandshake, LockKeyhole, Truck } from "lucide-react";

export default function HomeBannerSlider({ banners }: { banners: Banner[] }) {
  const item = banners[0];

  if (!banners || banners.length === 0) return null;

  return (
    <>
      <section className="banner h-[52vh] md:h-[75vh] w-full">
      <div
        className="w-full h-full"
      >
            <div className="relative w-full h-full">
              {/* Banner Image */}
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.bannerImage.url}`}
                alt={item.bannerImage.alternativeText || "Banner Image"}
                fill
                priority
                className="object-cover"
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-8 md:px-16">
                <div
                  className="text-white max-w-4xl text-center"
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-3">
                    {item.heading}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 mb-5">
                    {item.subHeading}
                  </p>
                  {item.link && (
                    <Link
                      href={item.link}
                      className="inline-block bg-[#F7F3EB] text-[#bd7e40] font-semibold px-6 py-3 rounded-md shadow hover:bg-[#4A3A2A] hover:text-[#F7F3EB] transition"
                    >
                      Shop Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
      </div>
    </section>
    <section className="advantages py-7 bg-skin ">
      <div className="container">
        <div className="grid md:grid-cols-5 sm:grid-cols-3  gap-y-5">
          <div className="flex sm:flex-row flex-col gap-y-1 items-center justify-center gap-x-2 sm:border-r-2">
            <LockKeyhole className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
            <span className="font-medium leading-tight sm:mt-0 mt-3">Secure <br className="sm:block hidden"></br> Transaction</span>
          </div>
          <div className="flex sm:flex-row flex-col gap-y-1 items-center justify-center gap-x-2 sm:border-r-2">
            <Truck className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
            <span className="font-medium leading-tight sm:mt-0 mt-3">Timely <br className="sm:block hidden"></br> Delivery</span>
          </div>
          <div className="flex sm:flex-row flex-col gap-y-1 items-center justify-center gap-x-2 md:border-r-2">
            <Award className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
            <span className="font-medium leading-tight sm:mt-0 mt-3">Certified  <br className="sm:block hidden"></br> Quality</span>
          </div>
          <div className="flex sm:flex-row flex-col gap-y-1 items-center justify-center gap-x-2 sm:border-r-2">
            <HeartHandshake className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
            <span className="font-medium leading-tight sm:mt-0 mt-3">Customer <br className="sm:block hidden"></br> Satisfaction</span>
          </div>
          <div className="flex sm:flex-row flex-col gap-y-1 items-center justify-center gap-x-2 ">
            <BadgePoundSterling className="w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)]" />
            <span className="font-medium leading-tight sm:mt-0 mt-3">Reasonable <br className="sm:block hidden"></br> Price</span>
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
