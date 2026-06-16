import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";
import GuidingPrinciples from "../components/GuidingPrinciples";

function Forge() {
  const [content, setContent] = useState({});
  const [entries, setEntries] = useState([]);
  const [moments, setMoments] = useState([]);

  const haikus = [
    "Steel and silk entwined. Duty's weight and love's soft touch. Both hands hold the same.",
    "Boots beside her bed. Mission complete, mission starts. Home is the hard part.",
    "Words in the margins. Written between shifts and sleep. Stories find their way.",
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

      const { data: entryData, error: entryError } = await supabase
        .from("forge_entries")
        .select("*")
        .eq("published", true)
        .neq("entry_type", "bingo")
        .order("created_at", { ascending: false });

      if (entryError) {
        console.error(entryError);
      }

      const { data: reflectionData, error: reflectionError } = await supabase
        .from("reflection_images")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });

      if (reflectionError) {
        console.error(reflectionError);
      }

      if (!ignore) {
        setContent(mapped);
        setEntries(entryData || []);
        setMoments(reflectionData || []);
      }
    };

    loadContent();

    return () => {
      ignore = true;
    };
  }, []);

  const featuredEntries = entries.filter((entry) => entry.featured).slice(0, 3);

  const quietBeautyEntries = entries.filter(
    (entry) => entry.forge_section === "quiet-beauty"
  );

  const lostHaikusEntries = entries.filter(
    (entry) => entry.forge_section === "lost-haikus"
  );

  const writtenForOthersEntries = entries.filter(
    (entry) => entry.forge_section === "written-for-others"
  );

  const warriorDadPoetryEntries = entries.filter(
    (entry) => entry.forge_section === "warrior-dad-poetry"
  );

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
            "The Creative Forge is where poetry, reflection, and storytelling meet. It’s the raw work of finding words for what’s hard to say — and offering them to others who need to hear it."}
        </p>
      </section>

      <section
        className="relative bg-cover bg-center px-8 md:px-20 py-32"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(13,15,20,0.9),
              rgba(13,15,20,0.95)
            ),
            url('${content.reforged_background_image || "/reforged-forge.webp"}')
          `,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
              Reforged
            </p>

            <h2 className="uppercase text-5xl md:text-6xl font-black leading-tight">
              An Ode To The Journey <br />
              Through PREP
            </h2>

            <p className="mt-6 text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
              Award-Winning Poem · 2025
            </p>

            <p className="mt-10 text-slate-300 italic font-serif text-xl md:text-2xl leading-10">
              This journey began with the quiet realization that armor worn too long
              becomes a burden. PREP was not about fixing what was broken, but about
              facing what had been avoided, learning to slow down, to listen, and to
              do the hard internal work required to heal.
            </p>
          </div>
        </div>
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

      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="text-center">
          <p className="text-[#c8a96a] text-4xl mb-5">✧</p>

          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
            Featured Stories
          </p>

          <h2 className="uppercase font-black text-5xl">
            Stories Written To Last
          </h2>

          <p className="mt-8 max-w-4xl mx-auto text-slate-400 italic font-serif text-xl leading-9">
            Featured stories and poems from the Creative Forge. Start here, then
            continue deeper into the Warrior Dad Stories experience.
          </p>
        </div>

        {featuredEntries.length > 0 ? (
          <ForgeEntryGrid entries={featuredEntries} />
        ) : (
          <p className="mt-16 text-center text-slate-500 italic font-serif">
            Featured stories will appear here once selected from the dashboard.
          </p>
        )}
      </section>

      <ForgeCategorySection
        title="The Quiet Beauty Between The Missions"
        eyebrow="PREP Haikus & Video"
        entries={quietBeautyEntries}
      />

      <ForgeCategorySection
        title="The Warrior Dad Lost Haikus"
        eyebrow="Lost Haikus"
        entries={lostHaikusEntries}
      />

      <ForgeCategorySection
        title="Written For Others"
        eyebrow="Retirement Odes & Tribute Pieces"
        entries={writtenForOthersEntries}
      />

      <ForgeCategorySection
        title="Warrior Dad Stories Poems And Haikus"
        eyebrow="Poems & Haikus"
        entries={warriorDadPoetryEntries}
      />

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

        {content.quiet_beauty_video && (
          <div className="max-w-5xl mx-auto mt-16 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              className="w-full aspect-video"
              src={content.quiet_beauty_video}
              title="Because of Them, I Smiled"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto mt-20 grid md:grid-cols-6 auto-rows-[220px] gap-8">
          {moments.map((moment, index) => {
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
                key={moment.id}
                className={`relative overflow-hidden rounded-2xl border border-white/5 group bg-[#202632] ${layouts[index]}`}
              >
                <img
                  src={moment.image_url}
                  alt={moment.caption}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="relative z-10 h-full flex items-end p-6">
                  <p className="text-left text-slate-100 italic font-serif text-lg leading-8">
                    {moment.caption}
                  </p>
                </div>
              </div>
            );
          })}
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
          The Forge is where pressure becomes strength. Where heat becomes
          clarity. Where we come to be reforged into something better.
        </p>

        <p className="mt-16 text-[#c8a96a] uppercase tracking-[0.3em] text-[11px]">
          — T.J. Baird, The Creative Forge
        </p>
      </section>

      <GuidingPrinciples />

      <Footer />
    </main>
  );
}

function ForgeCategorySection({ title, eyebrow, entries }) {
  if (!entries || entries.length === 0) return null;

  return (
    <section className="bg-[#11141b] px-8 md:px-20 py-32">
      <div className="text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
          {eyebrow}
        </p>

        <h2 className="uppercase font-black text-5xl">{title}</h2>
      </div>

      <ForgeEntryGrid entries={entries} />
    </section>
  );
}

function ForgeEntryGrid({ entries }) {
  return (
    <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
      {entries.map((entry) => {
        const image =
          entry.featured_image || entry.artwork_image || entry.background_image;

        return (
          <Link
            key={entry.id}
            to={`/forge/${entry.slug}`}
            className="bg-[#202632] rounded-xl border border-white/5 overflow-hidden hover:border-[#c8a96a]/50 hover:-translate-y-2 transition duration-500 group"
          >
            {image && (
              <img
                src={image}
                alt={entry.title}
                className="h-56 w-full object-cover opacity-80 group-hover:opacity-100 transition"
              />
            )}

            <div className="p-8">
              <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                {entry.entry_type || "Creative Forge"}
              </p>

              <h3 className="mt-4 uppercase font-black text-2xl leading-tight">
                {entry.title}
              </h3>

              <p className="mt-4 text-slate-400 italic font-serif text-lg leading-8 line-clamp-4">
                {entry.excerpt}
              </p>

              <p className="mt-8 text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
                Read Story →
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Forge;