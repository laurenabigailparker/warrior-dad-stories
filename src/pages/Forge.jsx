import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";

function Forge() {
  const [content, setContent] = useState({});

  const haikus = [
    "Steel and silk entwined. Duty's weight and love's soft touch. Both hands hold the same.",
    "Boots beside her bed. Mission complete, mission starts. Home is the hard part.",
    "Words in the margins. Written between shifts and sleep. Stories find their way.",
  ];

  const odes = [
    [
      "Reforged: An Ode To The Journey Through PREP",
      "There is a kind of breaking that rebuilds. This is what I learned in the fire.",
      "Award-Winning · 2025",
    ],
    [
      "An Ode To The Daughter Who Watches",
      "She sees what I carry. She carries what she sees. And still, she chooses to love me.",
      "Featured In Warrior Dad",
    ],
    [
      "An Ode To The Quiet After Deployment",
      "The world does not stop when you come home. But sometimes, you do.",
      "Featured In Warrior Dad",
    ],
  ];

  const moments = [
    ["Morning coffee before the world wakes", "/morning-reflection.webp"],
    ["The walk that clears the mind", "/forest-walk.webp"],
    ["Sunset — proof the day is done", "/sunset-reflection.webp"],
    ["The page where stories live", "/stories-live-here.webp"],
    ["The thoughts that stay after midnight", "/late-night-reflections.webp"],
    ["Focus. Discipline. Legacy.", "/focus-discipline-legacy.webp"],
  ];

  useEffect(() => {
    let ignore = false;

    const loadContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "forge");

      if (error) {
        console.error(error);
        return;
      }

      const mapped = {};

      data.forEach((item) => {
        mapped[`${item.section}_${item.field}`] = item.value;
      });

      if (!ignore) {
        setContent(mapped);
      }
    };

    loadContent();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      <section
        className="relative min-h-[760px] flex items-center justify-center text-center px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,10,14,0.72),
              rgba(8,10,14,0.86)
            ),
            url('/warrior-dad-reflections.webp')
          `,
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

        <div className="max-w-4xl relative z-10">
          <div className="mx-auto mb-8 h-16 w-16 bg-[#c8a96a]" />

          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            {content.hero_eyebrow || "The Creative Forge"}
          </p>

          <h1 className="uppercase font-black text-6xl md:text-8xl leading-[0.95] whitespace-pre-line">
            {content.hero_headline || "Where Stories\nAre Forged"}
          </h1>

          <p className="mt-10 max-w-3xl mx-auto text-slate-300 italic font-serif text-2xl leading-10">
            {content.hero_body ||
              "This is the heart of Warrior Dad Stories. The place where words are forged in reflection, shaped by experience, and given to those who need them most."}
          </p>

          <p className="mt-12 text-slate-400 uppercase tracking-[0.3em] text-[11px]">
            {content.hero_tagline || "Heat. Pressure. Purpose."}
          </p>
        </div>
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-32 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
          {content.intro_eyebrow || "The Powerhouse Behind The Platform"}
        </p>

        <h2 className="uppercase font-black text-5xl md:text-6xl leading-tight whitespace-pre-line">
          {content.intro_headline ||
            "Built In Fire.\nShaped By Pressure.\nGiven With Purpose."}
        </h2>

        <p className="mt-10 max-w-5xl mx-auto text-slate-300 italic font-serif text-xl leading-10">
          {content.intro_body ||
            "The Creative Forge is where poetry, reflection, and storytelling meet. It’s not just a blog. It’s not just a journal. It’s the raw work of finding words for what’s hard to say — and offering them to others who need to hear it."}
        </p>

        <p className="mt-10 max-w-4xl mx-auto text-slate-400 italic font-serif text-lg leading-9">
          {content.intro_subtext ||
            "This is where haikus are written in the margins. Where odes take shape between shifts. Where moments that make us smile are captured before they’re gone."}
        </p>
      </section>

      <section className="bg-[#11141b] px-8 md:px-20 py-32 text-center">
        <p className="text-[#c8a96a] text-4xl mb-5">✒</p>

        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
          Haikus
        </p>

        <h2 className="uppercase font-black text-5xl">
          Small Words, Big Weight
        </h2>

        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
          {haikus.map((haiku) => (
            <div
              key={haiku}
              className="bg-[#202632] rounded-xl border border-white/5 p-10 min-h-[210px] flex flex-col justify-center hover:border-[#c8a96a]/50 hover:-translate-y-2 transition duration-500"
            >
              <p className="text-slate-200 font-serif text-lg leading-9">
                {haiku}
              </p>

              <p className="mt-10 text-slate-500 uppercase tracking-[0.25em] text-[10px]">
                — T.J. Baird
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="relative bg-cover bg-center px-8 md:px-20 py-44"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(13,15,20,0.88),
              rgba(13,15,20,0.92)
            ),
            url('/reforged-forge.webp')
          `,
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            Reforged
          </p>

          <h2 className="uppercase text-5xl md:text-6xl font-black leading-tight">
            There Is A Kind Of Breaking <br />
            That Rebuilds.
          </h2>

          <p className="mt-10 text-slate-300 italic font-serif text-2xl leading-10">
            Pressure does not always destroy. Sometimes it reveals what was
            buried, what was waiting, and what still holds.
          </p>
        </div>
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="text-center">
          <p className="text-[#c8a96a] text-4xl mb-5">✧</p>

          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
            Odes
          </p>

          <h2 className="uppercase font-black text-5xl">
            Stories Written To Last
          </h2>
        </div>

        <div className="max-w-6xl mx-auto mt-20 space-y-8">
          {odes.map(([title, text, tag]) => (
            <div
              key={title}
              className="bg-[#202632] rounded-xl border border-white/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8 hover:border-[#c8a96a]/50 hover:-translate-y-2 transition duration-500"
            >
              <div>
                <p className="text-[#c8a96a] text-xl mb-4">✦</p>

                <h3 className="uppercase font-black text-2xl">{title}</h3>

                <p className="mt-4 text-slate-400 italic font-serif text-lg leading-8">
                  {text}
                </p>
              </div>

              <span className="bg-[#c8a96a]/15 text-[#c8a96a] px-4 py-2 text-[10px] uppercase tracking-[0.22em] w-fit">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#11141b] px-8 md:px-20 py-32 text-center">
        <p className="text-[#c8a96a] text-4xl mb-5">♡</p>

        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
          Moments That Make Me Smile
        </p>

        <h2 className="uppercase font-black text-5xl">
          The Quiet Beauty Between The Missions
        </h2>

        <p className="mt-8 max-w-4xl mx-auto text-slate-400 italic font-serif text-xl leading-9">
          Not every moment needs weight. Some are just good. Simple. Worth
          remembering.
        </p>

        <div className="max-w-7xl mx-auto mt-20 grid md:grid-cols-6 auto-rows-[220px] gap-8">
          {moments.map(([caption, image], index) => {
            const layouts = [
              "md:col-span-3 md:row-span-2",
              "md:col-span-1 md:row-span-1",
              "md:col-span-2 md:row-span-2",
              "md:col-span-3 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-2 md:row-span-1",
            ];

            return (
              <div
                key={caption}
                className={`relative overflow-hidden rounded-2xl border border-white/5 group bg-[#202632] ${layouts[index]}`}
              >
                <img
                  src={image}
                  alt={caption}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="relative z-10 h-full flex items-end p-6">
                  <p className="text-left text-slate-100 italic font-serif text-lg leading-8">
                    {caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
              Guiding Principles
            </p>

            <h2 className="uppercase font-black text-5xl leading-tight">
              Lived In The Work.
            </h2>
          </div>

          <div className="space-y-8">
            {[
              "Smile and the world smiles with you.",
              "Discipline, thought, word, and deed.",
              "Be fit — mind, body, and spirit.",
              "Live life to its fullest.",
            ].map((line) => (
              <p
                key={line}
                className="text-slate-300 italic font-serif text-2xl leading-10 border-l border-[#c8a96a] pl-6"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative px-8 md:px-20 py-32 text-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(16,18,24,0.9),
              rgba(16,18,24,0.94)
            ),
            url('/legacy-carried-forward.webp')
          `,
        }}
      >
        <div className="absolute left-10 top-10 text-9xl text-black/20 font-black">
          ”
        </div>

        <p className="max-w-5xl mx-auto text-slate-200 italic font-serif text-3xl leading-[1.6]">
          The forge is where pressure becomes strength. Where heat becomes
          clarity. Where broken pieces are reforged into something that holds.
        </p>

        <p className="mt-16 text-[#c8a96a] uppercase tracking-[0.3em] text-[11px]">
          — T.J. Baird, The Creative Forge
        </p>
      </section>

      <Footer />
    </main>
  );
}

export default Forge;