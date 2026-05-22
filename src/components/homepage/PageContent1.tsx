import Image from "next/image";
import BgImage from "../../../public/media/bg/home-bg.png";
import HappyIcon from "../../../public/media/icons/happy-face.png";
import TrustedIcon from "../../../public/media/icons/cooperation.png";
import Img1 from "../../../public/media/Cloud-Grey-Wall-Clading.webp";
export default function PageContent1() {
  return (
    <section className="relative bg-dark py-20">
       <Image
       src={BgImage}
       alt="Get in touch"
       fill
       className="z-0"
       /> 
      <div className="container z-10 relative">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
          <div className="h-fit">
            <h2 className="lg:text-5xl text-3xl md:text-start text-center pb-4 mb-4 border-b-2 font-bold">Crafting Beautiful Spaces with Strength and Elegance</h2>
            <p className="lg:text-lg text-base md:text-start text-center mb-2">Our product line comprises various high-quality stones and porcelains handpicked based on their strength, durability, and design. From beautiful paving stones to attractive and stylish tiles, our range of products caters to both traditional as well as modern tastes.</p>
            <p className="lg:text-lg text-base md:text-start text-center">The aim of our company is to provide the materials that will look good and be durable during many years of use. Everyone knows how important it is to have high quality materials when doing construction or renovation. That's why we do our best to satisfy this requirement. Get familiar with our assortment of materials and build strong and valuable constructions!</p>
            <div className="flex md:justify-between justify-center gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="lg:w-[70px] w-[70px] lg:h-[70px] h-[70px] rounded-full bg-skin flex items-center justify-center">
                  <Image src={HappyIcon} alt="Happy Clients" width={50} height={50} />
                </div>
                <div className="text">
                  <span className="block">Happy Customers</span>
                  <span className="block text-3xl font-bold">1000+</span>
                </div>
              </div>
              <div className=" w-[2px] bg-white"></div>
              <div className="flex items-center gap-3">
                <div className="w-[70px] h-[70px] rounded-full bg-skin flex items-center justify-center">
                  <Image src={TrustedIcon} alt="Trusted Partner" width={50} height={50} />
                </div>
                <div className="text">
                  <span className="block">Trusted Partner</span>
                  <span className="block text-3xl font-bold">150+</span>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] relative w-full mx-auto hidden md:block">
  <Image
    className="rounded-md object-cover"
    fill
    src={Img1}
    sizes="(max-width: 768px) 90vw, 50vw"
    alt=""
  />
</div>

        </div>
      </div>
    </section>
  );
}
