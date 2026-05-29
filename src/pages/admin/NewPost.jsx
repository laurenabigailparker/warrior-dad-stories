import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function NewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    featured_image: "",
    content: "",
  });

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
        alert("Could not load post.");
        return;
      }

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        featured_image: data.featured_image || "",
        content: data.content || "",
      });
    };

    loadPost();
  }, [id]);

  const handleSubmit = async (published) => {
    const payload = {
      title: formData.title,
      slug: formData.slug,
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
      alert("Failed to save post.");
      return;
    }

    alert(isEditing ? "Post updated!" : published ? "Post published!" : "Draft saved!");
    navigate("/admin/blog");
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

          <input
            placeholder="Featured Image URL"
            value={formData.featured_image}
            onChange={(e) =>
              setFormData({
                ...formData,
                featured_image: e.target.value,
              })
            }
            className="w-full bg-[#202632] p-4"
          />

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