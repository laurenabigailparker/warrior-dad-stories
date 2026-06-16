import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function GuidingPrinciples({ compact = false }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const loadPrinciples = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "about");

      if (error) {
        console.error(error);
        return;
      }

      const mapped = {};

      data.forEach((item) => {
        mapped[`${item.section}_${item.field}`] = item.value;
      });

      setContent(mapped);
    };

    loadPrinciples();
  }, []);

  const principles = [
    [
      content.principles_2_title || "Discipline",
      content.principles_2_body || "Discipline, thought, word, and deed.",
    ],
    [
      content.principles_3_title || "Be Fit",
      content.principles_3_body || "Be fit — mind, body, and spirit.",
    ],
    [
      content.principles_4_title || "Live Fully",
      content.principles_4_body || "Live life to its fullest.",
    ],
  ];

  return (
    <section className="bg-[#1a1f27] px-8 md:px-20 py-24">
      <div className="max-w-6xl mx-auto">
        {!compact && (
          <div className="text-center mb-16">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              {content.principles_eyebrow || "Guiding Principles"}
            </p>

            <h2 className="mt-6 uppercase text-4xl md:text-5xl font-black">
              {content.principles_heading || "Lived. Not Lectured."}
            </h2>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map(([title, text]) => (
            <div key={title} className="border-l border-[#c8a96a] pl-5">
              <h3 className="uppercase text-xl font-black">{title}</h3>
              <p className="mt-4 text-slate-400 italic font-serif leading-7">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GuidingPrinciples;