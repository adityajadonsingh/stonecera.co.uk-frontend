import PageBanner from "@/components/PageBanner";
import { getPolicy } from "@/lib/api/policy";
import PageBannerImg from "../../../public/media/bg/image.webp";
export default async function CookiePolicyPage() {
  const data = await getPolicy("Cookie_Policy");
  if (!data) return null;
  return (
    <>
      <PageBanner
        pageName="Cookie Policy"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Cookie Policy",
            pageUrl: "/cookie-policy/",
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
