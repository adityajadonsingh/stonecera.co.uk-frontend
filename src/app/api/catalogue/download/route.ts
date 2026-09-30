import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { message: "File URL is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Unable to fetch file" },
        { status: response.status }
      );
    }

    const contentType =
      response.headers.get("content-type") || "application/pdf";

    const arrayBuffer = await response.arrayBuffer();

    const filename =
      url.split("/").pop()?.split("?")[0] || "catalogue.pdf";

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Catalogue download error:", error);

    return NextResponse.json(
      { message: "Failed to download file" },
      { status: 500 }
    );
  }
}