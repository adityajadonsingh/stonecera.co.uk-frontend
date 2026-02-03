import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "@/components/Header";
import { getAllCategories } from "@/lib/api/category";
import { getFooterDetail } from "@/lib/api/footer";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import ScrollRestoration from "./ScrollRestoration";
import ScrollToTop from "./ScrollToTop";
import { ToastProvider } from "@/components/ui/ToastProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home | Stonecera",
  description: "Stonecera UK - Premium Quality Tiles and Stone Solutions",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, footerDetail] = await Promise.all([
    getAllCategories(),
    getFooterDetail(),
  ]);
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ToastProvider>
          <WishlistProvider>
            <ScrollRestoration />
            <ScrollToTop />
            <Header categories={categories} footerDetail={footerDetail} />
            <main>{children}</main>
            <Footer categories={categories} footerDetail={footerDetail} />
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
