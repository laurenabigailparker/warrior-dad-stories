import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

const fields = [
  ["featured_book", "eyebrow", "Eyebrow", "text"],
  ["featured_book", "title", "Book Title", "long"],
  ["featured_book", "subtitle", "Subtitle", "text"],
  ["featured_book", "description", "Description", "long"],
  ["featured_book", "cover_image", "Cover Image", "image"],
  ["featured_book", "cover_note", "Cover Note", "text"],
  ["featured_book", "hardcover_price", "Hardcover Price", "text"],
  ["featured_book", "hardcover_label", "Hardcover Label", "text"],
  ["featured_book", "ebook_price", "Ebook Price", "text"],
  ["featured_book", "ebook_label", "Ebook Label", "text"],
  ["featured_book", "kindle_price", "Kindle Price", "text"],
  ["featured_book", "kindle_label", "Kindle Label", "text"],
  ["featured_book", "amazon_url", "Amazon URL", "text"],
  ["featured_book", "companion_guide_url", "Companion Guide URL", "text"],
  ["featured_book", "primary_button_text", "Primary Button Text", "text"],
  ["featured_book", "secondary_button_text", "Secondary Button Text", "text"],
  ["featured_book", "bottom_note", "Bottom Note", "long"],
];

function ShopContentManagement() {
  const [content, setContent] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [uploadingKey, setUploadingKey] = useState("");

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    const loadContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "shop");

      if (error) {
        console.error(error);
        showMessage("error", "Failed to load shop content.");
        return;
      }

      const mapped = {};
      data.forEach((item) => {
        mapped[`${item.section}_${item.field}`] = item.value;
      });

      setContent(mapped);
    };

    loadContent();
  }, []);

  const uploadImage = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);

    const fileExt = file.name.split(".").pop();
    const fileName = `shop/${key}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      showMessage("error", "Image upload failed.");
      setUploadingKey("");
      return;
    }

    const { data } = supabase.storage.from("site-images").getPublicUrl(fileName);

    setContent((prev) => ({
      ...prev,
      [key]: data.publicUrl,
    }));

    setUploadingKey("");
    showMessage("success", "Image uploaded. Click save to publish.");
  };

  const handleSave = async () => {
    const rows = fields.map(([section, field]) => ({
      page: "shop",
      section,
      field,
      value: content[`${section}_${field}`] || "",
    }));

    const { error } = await supabase.from("site_content").upsert(rows, {
      onConflict: "page,section,field",
    });

    if (error) {
      console.error(error);
      showMessage("error", "Failed to save shop content.");
      return;
    }

    showMessage("success", "Shop content updated.");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Shop Book Section" back="/admin/dashboard" />

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="mb-10">
            <h2 className="uppercase text-3xl font-black tracking-widest">
              Edit Shop Book Section
            </h2>

            <p className="mt-4 text-slate-500 italic font-serif max-w-3xl">
              Edit the featured book section shown on the shop page.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {fields.map(([section, field, label, type]) => {
              const key = `${section}_${field}`;
              const isLong = type === "long";

              return (
                <div key={key} className={isLong ? "lg:col-span-2" : ""}>
                  <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                    {label}
                  </label>

                  {type === "image" ? (
                    <div className="bg-[#202632] border border-white/5 p-5">
                      {content[key] && (
                        <img
                          src={content[key]}
                          alt={label}
                          className="mb-4 h-48 w-full object-contain rounded border border-white/10 bg-[#101118]"
                        />
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadImage(e, key)}
                        className="block w-full text-sm text-slate-300"
                      />

                      <input
                        value={content[key] || ""}
                        onChange={(e) =>
                          setContent({ ...content, [key]: e.target.value })
                        }
                        placeholder="Image URL will appear here"
                        className="mt-4 w-full bg-[#101118] border border-white/5 px-4 py-3 outline-none focus:border-[#c8a96a]"
                      />

                      {uploadingKey === key && (
                        <p className="mt-3 text-[#c8a96a] text-xs uppercase tracking-[0.2em]">
                          Uploading...
                        </p>
                      )}
                    </div>
                  ) : isLong ? (
                    <textarea
                      value={content[key] || ""}
                      onChange={(e) =>
                        setContent({ ...content, [key]: e.target.value })
                      }
                      className="w-full h-36 bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
                    />
                  ) : (
                    <input
                      value={content[key] || ""}
                      onChange={(e) =>
                        setContent({ ...content, [key]: e.target.value })
                      }
                      className="w-full bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSave}
            className="mt-10 bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
          >
            Save Shop Content
          </button>
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

export default ShopContentManagement;