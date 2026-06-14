import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

function ForgeEntryEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    entry_type: "poem",
    excerpt: "",
    body: "",
    featured_image: "",
    artwork_image: "",
    background_image: "",
    video_url: "",
    featured: false,
  });

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    if (!id) return;

    const loadEntry = async () => {
      const { data, error } = await supabase
        .from("forge_entries")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        showMessage("error", "Could not load Creative Forge entry.");
        return;
      }

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        entry_type: data.entry_type || "poem",
        excerpt: data.excerpt || "",
        body: data.body || "",
        featured_image: data.featured_image || "",
        artwork_image: data.artwork_image || "",
        background_image: data.background_image || "",
        video_url: data.video_url || "",
        featured: Boolean(data.featured),
      });
    };

    loadEntry();
  }, [id]);

  const uploadImage = async (file, fieldName) => {
    if (!file) return;

    const cleanFileName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filePath = `forge/${Date.now()}-${cleanFileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      showMessage("error", "Image upload failed.");
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: data.publicUrl,
    }));

    showMessage("success", "Image uploaded successfully.");
  };

  const handleSubmit = async (published) => {
    const payload = {
      title: formData.title,
      slug: formData.slug,
      entry_type: formData.entry_type,
      excerpt: formData.excerpt,
      body: formData.body,
      featured_image: formData.featured_image,
      artwork_image: formData.artwork_image,
      background_image: formData.background_image,
      video_url: formData.video_url,
      featured: formData.featured,
      published,
      updated_at: new Date().toISOString(),
    };

    const { error } = isEditing
      ? await supabase.from("forge_entries").update(payload).eq("id", id)
      : await supabase.from("forge_entries").insert([payload]);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to save Creative Forge entry.");
      return;
    }

    showMessage(
      "success",
      isEditing
        ? "Creative Forge entry updated successfully."
        : published
        ? "Creative Forge entry published successfully."
        : "Draft saved successfully."
    );

    setTimeout(() => {
      navigate("/admin/forge-entries");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/admin/forge-entries"
          className="text-slate-400 uppercase text-xs"
        >
          ← Back to Creative Forge Entries
        </Link>

        <h1 className="mt-6 text-4xl font-black uppercase">
          {isEditing ? "Edit Creative Forge Entry" : "New Creative Forge Entry"}
        </h1>

        <div className="mt-8">
          <StatusMessage message={message} type={messageType} />
        </div>

        <div className="mt-10 space-y-6">
          <input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <input
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <select
            value={formData.entry_type}
            onChange={(e) =>
              setFormData({ ...formData, entry_type: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          >
            <option value="poem">Poem</option>
            <option value="haiku">Haiku</option>
            <option value="ode">Ode</option>
            <option value="reflection">Reflection</option>
          </select>

          <textarea
            placeholder="Excerpt"
            rows="3"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <ImageField
            label="Featured Image"
            value={formData.featured_image}
            onTextChange={(value) =>
              setFormData({ ...formData, featured_image: value })
            }
            onFileChange={(file) => uploadImage(file, "featured_image")}
          />

          <ImageField
            label="Artwork Image"
            value={formData.artwork_image}
            onTextChange={(value) =>
              setFormData({ ...formData, artwork_image: value })
            }
            onFileChange={(file) => uploadImage(file, "artwork_image")}
          />

          <ImageField
            label="Background Image"
            value={formData.background_image}
            onTextChange={(value) =>
              setFormData({ ...formData, background_image: value })
            }
            onFileChange={(file) => uploadImage(file, "background_image")}
          />

          <input
            placeholder="Video URL / YouTube URL"
            value={formData.video_url}
            onChange={(e) =>
              setFormData({ ...formData, video_url: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <textarea
            placeholder="Full Creative Forge Entry"
            rows="12"
            value={formData.body}
            onChange={(e) =>
              setFormData({ ...formData, body: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <label className="flex items-center gap-3 text-slate-300">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
            Feature this entry
          </label>

          <div className="flex gap-4">
            <button
              onClick={() => handleSubmit(false)}
              className="bg-slate-700 px-8 py-4"
            >
              Save Draft
            </button>

            <button
              onClick={() => handleSubmit(true)}
              className="bg-[#c8a96a] text-black px-8 py-4"
            >
              {isEditing ? "Update + Publish" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ImageField({ label, value, onTextChange, onFileChange }) {
  return (
    <div className="bg-[#202632] p-5">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-white/10 bg-[#101118] text-center hover:border-[#c8a96a] transition">
        <span className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px] font-bold">
          Upload {label}
        </span>

        <span className="mt-3 text-slate-500 italic font-serif text-sm">
          Drag or choose file
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0])}
          className="hidden"
        />
      </label>

      <input
        placeholder={`${label} URL`}
        value={value}
        onChange={(e) => onTextChange(e.target.value)}
        className="mt-5 w-full bg-[#101118] p-4"
      />

      {value && (
        <img
          src={value}
          alt={`${label} preview`}
          className="mt-5 h-56 w-full object-cover rounded border border-white/10"
        />
      )}
    </div>
  );
}

export default ForgeEntryEditor;