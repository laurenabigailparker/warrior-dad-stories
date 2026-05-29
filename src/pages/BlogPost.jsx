import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";

function BlogPost() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#11141b] text-white flex items-center justify-center">
        <h2 className="text-2xl font-black uppercase">
          Loading Story...
        </h2>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#11141b] text-white">
        <Navbar />

        <section className="py-40 px-8 text-center">
          <h1 className="text-5xl font-black uppercase">
            Story Not Found
          </h1>

          <Link
            to="/blog"
            className="inline-block mt-10 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
          >
            Back To Blog
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[550px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={
              post.featured_image ||
              "/warrior-dad-reflections.webp"
            }
            alt={post.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-5xl mx-auto px-8 pb-20 w-full">
          <Link
            to="/blog"
            className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px]"
          >
            ← Back To Blog
          </Link>

          <h1 className="mt-8 uppercase font-black text-5xl md:text-7xl leading-tight">
            {post.title}
          </h1>

          <p className="mt-8 text-slate-300 italic font-serif text-xl max-w-4xl">
            {post.excerpt}
          </p>

          <p className="mt-8 uppercase tracking-[0.2em] text-[10px] text-slate-400">
            TJ Baird •{" "}
            {new Date(post.created_at).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-8 md:px-20 py-24">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert max-w-none">
            <div className="text-slate-300 text-lg leading-10 whitespace-pre-wrap font-serif">
              {post.content}
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#202632] px-8 md:px-20 py-24 text-center">
        <h2 className="uppercase font-black text-4xl">
          Continue The Journey
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-slate-400 italic font-serif text-xl">
          Explore more reflections on service, fatherhood,
          leadership, and legacy.
        </p>

        <Link
          to="/blog"
          className="inline-block mt-10 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-white transition"
        >
          View All Stories
        </Link>
      </section>

      <Footer />
    </main>
  );
}

export default BlogPost;