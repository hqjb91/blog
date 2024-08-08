import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { page: string } }
) => {
    const { page } = params;
    const response = await fetch(`https://raw.githubusercontent.com/hqjb91/blog-articles/main/articles-index/articles-index-${page}.json`, { next: { revalidate: 3 * 60 } });
    const data = await response.json();

    return Response.json(data);
}