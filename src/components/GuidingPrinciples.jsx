import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function GuidingPrinciples({ compact = false }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const loadPrinciples = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "principles");

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
      content.main_1_title || "Smile And The World Smiles With You",
      content.main_1_body || "Lead with positivity, connection, and humanity.",
    ],
    [
      content.main_2_title || "Discipline, Thought, Word, And Deed",
      content.main_2_body || "Live intentionally and lead with consistency.",
    ],
    [
      content.main_3_title || "Be Fit — Mind, Body, And Spirit",
      content.main_3_body || "Growth requires harmony across every part of life.",
    ],
    [
      content.main_4_title || "Live Life To Its Fullest",
      content.main_4_body ||
        "Pursue purpose, service, adventure, and meaningful relationships.",
    ],
  ];

  return (
    <section className="bg-[#1a1f27] px-8 md:px-20 py-24">
      <div className="max-w-6xl mx-auto">
        {!compact && (
          <div className="text-center mb-16">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              {content.main_eyebrow || "Guiding Principles"}
            </p>

            <h2 className="mt-6 uppercase text-4xl md:text-5xl font-black">
              {content.main_heading || "Lived. Not Lectured."}
            </h2>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
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