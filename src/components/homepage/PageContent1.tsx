import Image from "next/image";
import BgImage from "../../../public/media/bg/home-bg.png";
import HappyIcon from "../../../public/media/icons/happy-face.png";
import TrustedIcon from "../../../public/media/icons/cooperation.png";
import Img1 from "../../../public/media/img-1.jpg";
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
        <div className="grid grid-cols-2 gap-5 items-center">
          <div className="h-fit">
            <h2 className="text-5xl pb-4 mb-4 border-b-2 font-bold">We Provide Reliable Flooring Services</h2>
            <p className="text-lg">Our vision is to provide innovative, independent flooring solutions that problems for homes, industries, and workspaces, as well as flooring we would like in our own residences, work spaces.</p>
            <div className="flex justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-[70px] h-[70px] rounded-full bg-skin flex items-center justify-center">
                  <Image src={HappyIcon} alt="Happy Clients" width={50} height={50} />
                </div>
                <div className="text">
                  <span className="block">Happy Customers</span>
                  <span className="block text-3xl font-bold">2.5M+</span>
                </div>
              </div>
              <div className=" w-[2px] bg-white"></div>
              <div className="flex items-center gap-3">
                <div className="w-[70px] h-[70px] rounded-full bg-skin flex items-center justify-center">
                  <Image src={TrustedIcon} alt="Trusted Partner" width={50} height={50} />
                </div>
                <div className="text">
                  <span className="block">Trusted Partner</span>
                  <span className="block text-3xl font-bold">300+</span>
                </div>
              </div>
            </div>
          </div>
          <div className="images mx-auto ">
            <Image className="rounded-md" src={Img1} width={500} height={500} alt=""/>
          </div>
        </div>
      </div>
    </section>
  );
}
