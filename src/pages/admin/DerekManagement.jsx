import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

const fields = [
  ["hero", "eyebrow", "Hero Eyebrow", "text"],
  ["hero", "headline", "Hero Headline", "long"],
  ["hero", "body", "Hero Body", "long"],
  ["hero", "image", "Hero Image", "image"],

  ["mission", "eyebrow", "Mission Eyebrow", "text"],
  ["mission", "headline", "Mission Headline", "long"],
  ["mission", "body", "Mission Body", "long"],
  ["mission", "image", "Mission Image", "image"],

  ["new_season", "eyebrow", "New Season Eyebrow", "text"],
  ["new_season", "title", "New Season Title", "long"],
  ["new_season", "body", "New Season Body", "long"],
  ["new_season", "body_2", "New Season Supporting Body", "long"],
  ["new_season", "image", "New Season Image", "image"],

  ["why", "eyebrow", "Why Eyebrow", "text"],
  ["why", "title", "Why Warrior Dad Stories Title", "long"],
  ["why", "body", "Why Warrior Dad Stories Body", "long"],
  ["why", "callout_body", "Why Callout Body", "long"],

  ["legacy", "eyebrow", "Legacy Eyebrow", "text"],
  ["legacy", "title", "Legacy Title", "long"],
  ["legacy", "body", "Legacy Body", "long"],
  ["legacy", "image", "Legacy Background Image", "image"],

  ["live_fully", "eyebrow", "Live Fully Eyebrow", "text"],
  ["live_fully", "title", "Live Fully Title", "long"],
  ["live_fully", "body", "Live Fully Body", "long"],
  ["live_fully", "image", "Live Fully Image", "image"],
];

function DerekManagement() {
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
        .eq("page", "derek");

      if (error) {
        console.error(error);
        showMessage("error", "Failed to load Derek content.");
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
    const fileName = `derek/${key}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      showMessage("error", "Image upload failed.");
      setUploadingKey("");
      return;
    }

    const { data } = supabase.storage
      .from("site-images")
      .getPublicUrl(fileName);

    setContent((prev) => ({
      ...prev,
      [key]: data.publicUrl,
    }));

    setUploadingKey("");
    showMessage("success", "Image uploaded. Click save to publish.");
  };

  const handleSave = async () => {
    const rows = fields.map(([section, field]) => ({
      page: "derek",
      section,
      field,
      value: content[`${section}_${field}`] || "",
    }));

    const { error } = await supabase.from("site_content").upsert(rows, {
      onConflict: "page,section,field",
    });

    if (error) {
      console.error(error);
      showMessage("error", "Failed to save Derek content.");
      return;
    }

    showMessage("success", "Derek content updated.");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Derek Page" back="/admin/dashboard" />

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="mb-10">
            <h2 className="uppercase text-3xl font-black tracking-widest">
              Edit Derek Page
            </h2>
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
                          className="mb-4 h-40 w-full object-cover rounded border border-white/10"
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
            Save Derek Content
          </button>
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
      <h1 className="uppercase tracking-[0.25em] font-black text-center">{title}</h1>
      <div />
    </header>
  );
}

export default DerekManagement;