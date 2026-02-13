
import FaqAccordion from "@/components/FaqAccordion";
import { Metadata } from "next";

export interface FaqItem {
  question: string;
  answer: string;
}

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Stonecera",
  description:
    "Find answers to common questions about natural stone products, delivery, installation, and orders at Stonecera.",

  alternates: {
    canonical: "/faqs",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Frequently Asked Questions | Stonecera",
    description:
      "Find answers to common questions about natural stone products, delivery, installation, and orders at Stonecera.",
    url: "https://stonecera.co.uk/faqs",
    siteName: "Stonecera",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Stonecera",
    description:
      "Find answers to common questions about natural stone products, delivery, installation, and orders at Stonecera.",
  },
};


const faqData = [
  {
    question: "Do you offer split packs?",
    answer:
      "At present, we do not offer split packs. Our products are packed in full crates or boxes to ensure safety during transport and maintain product consistency. This also helps prevent colour variation, breakage, and wastage that can occur when handling smaller quantities.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "The minimum order quantity varies depending on the product type. For most paving and stone slab products, the minimum order is typically one full crate, unless stated otherwise on the product page. For accessories or smaller items, please refer to individual product listings for minimum quantities or feel free to contact us directly.",
  },
  {
    question: "What are the delivery charges? ",
    answer:
      "Delivery charges are calculated based on: - The weight and size of your order - The delivery postcode - The delivery method (standard or express) All delivery costs will be clearly mentioned at the time of quotation or checkout. You can also request a delivery estimate by emailing support@stonecera.co.uk with your postcode and product details. ",
  },
  {
    question: "Do you offer deliveries on weekends? ",
    answer:
      "Saturday deliveries may be available in select locations for an additional charge. Please note that weekend deliveries are not standard and must be arranged in advance with our logistics team. We do not deliver on Sundays or bank holidays.",
  },
  {
    question: "How can I contact StoneCera?",
    answer:
      "You can reach us through the following channels: StoneCera - Customer Support Team Email: support@stonecera.co.uk Phone: +44 7467648124 Address: 21 high street, Harrow on the hill, Middlesex, England, HA13HT",
  },
];

export default function FaqsPage() {

  return (
    <div className="container md:py-16 py-8">
      <FaqAccordion items={faqData}/>
    </div>
  );
}
