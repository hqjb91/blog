import { MDXRemote } from "next-mdx-remote/rsc"

import styles from './BlogArticle.module.css';

const BlogArticle = async ({contentUrlSlug} : {contentUrlSlug: string}) => {

    // We use fetch instead of React Query here as we are using server component to prefetch on server-side
    const response: Response = await fetch(`https://raw.githubusercontent.com/hqjb91/blog-articles/main/${contentUrlSlug}.md`, { next: { revalidate: 6 * 60 * 60 } });
    const blogContent: string = await response.text();

    return (
    <div className={styles.content}>
        <article className="prose lg:prose-xl">
            <MDXRemote source={blogContent} />
        </article>
    </div>
    );
}

export default BlogArticle;