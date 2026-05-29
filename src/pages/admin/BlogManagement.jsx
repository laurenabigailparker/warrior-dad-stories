import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function BlogManagement() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setPosts(data || []);
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Blog Management" back="/admin/dashboard" />

        <section className="p-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
            <input
              placeholder="Search posts..."
              className="w-96 max-w-full bg-[#202632] px-5 py-4 border border-white/5 outline-none"
            />

            <Link
              to="/admin/blog/new"
              className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
            >
              + New Post
            </Link>
          </div>

          <div className="grid grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_0.5fr] text-slate-400 uppercase tracking-[0.25em] text-[10px] px-5 py-4">
            <span>Title</span>
            <span>Image</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="bg-[#202632] rounded-lg overflow-hidden">
            {posts.length === 0 ? (
              <p className="p-8 text-slate-500 italic font-serif">
                No blog posts yet.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_0.5fr] gap-4 px-5 py-7 border-b border-white/5 last:border-b-0"
                >
                  <div>
                    <h3 className="uppercase font-black">{post.title}</h3>
                    <p className="mt-3 text-slate-500 italic font-serif text-sm">
                      {post.excerpt}
                    </p>
                  </div>

                  <span className="text-slate-400 text-sm break-all">
                    {post.featured_image || "No image"}
                  </span>

                  <span className="text-slate-400">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span className="bg-[#2b342d] text-green-600 px-3 py-2 text-[10px] uppercase h-fit w-fit">
                    {post.published ? "Published" : "Draft"}
                  </span>

                  <div className="flex gap-5 text-slate-400">
                   <Link to={`/admin/blog/edit/${post.id}`}>✎</Link>
                    <button
  onClick={async () => {
    const confirmed = window.confirm(
      "Delete this post?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", post.id);

    if (error) {
      console.error(error);
      alert("Failed to delete post.");
      return;
    }

    setPosts(posts.filter((p) => p.id !== post.id));
  }}
>
  🗑
</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminSubTop({ title, back }) {
  return (
    <header className="h-20 bg-[#202632] px-8 grid grid-cols-3 items-center">
      <Link
        to={back}
        className="uppercase tracking-[0.2em] text-[11px] text-slate-400"
      >
        ← Back To Dashboard
      </Link>

      <h1 className="uppercase tracking-[0.25em] font-black text-center">
        {title}
      </h1>

      <div />
    </header>
  );
}

export default BlogManagement;