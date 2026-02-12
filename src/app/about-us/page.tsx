import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import PageBannerImg from "../../../public/media/bg/image.webp";
import AboutImg1 from "../../../public/media/about-us/about-us-page-1.jpeg";
import AboutImg2 from "../../../public/media/about-us/about-us-page-2.jpeg";
import AboutImg3 from "../../../public/media/about-us/about-us-page-3.jpeg";
import AboutImg4 from "../../../public/media/about-us/about-us-page-4.jpeg";
import ContactForm from "@/components/homepage/ContactForm";
export default function AboutUsPage() {
  return (
    <>
      <PageBanner
        pageName="About Us"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "About Us",
            pageUrl: "/about-us/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <div className="container pt-16 ">
        <div className="flex lg:flex-nowrap flex-wrap gap-8">
          <div className=" lg:w-1/2 w-full">
            <div className="flex gap-4 mb-4">
              <div className="relative lg:h-64 h-48 w-8/12">
                <Image
                  src={AboutImg1}
                  alt="About Us"
                  fill
                  className="w-full rounded-lg h-full object-cover"
                />
              </div>
              <div className="relative lg:h-64 h-48 w-4/12">
                <Image
                  src={AboutImg2}
                  alt="About Us"
                  fill
                  className="w-full rounded-lg h-full object-cover"
                />
              </div>
            </div>
            <div className="flex gap-4">
                <div className="relative lg:h-64 h-48 w-7/12">
                <Image
                  src={AboutImg3}
                  alt="About Us"
                  fill
                  className="w-full rounded-lg h-full object-cover"
                />
              </div>
              <div className="relative lg:h-64 h-48 w-5/12">
                <Image
                  src={AboutImg4}
                  alt="About Us"
                  fill
                  className="w-full rounded-lg h-full object-cover"
                />
              </div>
              
            </div>
          </div>
          <div className=" lg:w-1/2 w-full">
            <h2 className="heading text-3xl font-semibold pb-2 mb-4 border-b border-gray-300">About Us</h2>
            <p className="pb-2 text-gray-700">
              Welcome to Stonecera! A name that has become synonymous with
              quality, trust, and timeless stone solutions. Stonecera is a
              respected supplier in the UK, just like other natural and
              engineered stone businesses. We pride ourselves on creating a
              strong reputation for comfort and consistency in the quality of
              products for clients, whether they were for domestic or commercial
              use.
            </p>
            <p className="pb-2 text-gray-700">
              We started with the vision of connecting our customers with the
              finest natural materials sourced from the best quarries and
              manufacturers. Our collection is filled with natural sandstone,
              limestone, granite, or precision-made porcelain and quartz. We
              have represented craftsmanship, durability, and style.
            </p>
            <p className="pb-2 text-gray-700">
              All products sold through this website are delivered to you “as
              is” and “as available”. While we use our best efforts to make sure
              the information about products and their performance that our
              website offers is correct, we make no warranties, express or
              implied, concerning the appropriate of any information,
              completeness of the content, or fitness for a particular purpose
              or products.
            </p>
            <p className="pb-2 text-gray-700">
              At Stonecera, we're aware that selecting the ideal stone is not
              just about appearance, it's about performance, durability and
              ultimately value. That's why our teams go the extra mile to
              provide suitable recommendations to provide our customers with
              valuable insight that meets their design and functional goals.
            </p>
          </div>
        </div>
      </div>
      <ContactForm page="about-us"/>
    </>
  );
}
