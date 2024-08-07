import { api } from "@/modules/core/libs/ApiClient";
import { QueryConfig } from "@/modules/core/libs/ReactQuery";
import { queryOptions, useQuery } from "@tanstack/react-query";

type BlogSummaryResult = {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  link: string;
  isLastItem: boolean;
};

const blogSummaryApiClient = api(``);

export const getBlogSummary = (
  pageNumber: number
): Promise<BlogSummaryResult[]> => {
  return blogSummaryApiClient.get(`/api/article/${pageNumber}`);
};

export const getBlogSummaryQueryOptions = (pageNumber: number) => {
  return queryOptions({
    queryKey: ["blogsummary", pageNumber],
    queryFn: () => getBlogSummary(pageNumber),
  });
};

type UseBlogSummaryOptions = {
  queryConfig?: QueryConfig<typeof getBlogSummaryQueryOptions>;
  pageNumber: number;
};

export const useBlogSummaryService = ({
  queryConfig = {},
  pageNumber = 1,
}: UseBlogSummaryOptions) => {
  return useQuery({
    ...getBlogSummaryQueryOptions(pageNumber),
    ...queryConfig,
  });
};
