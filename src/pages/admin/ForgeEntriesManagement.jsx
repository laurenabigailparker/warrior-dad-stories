import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";
import ConfirmModal from "../../components/admin/ConfirmModal";

function ForgeEntriesManagement() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("forge_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        showMessage("error", "Failed to load Creative Forge Entries.");
        return;
      }

      setPosts(data || []);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      post.title?.toLowerCase().includes(searchValue) ||
      post.slug?.toLowerCase().includes(searchValue) ||
      post.excerpt?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "published"
        ? post.published
        : !post.published;

    return matchesSearch && matchesStatus;
  });

  const publishedPosts = posts.filter((post) => post.published).length;
  const draftPosts = posts.filter((post) => !post.published).length;

 const handleDelete = async () => {
  if (!deleteTarget) return;

  const { error } = await supabase
    .from("forge_entries")
    .delete()
    .eq("id", deleteTarget.id);

  if (error) {
    console.error(error);
    showMessage("error", "Failed to delete entry.");
    return;
  }

  setPosts(posts.filter((post) => post.id !== deleteTarget.id));
  setDeleteTarget(null);
  showMessage("success", "Creative Forge entry deleted.");
};

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Creative Forge Entries" back="/admin/dashboard" />

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="grid md:grid-cols-3 gap-6 mt-6 mb-10">
            <Stat label="Total Entries" value={posts.length} />
            <Stat label="Published" value={publishedPosts} />
            <Stat label="Drafts" value={draftPosts} />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-96 max-w-full bg-[#202632] px-5 py-4 border border-white/5 outline-none focus:border-[#c8a96a]"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#202632] px-5 py-4 border border-white/5 outline-none focus:border-[#c8a96a]"
              >
                <option value="all">All Entries</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>

            <Link
              to="/admin/forge-entries/new"
              className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold text-center"
            >
              + New Entry
            </Link>
          </div>

          <div className="hidden lg:grid grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_0.5fr] text-slate-400 uppercase tracking-[0.25em] text-[10px] px-5 py-4">
            <span>Title</span>
            <span>Image</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="bg-[#202632] rounded-lg overflow-hidden">
            {filteredPosts.length === 0 ? (
              <p className="p-8 text-slate-500 italic font-serif">
                No Creative Forge Entries found.
              </p>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="grid lg:grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_0.5fr] gap-4 px-5 py-7 border-b border-white/5 last:border-b-0"
                >
                  <div>
                    <h3 className="uppercase font-black">{post.title}</h3>
                    <p className="mt-2 text-slate-600 text-xs">
                      /{post.slug}
                    </p>
                    <p className="mt-3 text-slate-500 italic font-serif text-sm">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="text-slate-400 text-sm">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-20 w-28 object-cover rounded border border-white/10"
                      />
                    ) : (
                      "No image"
                    )}
                  </div>

                  <span className="text-slate-400">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span
                    className={`px-3 py-2 text-[10px] uppercase h-fit w-fit ${
                      post.published
                        ? "bg-[#2b342d] text-green-600"
                        : "bg-[#34302b] text-[#c8a96a]"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>

                  <div className="flex gap-5 text-slate-400">
                    <Link to={`/admin/forge-entries/edit/${post.id}`}>✎</Link>

                    <button onClick={() => setDeleteTarget(post)}>
  🗑
</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

<ConfirmModal
  open={Boolean(deleteTarget)}
  title="Delete Creative Forge Entry?"
 message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
  confirmText="Delete Entry"
  onConfirm={handleDelete}
  onCancel={() => setDeleteTarget(null)}
/>

    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-[#202632] rounded-lg p-7">
      <p className="uppercase tracking-[0.25em] text-[10px] text-slate-500">
        {label}
      </p>
      <h3 className="mt-4 text-4xl text-[#c8a96a] font-black">{value}</h3>
    </div>
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

export default ForgeEntriesManagement;