import PageBanner from "@/components/PageBanner";
import PageBannerImg from "../../../public/media/bg/image.png";
import ContactForm from "@/components/homepage/ContactForm";

export default function ContactUsPage() {
    return <>
    <PageBanner
        pageName="Contact Us"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Contact Us",
            pageUrl: "/contact-us/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <ContactForm page="contact-us"/>
    </>;
}