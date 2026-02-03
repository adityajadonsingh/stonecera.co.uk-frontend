import PageBanner from "@/components/PageBanner";
import { getPolicy } from "@/lib/api/policy";
import PageBannerImg from "../../../public/media/bg/image.png";
export default async function CancellationsAndRefundsPage() {
  const data = await getPolicy("Cancellations_Refunds");
  if (!data) return null;
  return (
    <>
      <PageBanner
        pageName="Cancellations And Refund Policy"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Cancellations And Refund",
            pageUrl: "/cancellations-and-refunds/",
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
