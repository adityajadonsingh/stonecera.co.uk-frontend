import PageBanner from "@/components/PageBanner";
import { getPolicy } from "@/lib/api/policy";
import PageBannerImg from "../../../public/media/bg/image.png";
export default async function TermsAndConditionsPage() {
  const data = await getPolicy("Terms_of_use");
  if (!data) return null;
  return (
    <>
      <PageBanner
        pageName="Terms And Conditions"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Terms And Conditions",
            pageUrl: "/terms-and-conditions/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <div className="container py-16">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.pageDescription }}
        />
      </div>
    </>
  );
}
