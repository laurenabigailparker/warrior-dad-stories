import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

function NewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

 const [formData, setFormData] = useState({
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  featured_image: "",
  content: "",
});

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    if (!id) return;

    const loadPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        showMessage("error", "Could not load post.");
        return;
      }

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        featured_image: data.featured_image || "",
        content: data.content || "",
        category: data.category || "All",
      });
    };

    loadPost();
  }, [id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const cleanFileName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filePath = `${Date.now()}-${cleanFileName}`;

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

    setFormData({
      ...formData,
      featured_image: data.publicUrl,
    });

    showMessage("success", "Image uploaded successfully.");
  };

  const handleSubmit = async (published) => {
 const payload = {
  title: formData.title,
  slug: formData.slug,
  category: formData.category,
  excerpt: formData.excerpt,
  featured_image: formData.featured_image,
  content: formData.content,
  published,
};

    const { error } = isEditing
      ? await supabase.from("blog_posts").update(payload).eq("id", id)
      : await supabase.from("blog_posts").insert([payload]);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to save post.");
      return;
    }

    showMessage(
      "success",
      isEditing ? "Post updated successfully." : published ? "Post published successfully." : "Draft saved successfully."
    );

    setTimeout(() => {
      navigate("/admin/blog");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/admin/blog" className="text-slate-400 uppercase text-xs">
          ← Back to Blog Management
        </Link>

        <h1 className="mt-6 text-4xl font-black uppercase">
          {isEditing ? "Edit Blog Post" : "New Blog Post"}
        </h1>

        <div className="mt-8">
          <StatusMessage message={message} type={messageType} />
        </div>

        <div className="mt-10 space-y-6">
          <input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full bg-[#202632] p-4"
          />

       <input
  placeholder="Slug"
  value={formData.slug}
  onChange={(e) =>
    setFormData({
      ...formData,
      slug: e.target.value,
    })
  }
  className="w-full bg-[#202632] p-4"
/>

<div>
  <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
    Category
  </label>

  <select
    value={formData.category}
    onChange={(e) =>
      setFormData({
        ...formData,
        category: e.target.value,
      })
    }
    className="w-full bg-[#202632] p-4 outline-none border border-white/5 focus:border-[#c8a96a]"
  >
    <option value="All">All</option>
    <option value="Leadership">Leadership</option>
    <option value="Fatherhood">Fatherhood</option>
    <option value="Service">Service</option>
    <option value="The Forge">The Forge</option>
    <option value="Reflections">Reflections</option>
  </select>
</div>



          <textarea
            placeholder="Excerpt"
            rows="3"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({
                ...formData,
                excerpt: e.target.value,
              })
            }
            className="w-full bg-[#202632] p-4"
          />

          <div className="bg-[#202632] p-5">
            <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
              Featured Image
            </label>

            <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-white/10 bg-[#101118] text-center hover:border-[#c8a96a] transition">
              <span className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px] font-bold">
                Upload Blog Image
              </span>

              <span className="mt-3 text-slate-500 italic font-serif text-sm">
                Drag or choose file
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <input
              placeholder="Featured Image URL"
              value={formData.featured_image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featured_image: e.target.value,
                })
              }
              className="mt-5 w-full bg-[#101118] p-4"
            />

            {formData.featured_image && (
              <img
                src={formData.featured_image}
                alt="Featured preview"
                className="mt-5 h-56 w-full object-cover rounded border border-white/10"
              />
            )}
          </div>

          <textarea
            placeholder="Full Blog Content"
            rows="12"
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
            className="w-full bg-[#202632] p-4"
          />

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

export default NewPost;