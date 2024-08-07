import BlogArticle from "@/modules/blog/components/BlogArticle"

const Article = ({params}:
    { params: { slug: string }} ) => {

    return (
        <>
            <BlogArticle contentUrlSlug={params.slug} />
        </>
    )
} 

export default Article;