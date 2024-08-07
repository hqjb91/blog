'use client';

import Masonry from '@mui/lab/Masonry';
import { useTransition, animated } from "react-spring";
import BlogCard from '../BlogCard';
import { useBlogSummary } from '../../hooks/UseBlogSummary';
import DelayedChild from '@/modules/core/components/DelayedChild';

const BlogSummary = () => {

  const { blogContent, footerRef, ableToFetchNext } = useBlogSummary();

  const listTransitions = useTransition(blogContent, 
    {
      key: (item: any) => item.id,
      from: () => { return { transform: 'translate3d(-100%,0,0)', opacity: 0 }},
      leave: () => { return { transform: 'translate3d(-100%,0,0)', opacity: 0 }},
      enter: () => { return { transform: 'translate3d(0,0,0)', opacity: 1 }}
    });


  return (
    <main>
      <DelayedChild>
        <Masonry columns={{ sm: 1, md: 4 }} spacing={2}>
          {listTransitions((styles, item) => (
            <animated.div style={styles}>
              <BlogCard key={item.id} title={item.title} subtitle={item.subtitle} content={item.content} link={item.link} />
            </animated.div>
          ))}
        </Masonry>
      </DelayedChild>
      {(blogContent.length > 0) && ableToFetchNext && <footer className="p-10 font-bold animate-pulse" ref={footerRef}>Loading....</footer>}
    </main>
  )
}

export default BlogSummary;