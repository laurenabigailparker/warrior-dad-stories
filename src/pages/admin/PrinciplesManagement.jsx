import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

const fields = [
  ["main", "eyebrow", "Section Eyebrow"],
  ["main", "heading", "Section Heading"],

  ["main", "1_title", "Principle 1 Title"],
  ["main", "1_body", "Principle 1 Body"],

  ["main", "2_title", "Principle 2 Title"],
  ["main", "2_body", "Principle 2 Body"],

  ["main", "3_title", "Principle 3 Title"],
  ["main", "3_body", "Principle 3 Body"],

  ["main", "4_title", "Principle 4 Title"],
  ["main", "4_body", "Principle 4 Body"],
];

function PrinciplesManagement() {
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
        .eq("page", "principles");

      if (error) {
        console.error(error);
        showMessage("error", "Failed to load principles.");
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
      page: "principles",
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
      showMessage("error", "Failed to save principles.");
      return;
    }

    showMessage("success", "Principles updated.");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop
          title="Four Life Principles"
          back="/admin/dashboard"
        />

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="mb-10">
            <h2 className="uppercase text-3xl font-black tracking-widest">
              Global Principles
            </h2>

            <p className="mt-4 text-slate-500 italic font-serif max-w-3xl">
              These principles appear throughout the website. Updating them
              here updates every page automatically.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {fields.map(([section, field, label]) => {
              const key = `${section}_${field}`;

              const isLong =
                field.includes("body") ||
                field === "heading";

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
                      className="w-full h-32 bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
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
            Save Principles
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

export default PrinciplesManagement;