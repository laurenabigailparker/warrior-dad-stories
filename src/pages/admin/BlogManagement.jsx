import { Link } from "react-router-dom";

function BlogManagement() {
  const posts = [
    {
      title: "What The Uniform Taught Me About Fatherhood",
      excerpt: "There’s a kind of discipline that comes from the field...",
      category: "Fatherhood",
      date: "May 2026",
      status: "Published",
    },
    {
      title: "The Ode I Almost Didn't Write",
      excerpt: "Some stories demand to be told...",
      category: "Stories",
      date: "Apr 2026",
      status: "Published",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Blog Management" back="/admin/dashboard" />

        <section className="p-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
            <div className="flex gap-3">
              <input
                placeholder="Search posts..."
                className="w-96 max-w-full bg-[#202632] px-5 py-4 border border-white/5 outline-none"
              />
              <div className="w-32 bg-[#202632] border border-white/5" />
            </div>

            <Link
              to="/admin/blog/new"
              className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
            >
              + New Post
            </Link>
          </div>

          <div className="grid grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_0.5fr] text-slate-400 uppercase tracking-[0.25em] text-[10px] px-5 py-4">
            <span>Title</span>
            <span>Category</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="bg-[#202632] rounded-lg overflow-hidden">
            {posts.map((post) => (
              <div
                key={post.title}
                className="grid grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_0.5fr] gap-4 px-5 py-7 border-b border-white/5 last:border-b-0"
              >
                <div>
                  <h3 className="uppercase font-black">{post.title}</h3>
                  <p className="mt-3 text-slate-500 italic font-serif text-sm">
                    {post.excerpt}
                  </p>
                </div>

                <span className="bg-[#2b342d] text-slate-400 px-3 py-2 text-[10px] uppercase h-fit w-fit">
                  {post.category}
                </span>

                <span className="text-slate-400">{post.date}</span>

                <span className="bg-[#2b342d] text-green-600 px-3 py-2 text-[10px] uppercase h-fit w-fit">
                  {post.status}
                </span>

                <div className="flex gap-5 text-slate-400">
                  <button>✎</button>
                  <button>🗑</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminSubTop({ title, back }) {
  return (
    <header className="h-20 bg-[#202632] px-8 grid grid-cols-3 items-center">
      <Link to={back} className="uppercase tracking-[0.2em] text-[11px] text-slate-400">
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