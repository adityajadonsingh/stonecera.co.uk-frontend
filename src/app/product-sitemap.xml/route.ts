import { getAllProducts } from "@/lib/api/product";
import { Product, ProductVariation } from "@/lib/types";


export async function GET() {
  const baseUrl = "https://stonecera.co.uk";

  const allProducts: {totalProducts: number, products: {variations: ProductVariation[]; selectedVariation: ProductVariation; product: Product}[]} = await getAllProducts({limit: 1000, offset: 0}); // Fetch all products, adjust limit as needed
  console.log(allProducts);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/url-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allProducts.products
  .map(p => {
    const lastModRaw = p.product.updatedAt;
    const lastMod = lastModRaw
      ? new Date(lastModRaw).toISOString()
      : new Date().toISOString();

    return `
  <url>
    <loc>${baseUrl}/product/${p.product.slug}/</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>1.00</priority>
  </url>`;
  })
  .join("")}

</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
