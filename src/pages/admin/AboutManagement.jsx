import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

const fields = [
  ["hero", "eyebrow", "Hero Eyebrow"],
  ["hero", "headline", "Hero Headline"],
  ["hero", "body", "Hero Body"],

  ["story", "headline", "Story Headline"],
  ["story", "body", "Story Body"],

  ["mission", "headline", "Mission Headline"],
  ["mission", "body", "Mission Body"],

  ["values", "headline", "Values Headline"],
  ["values", "body", "Values Body"],
  ["values", "value_1", "Value 1"],
  ["values", "value_2", "Value 2"],
  ["values", "value_3", "Value 3"],
  ["values", "value_4", "Value 4"],
];

function AboutManagement() {
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
        .eq("page", "about");

      if (error) {
        console.error(error);
        showMessage("error", "Failed to load about content.");
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
      page: "about",
      section,
      field,
      value: content[`${section}_${field}`] || "",
    }));

    const { error } = await supabase
      .from("site_content")
      .upsert(rows, {
        onConflict: "page,section,field",
      });

    if (error) {
      console.error(error);
      showMessage("error", "Failed to save about content.");
      return;
    }

    showMessage("success", "about content updated.");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Creative about" back="/admin/dashboard" />

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="mb-10">
            <h2 className="uppercase text-3xl font-black tracking-widest">
              Edit about Page
            </h2>

            <p className="mt-4 text-slate-500 italic font-serif max-w-3xl">
              Update the main Creative about messaging without touching code.
              These fields control the hero and intro sections on the public
              about page.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {fields.map(([section, field, label]) => {
              const key = `${section}_${field}`;
              const isLong =
                field === "body" ||
                field === "subtext" ||
                field === "headline";

              return (
                <div
                  key={key}
                  className={isLong ? "lg:col-span-2" : ""}
                >
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
            Save about Content
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

export default AboutManagement;