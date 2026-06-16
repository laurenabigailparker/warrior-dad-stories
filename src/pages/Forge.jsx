import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";
import GuidingPrinciples from "../components/GuidingPrinciples";
import { Link } from "react-router-dom";

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

      {/* REFORGED FEATURE */}
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

            <p className="mt-6 text-slate-400 italic font-serif text-lg leading-9">
              What follows is not a story of arrival, but of commitment to becoming
              better, to staying present, and to carrying forward the lessons forged
              in that crucible.
            </p>
          </div>

          <div className="mt-16 bg-[#11141b]/85 border border-white/10 rounded-2xl p-8 md:p-14 shadow-2xl">
            <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[11px] mb-4">
              Reforged: An Ode to the Journey Through PREP
            </p>

            <div className="space-y-14 text-slate-300 font-serif italic leading-9 text-lg">
              <div>
                <h3 className="text-white uppercase font-black tracking-widest text-2xl mb-8">
                  I. Armored and Breaking
                </h3>

                <p className="whitespace-pre-line">
{`I told myself that I was fine.
That others needed help, not me.
The mirror showed scars, but I ignored them,
Armored, distant, implacable.

Whispers turned to pleas,
“You’re too angry,” she said, eyes dimmed with tears.
“I want you to be happy… but we can’t live like this.”
Their words landed like a hammer; undeniable.

The decision came in fits and starts,
Years layered by guilt, pride, and pain.
But in the stillness of truth,
I saw the better man I could be.

And I whispered,

Let’s do this.

Let’s be better,

For me… for them.`}
                </p>
              </div>

              <div>
                <h3 className="text-white uppercase font-black tracking-widest text-2xl mb-8">
                  II. The Crucible
                </h3>

                <p className="whitespace-pre-line">
{`I arrived not with thunder,
But with trepidation in every step.
Would they see me as broken?
As I see myself, the scarred man in the mirror?

I scanned the faces, strangers, all carrying something.
And in their hardened silence, I saw my own reflection.
A fraternity of the weary, not defeated,
Just exhausted from the march.

Then came the shift.
The team; calm, ready, unwavering.
They met my fear; not with judgment,
But with purpose and compassion.

Every grace, every talk, every breath:
A movement away from the man hidden beneath the armor,
Toward the man I could become.

The crucible sears: yes,
But it tempers, too.`}
                </p>
              </div>

              <div>
                <h3 className="text-white uppercase font-black tracking-widest text-2xl mb-8">
                  III. Reforged
                </h3>

                <p className="whitespace-pre-line">
{`This path is enduring.
But now I walk it,
Eyes focused, back straighter, steps surer.

We are not cured.
We are not erased.
We are renewed, honed, better.

This brotherhood of healing,
This tribe of warriors; bonded by purpose,
They have changed me.

I carry with me their strength,
Their laughter for the hard days ahead,
Their courage when mine wanes.`}
                </p>
              </div>

              <div className="mt-12 text-center">
                <a
                  href="/contact"
                  className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
                >
                  Connect With TJ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HAIKUS */}
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

     {/* STORIES WRITTEN TO LAST */}
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

  <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
    {entries
      .filter((entry) => entry.featured)
      .slice(0, 3)
      .map((entry) => {
        const image =
          entry.featured_image ||
          entry.artwork_image ||
          entry.background_image;

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
</section>

      {/* LATEST ENTRIES */}
      {entries.length > 0 && (
        <section className="bg-[#11141b] px-8 md:px-20 py-32">
          <div className="text-center">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
              Creative Forge
            </p>

            <h2 className="uppercase font-black text-5xl">
              Latest Entries
            </h2>
          </div>

          <div className="max-w-6xl mx-auto mt-20 space-y-8">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#202632] rounded-xl border border-white/5 p-8"
              >
                {(entry.featured_image ||
                  entry.artwork_image ||
                  entry.background_image) && (
                  <img
                    src={
                      entry.featured_image ||
                      entry.artwork_image ||
                      entry.background_image
                    }
                    alt={entry.title}
                    className="w-full h-[400px] object-cover rounded-xl mb-8"
                  />
                )}

                <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                  {entry.entry_type}
                </p>

                <h3 className="mt-4 uppercase font-black text-3xl">
                  {entry.title}
                </h3>

                <p className="mt-6 text-slate-400 italic font-serif">
                  {entry.excerpt}
                </p>

                <div className="mt-8 whitespace-pre-line text-slate-300 font-serif leading-8">
                  {entry.body}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* QUIET BEAUTY */}
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

export default Forge;