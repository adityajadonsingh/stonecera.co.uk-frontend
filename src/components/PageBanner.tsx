import Image from "next/image";
import styles from "@/styles/PageBanner.module.css";
import Breadcrum from "./Breadcrum";
import { BreadcrumType } from "@/lib/types";

export default function PageBanner({pageName, pageDescription, breadcrum, bgImage}: {pageName: string, pageDescription?: string | null, breadcrum: BreadcrumType[], bgImage: string}) {
  return (
    <>
      <section className="page-banner h-[35vh] py-10 relative">
        <Image src={bgImage} alt="Banner" layout="fill" objectFit="cover" className="z-0" priority />
        <div className="h-full flex flex-col text-white justify-center container relative z-10">
            <div className="md:mb-4 mb-2">
                <Breadcrum breadcrum={breadcrum}/>
            </div>
          <h1 className="md:text-4xl text-2xl font-bold mb-2">{pageName}</h1>
          {
            pageDescription && (
              <p className="font-semibold md:text-base text-xs">{pageDescription}</p>
            )
          }
          <div className={styles.line}></div>
        </div>
      </section>
    </>
  );
}
