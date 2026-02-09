import { getAllCategories } from "@/lib/api/category";

export async function GET() {
  const baseUrl = "https://stonecera.co.uk";
  const allCategories = await getAllCategories();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/url-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allCategories
    .map((category) => {
      const lastModRaw = category.updatedAt;
      const lastMod = lastModRaw
        ? new Date(lastModRaw).toISOString()
        : new Date().toISOString();

      return `
    <url>
      <loc>${baseUrl}/product-category/${category.slug}/</loc>
      <lastmod>${lastMod}</lastmod>
      <priority>1.00</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

