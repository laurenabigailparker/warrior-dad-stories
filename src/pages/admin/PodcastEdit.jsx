import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function PodcastEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    url: "",
    description: "",
    featured: false,
  });

  useEffect(() => {
    const loadPodcast = async () => {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setMessage("Could not load podcast.");
        return;
      }

      setFormData({
        title: data.title || "",
        platform: data.platform || "",
        url: data.url || "",
        description: data.description || "",
        featured: Boolean(data.featured),
      });
    };

    loadPodcast();
  }, [id]);

  const handleSave = async () => {
    const { error } = await supabase
      .from("podcasts")
      .update({
        title: formData.title,
        platform: formData.platform,
        url: formData.url,
        description: formData.description,
        featured: formData.featured,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("Could not save podcast.");
      return;
    }

    navigate("/admin/podcasts");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-4xl mx-auto bg-[#101118] min-h-[700px] p-8">
        <Link
          to="/admin/podcasts"
          className="uppercase tracking-[0.2em] text-[11px] text-[#c8a96a]"
        >
          ← Back To Podcasts
        </Link>

        <h1 className="mt-8 text-4xl font-black uppercase">Edit Podcast</h1>

        {message && <p className="mt-6 text-red-400">{message}</p>}

        <div className="mt-10 space-y-6">
          <Field
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Field
            label="Platform"
            value={formData.platform}
            onChange={(e) =>
              setFormData({ ...formData, platform: e.target.value })
            }
          />

          <Field
            label="Podcast URL"
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full h-40 bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
            />
          </div>

          <label className="flex items-center gap-3 text-slate-400">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
            Featured/Public Highlight
          </label>

          <button
            onClick={handleSave}
            className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
          >
            Save Podcast
          </button>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        className="w-full bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
      />
    </div>
  );
}

export default PodcastEdit;