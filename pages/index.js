import Head from "next/head";
import FeaturedPost from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>KJ's Blog</title>
        <meta name="description" content="Software Developer" />
      </Head>
      <Hero />
      <FeaturedPost posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
