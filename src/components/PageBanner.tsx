import Image from "next/image";
import styles from "@/styles/PageBanner.module.css";
import Breadcrum from "./Breadcrum";

export default function PageBanner({pageName, pageDescription, pageUrl, bgImage}: {pageName: string, pageDescription?: string | null, pageUrl: string, bgImage: string}) {
  return (
    <>
      <section className="page-banner h-[35vh] pb-10 relative">
        <Image src={bgImage} alt="Banner" layout="fill" objectFit="cover" className="z-0" priority />
        <div className="h-full flex flex-col text-white justify-center container relative z-10">
            <div className="mb-4">
                <Breadcrum breadcrum={[{
                        pageName: "Product Category",
                        pageUrl: "/product-category/"
                },
                    {
                        pageName: pageName,
                        pageUrl: pageUrl
                    }
                ]}/>
            </div>
          <h1 className="text-4xl font-bold mb-2">{pageName}</h1>
          {
            pageDescription && (
              <p className="mt-2  font-semibold">{pageDescription}</p>
            )
          }
          <div className={styles.line}></div>
        </div>
      </section>
    </>
  );
}
