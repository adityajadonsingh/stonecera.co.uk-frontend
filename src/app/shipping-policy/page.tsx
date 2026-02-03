import PageBanner from "@/components/PageBanner";
import { getPolicy } from "@/lib/api/policy";
import PageBannerImg from "../../../public/media/bg/image.png";
export default async function ShippingPolicyPage() {
  const data = await getPolicy("Shipping_Policy");
  if (!data) return null;
  return (
    <>
      <PageBanner
        pageName="Shipping Policy"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Shipping Policy",
            pageUrl: "/shipping-policy/",
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
