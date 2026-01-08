import Image from "next/image";
import PageBg from "../../../public/media/bg/home-about-bg.png";

export default function PageContent2() {
  return (
    <>
      <section className="page-content py-16 relative">
        <Image 
            src={PageBg}
            alt="about us"
            fill
            className="object-cover z-0"
        />
        <div className="container z-10">
            <div className="grid grid-cols-2">
                
            </div>
        </div>
      </section>
    </>
  );
}