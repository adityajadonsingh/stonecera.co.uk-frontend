import PageBanner from "@/components/PageBanner";
import { getPolicy } from "@/lib/api/policy";
import PageBannerImg from "../../../public/media/bg/image.webp";
export default async function PrivacyPolicyPage() {
  const data = await getPolicy("Privacy_Policy");
  if (!data) return null;
  return (
    <>
      <PageBanner
        pageName="Privacy Policy"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Privacy Policy",
            pageUrl: "/privacy-policy/",
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
