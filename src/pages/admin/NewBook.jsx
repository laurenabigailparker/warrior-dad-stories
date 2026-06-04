import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

function NewBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    cover_image: "",
    amazon_url: "",
    release_date: "",
    status: "In Progress",
    featured: false,
  });

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    if (!id) return;

    const loadBook = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        subtitle: data.subtitle || "",
        description: data.description || "",
        cover_image: data.cover_image || "",
        amazon_url: data.amazon_url || "",
        release_date: data.release_date || "",
        status: data.status || "In Progress",
        featured: data.featured || false,
      });
    };

    loadBook();
  }, [id]);

  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      slug: formData.slug,
      subtitle: formData.subtitle,
      description: formData.description,
      cover_image: formData.cover_image,
      amazon_url: formData.amazon_url,
      release_date: formData.release_date || null,
      status: formData.status,
      featured: formData.featured,
    };

    const { error } = isEditing
      ? await supabase.from("books").update(payload).eq("id", id)
      : await supabase.from("books").insert([payload]);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to save book.");
      return;
    }

    showMessage(
      "success",
      isEditing ? "Book updated successfully." : "Book created successfully."
    );

    setTimeout(() => {
      navigate("/admin/books");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/admin/books" className="text-slate-400 uppercase text-xs">
          ← Back to Books Management
        </Link>

        <h1 className="mt-6 text-4xl font-black uppercase">
          {isEditing ? "Edit Book" : "New Book"}
        </h1>

        <div className="mt-8">
          <StatusMessage message={message} type={messageType} />
        </div>

        <div className="mt-10 space-y-6">
          <input
            placeholder="Book Title"
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

          <input
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <input
            placeholder="Cover Image URL"
            value={formData.cover_image}
            onChange={(e) =>
              setFormData({ ...formData, cover_image: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <input
            placeholder="Amazon URL"
            value={formData.amazon_url}
            onChange={(e) =>
              setFormData({ ...formData, amazon_url: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <input
            type="date"
            value={formData.release_date}
            onChange={(e) =>
              setFormData({ ...formData, release_date: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full bg-[#202632] p-4"
          >
            <option>Published</option>
            <option>Coming Soon</option>
            <option>In Progress</option>
          </select>

          <label className="flex items-center gap-3">
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
            Featured Book
          </label>

          <textarea
            rows="8"
            placeholder="Book Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full bg-[#202632] p-4"
          />

          <button
            onClick={handleSubmit}
            className="bg-[#c8a96a] text-black px-8 py-4 font-bold uppercase"
          >
            {isEditing ? "Update Book" : "Create Book"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default NewBook;