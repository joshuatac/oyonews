import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import TrendingPosts from "@/components/TrendingPosts";
import AdBanner from "@/components/AdBanner";
import PostContent from "@/components/PostContent";
import { fetchPostBySlug, fetchRelatedPosts } from "@/lib/api";

import Skeleton from "@/components/SkeletonPost"; // Optional: create this component for post loading


type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    'wp:featuredmedia'?: { source_url: string }[];
    'wp:term'?: Array<Array<{ name: string }>>;
  };
};

type RelatedPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  image: string;
};

// --- Component ---

export default function SinglePostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState<WPPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || typeof slug !== "string") return;

    const loadPost = async () => {
      setLoading(true);
      try {
        const fetchedPost = await fetchPostBySlug(slug);

        if (!fetchedPost) {
          console.error("Post not found");
          setLoading(false);
          return;
        }

        setPost(fetchedPost);

        const related = await fetchRelatedPosts(fetchedPost);
        setRelatedPosts(related);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const title = post?.title?.rendered || "Loading...";
  const excerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, "").slice(0, 140) ?? "";
  const image =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    "https://oyonews.com.ng/default-og-image.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={image} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        <MainNav />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {loading || !post ? (
                <Skeleton /> // A skeleton component for post loading
              ) : (
                <PostContent post={post} relatedPosts={relatedPosts} />
              )}
            </div>

            <div className="lg:col-span-1">
              <TrendingPosts />
              <div className="mt-8">
                <AdBanner size="sidebar" position="sidebar" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
