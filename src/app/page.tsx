import BlogSummary from "@/modules/blog/components/BlogSummary";
import { ReactQueryProvider } from "@/modules/core/providers/ReactQueryProvider";

const Home = () => {

  return (
    <>
      <ReactQueryProvider>
        <BlogSummary />
      </ReactQueryProvider>
    </>
  );
}

export default Home;