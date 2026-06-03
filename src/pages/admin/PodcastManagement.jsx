import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";
import ConfirmModal from "../../components/admin/ConfirmModal";

function PodcastManagement() {
  const [podcasts, setPodcasts] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    url: "",
    description: "",
    featured: false,
  });

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const loadPodcasts = async () => {
    const { data, error } = await supabase
      .from("podcasts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      showMessage("error", "Failed to load podcasts.");
      return;
    }

    setPodcasts(data || []);
  };

  useEffect(() => {
    const loadInitialPodcasts = async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setMessageType("error");
        setMessage("Failed to load podcasts.");
        return;
      }

      setPodcasts(data || []);
    };

    loadInitialPodcasts();
  }, []);

  const handleAddPodcast = async () => {
    const { error } = await supabase.from("podcasts").insert([
      {
        title: formData.title,
        platform: formData.platform,
        url: formData.url,
        description: formData.description,
        featured: formData.featured,
      },
    ]);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to add podcast.");
      return;
    }

    setFormData({
      title: "",
      platform: "",
      url: "",
      description: "",
      featured: false,
    });

    showMessage("success", "Podcast added.");
    loadPodcasts();
  };

  const toggleFeatured = async (item) => {
    const { error } = await supabase
      .from("podcasts")
      .update({ featured: !item.featured })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to update podcast.");
      return;
    }

    setPodcasts(
      podcasts.map((podcast) =>
        podcast.id === item.id
          ? { ...podcast, featured: !podcast.featured }
          : podcast
      )
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from("podcasts")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to delete podcast.");
      return;
    }

    setPodcasts(podcasts.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    showMessage("success", "Podcast deleted.");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Podcast Management" back="/admin/dashboard" />

        <section className="p-8 grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <StatusMessage message={message} type={messageType} />

            <div className="mt-6 mb-8">
              <h2 className="uppercase text-2xl font-black tracking-widest">
                Podcast Appearances
              </h2>

              <p className="mt-3 text-slate-500 italic font-serif">
                Manage podcast interviews, guest appearances, YouTube episodes,
                and media conversations.
              </p>
            </div>

            <div className="space-y-5">
              {podcasts.length === 0 ? (
                <p className="bg-[#202632] p-8 text-slate-500 italic font-serif rounded-lg">
                  No podcast links yet.
                </p>
              ) : (
                podcasts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#202632] rounded-lg p-6 border border-white/5 flex flex-col md:flex-row md:items-center gap-6"
                  >
                    <div className="flex-1">
                      <h3 className="uppercase font-black text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
                        {item.platform || "Podcast"}
                      </p>

                      <p className="mt-3 text-slate-500 italic font-serif leading-7">
                        {item.description || "No description added."}
                      </p>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 text-slate-400 text-sm break-all hover:text-[#c8a96a]"
                      >
                        {item.url}
                      </a>

                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                        {item.featured ? "Featured" : "Standard"}
                      </p>
                    </div>

                    <div className="flex gap-5 text-slate-400">
                      <button onClick={() => toggleFeatured(item)}>
                        {item.featured ? "Unfeature" : "Feature"}
                      </button>

                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside>
            <Panel title="Add Podcast Link">
              <Field
                label="Title"
                placeholder="Leadership Through Storytelling"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <Field
                label="Platform"
                placeholder="Spotify / YouTube / Apple Podcasts"
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
              />

              <Field
                label="URL"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />

              <div>
                <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                  Description
                </label>

                <textarea
                  placeholder="Short description of the episode or appearance..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-32 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
                />
              </div>

              <label className="mt-5 flex items-center gap-3 text-slate-400">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: e.target.checked,
                    })
                  }
                />
                Featured/Public Highlight
              </label>

              <button
                onClick={handleAddPodcast}
                className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
              >
                Add Podcast
              </button>
            </Panel>
          </aside>
        </section>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete Podcast?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmText="Delete Podcast"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </main>
  );
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
      />
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-[#202632] rounded-lg p-7">
      <h3 className="uppercase tracking-[0.25em] text-[11px] text-[#c8a96a] mb-6">
        {title}
      </h3>

      {children}
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

export default PodcastManagement;