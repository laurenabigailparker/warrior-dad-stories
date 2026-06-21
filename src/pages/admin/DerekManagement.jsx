import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

const fields = [
  ["hero", "eyebrow", "Hero Eyebrow"],
  ["hero", "headline", "Hero Headline"],
  ["hero", "body", "Hero Body"],
  ["hero", "image", "Hero Image URL"],

  ["mission", "eyebrow", "Mission Eyebrow"],
  ["mission", "headline", "Mission Headline"],
  ["mission", "body", "Mission Body"],
  ["mission", "image", "Mission Image URL"],

  ["new_season", "eyebrow", "New Season Eyebrow"],
  ["new_season", "title", "New Season Title"],
  ["new_season", "body", "New Season Body"],
  ["new_season", "image", "New Season Image URL"],

  ["why", "eyebrow", "Why Eyebrow"],
  ["why", "title", "Why Warrior Dad Stories Title"],
  ["why", "body", "Why Warrior Dad Stories Body"],

  ["legacy", "eyebrow", "Legacy Eyebrow"],
  ["legacy", "title", "Legacy Title"],
  ["legacy", "body", "Legacy Body"],
  ["legacy", "image", "Legacy Background Image URL"],

  ["live_fully", "eyebrow", "Live Fully Eyebrow"],
  ["live_fully", "title", "Live Fully Title"],
  ["live_fully", "body", "Live Fully Body"],
  ["live_fully", "image", "Live Fully Image URL"],
];

function DerekManagement() {
  const [content, setContent] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

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

            <p className="mt-4 text-slate-500 italic font-serif max-w-3xl">
              Update Derek&apos;s About page content, section wording, and image
              URLs without touching code.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {fields.map(([section, field, label]) => {
              const key = `${section}_${field}`;
              const isLong =
                field === "body" ||
                field === "headline" ||
                field === "title";

              return (
                <div key={key} className={isLong ? "lg:col-span-2" : ""}>
                  <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                    {label}
                  </label>

                  {isLong ? (
                    <textarea
                      value={content[key] || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full h-36 bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
                    />
                  ) : (
                    <input
                      value={content[key] || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          [key]: e.target.value,
                        })
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

export default DerekManagement;