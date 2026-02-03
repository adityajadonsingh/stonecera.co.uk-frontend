import { redirect } from "next/navigation";
import BlogsPage from "../../page";

export default async function BlogsPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  if (!pageNum || pageNum === 1) {
    redirect("/blogs");
  }

  return <BlogsPage />;
}
