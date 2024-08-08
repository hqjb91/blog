import { useCallback, useEffect, useRef, useState } from "react";
import { useBlogSummaryService } from "../services/BlogSummaryService";
import { BlogSummaryResult } from "../entities";

export const useBlogSummary = () => {
    const [ blogContent, setBlogContent ] = useState<any>([]);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ ableToFetchNext, setAbleToFetchNext ] = useState(true);

    const observer = useRef<IntersectionObserver>();

    const footerRef = useCallback((node: HTMLElement) => {
    observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              setPageNumber(prev => prev+1);
          }
        }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    });

    if (node) observer.current?.observe(node as HTMLElement);
    }, []);
  
    const { data, isLoading, isError } = useBlogSummaryService({
        queryConfig: {
            staleTime: 3 * 60 * 1000
        },
        pageNumber
      });

    useEffect(() => {
      if (data) {
        const resultsMappedToBlogContent = data.map( (result: any) => {
          return {
            id: result.id,
            title: result.title,
            subtitle: result.subtitle,
            content: result.content,
            link: 'article/' + result.link 
          }
        });

        setBlogContent((previous: BlogSummaryResult[]) => [...previous, ...resultsMappedToBlogContent]);

        const reachedLastItem = data.some(article => article.isLastItem === true);
        if (data.length < 10 || reachedLastItem) setAbleToFetchNext(false);
      } 
    }, [data]);

    return {
        blogContent,
        footerRef,
        ableToFetchNext
    }
}