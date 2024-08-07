import { api } from "@/modules/core/libs/ApiClient";
import { QueryConfig } from "@/modules/core/libs/ReactQuery";
import { queryOptions, useQuery } from "@tanstack/react-query";

const blogSummaryApiClient = api(``);

export const getBlogSummary = async (pageNumber: number) => {
    const data  = await blogSummaryApiClient.get(`/api/article/${pageNumber}`);
    return data;
}

export const getBlogSummaryQueryOptions = (pageNumber: number) => {
    return queryOptions({
       queryKey: ['blogsummary', pageNumber],
       queryFn: () => getBlogSummary(pageNumber)
    });
}

type UseBlogSummaryOptions = {
    queryConfig?: QueryConfig<typeof getBlogSummaryQueryOptions>;
    pageNumber: number;
  };

export const useBlogSummaryService = ({ queryConfig = {}, pageNumber = 1 }: UseBlogSummaryOptions) => {

    return useQuery({
      ...getBlogSummaryQueryOptions(pageNumber),
      ...queryConfig,
    });
  };