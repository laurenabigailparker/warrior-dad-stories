import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";
import GuidingPrinciples from "../components/GuidingPrinciples";
import BookJourneyCarousel from "../components/BookJourneyCarousel";

function Derek() {
  const [timeline, setTimeline] = useState([]);
  const [content, setContent] = useState({});
  const [aboutCarousel, setAboutCarousel] = useState([]);

  useEffect(() => {
    const loadTimeline = async () => {
      const { data, error } = await supabase
        .from("timeline_events")
        .select("*")
        .eq("published", true)
        .eq("person", "derek")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setTimeline(data || []);
    };

    loadTimeline();
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "derek");

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

    loadContent();
  }, []);

  useEffect(() => {
    const loadAboutCarousel = async () => {
      const { data, error } = await supabase
        .from("about_carousel_images")
        .select("*")
        .eq("published", true)
        .eq("page", "derek")
        .order("display_order", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setAboutCarousel(data || []);
    };

    loadAboutCarousel();
  }, []);

  return (
    <main className="bg-[#11141b] text-white min-h-screen">
      <Navbar />

      <section
        className="relative min-h-[720px] flex items-center px-8 md:px-20 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(10,12,16,0.92) 0%,
              rgba(10,12,16,0.72) 40%,
              rgba(10,12,16,0.45) 65%,
              rgba(10,12,16,0.92) 100%
            ),
            url('${content.hero_image || "/about-hero-journey.webp"}')
          `,
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

        <div className="max-w-[320px] sm:max-w-3xl relative z-10">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            {content.hero_eyebrow || "Warrior Dad Stories · About Derek"}
          </p>

          <h1 className="uppercase font-black text-[2.4rem] sm:text-6xl md:text-8xl leading-[0.92] whitespace-pre-line">
            {content.hero_headline || "Brother.\nLeader.\nWarrior."}
          </h1>

          <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9 max-w-2xl whitespace-pre-line">
            {content.hero_body || ""}
          </p>
        </div>
      </section>

      <section className="bg-[#171c25] px-8 md:px-20 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-20 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
              {content.mission_eyebrow || "The Mission"}
            </p>

            <h2 className="uppercase text-5xl font-black leading-tight whitespace-pre-line">
              {content.mission_headline || "Derek's Mission"}
            </h2>

            <p className="mt-8 text-slate-300 font-serif italic leading-9 text-lg whitespace-pre-line">
              {content.mission_body || ""}
            </p>
          </div>

          <div className="relative">
            <img
              src={content.mission_image || "/tj-portrait.webp"}
              alt={content.mission_image_alt || "Derek"}
              className="rounded-2xl shadow-2xl border border-white/10 max-h-[620px] w-full object-cover"
            />

            <div className="absolute -bottom-6 -left-6 bg-[#c8a96a] text-black px-6 py-5 uppercase tracking-[0.2em] text-[10px] font-black shadow-xl">
              {content.mission_badge || "Brother · Leader · Warrior"}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#11141b] px-8 md:px-20 py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
            {content.new_season_eyebrow || "A New Season"}
          </p>

          <h2 className="mt-6 uppercase text-5xl md:text-6xl font-black whitespace-pre-line leading-tight">
            {content.new_season_title || "The Turn"}
          </h2>

          <div className="mt-12 space-y-10 text-2xl italic font-serif text-slate-300 leading-[1.9]">
            {content.new_season_paragraph_1 && (
              <p className="whitespace-pre-line">
                {content.new_season_paragraph_1}
              </p>
            )}

            {content.new_season_paragraph_2 && (
              <p className="whitespace-pre-line">
                {content.new_season_paragraph_2}
              </p>
            )}

            {content.new_season_paragraph_3 && (
              <p className="whitespace-pre-line">
                {content.new_season_paragraph_3}
              </p>
            )}

            {!content.new_season_paragraph_1 &&
              !content.new_season_paragraph_2 &&
              !content.new_season_paragraph_3 &&
              content.new_season_body && (
                <p className="whitespace-pre-line">{content.new_season_body}</p>
              )}
          </div>

          <div className="mt-20 grid lg:grid-cols-[1fr_420px] gap-16 items-center text-left">
            <div>
              {content.new_season_supporting && (
                <p className="text-slate-400 italic font-serif text-lg leading-9 whitespace-pre-line">
                  {content.new_season_supporting}
                </p>
              )}

              {!content.new_season_supporting && content.new_season_body_2 && (
                <p className="text-slate-400 italic font-serif text-lg leading-9 whitespace-pre-line">
                  {content.new_season_body_2}
                </p>
              )}
            </div>

            <img
              src={content.new_season_image || "/tj-portrait.webp"}
              alt={content.new_season_image_alt || "Derek"}
              className="rounded-2xl border border-white/10 shadow-2xl max-h-[620px] w-full object-cover bg-[#151922] transition duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#171c25] px-8 md:px-20 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
            {content.why_eyebrow || "Why Warrior Dad Stories"}
          </p>

          <h2 className="mt-6 uppercase text-5xl md:text-6xl font-black leading-tight whitespace-pre-line">
            {content.why_title || "Built Through Service.\nWritten For Legacy."}
          </h2>

          {content.why_body && (
            <p className="mt-10 text-slate-300 italic font-serif text-xl leading-10 whitespace-pre-line">
              {content.why_body}
            </p>
          )}

          {content.why_body_2 && (
            <p className="mt-8 text-slate-400 leading-9 whitespace-pre-line">
              {content.why_body_2}
            </p>
          )}

          {content.why_body_3 && (
            <p className="mt-8 text-slate-400 leading-9 whitespace-pre-line">
              {content.why_body_3}
            </p>
          )}

          <div className="mt-14 border-t border-white/10 pt-12">
            <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
              {content.why_callout_eyebrow || "What Sets Warrior Dad Stories Apart"}
            </p>

            {content.why_callout_body && (
              <p className="mt-6 text-2xl italic font-serif text-slate-200 leading-[1.8] whitespace-pre-line">
                {content.why_callout_body}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              {content.timeline_eyebrow || "The Journey"}
            </p>

            <h2 className="mt-6 uppercase text-5xl font-black">
              {content.timeline_heading || "Derek Timeline"}
            </h2>
          </div>

          <div className="mt-20 space-y-10 relative">
            <div className="absolute left-[58px] top-0 bottom-0 w-px bg-white/10" />

            {timeline.length === 0 ? (
              <p className="text-center text-slate-500 italic font-serif">
                No Derek timeline events published yet.
              </p>
            ) : (
              timeline.map((item) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-[120px_1fr] gap-10 border-b border-white/5 pb-10"
                >
                  <div className="text-[#c8a96a] text-4xl font-black">
                    {item.event_date}
                  </div>

                  <div>
                    <h3 className="uppercase text-2xl font-black tracking-wide">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-slate-400 italic font-serif">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[620px] flex items-center justify-center text-center px-8 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(10,12,16,0.78),
              rgba(10,12,16,0.78)
            ),
            url('${content.legacy_image || "/legacy-carried-forward.webp"}')
          `,
          backgroundPosition: content.legacy_image_position || "center 38%",
        }}
      >
        <div className="max-w-5xl relative z-10">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-8">
            {content.legacy_eyebrow || "Legacy"}
          </p>

          <h2 className="uppercase text-4xl md:text-7xl font-black leading-[1.15] whitespace-pre-line">
            {content.legacy_title ||
              "Legacy Is Not\nWhat We Leave Behind.\nIt's What We Carry Forward."}
          </h2>

          {content.legacy_body && (
            <p className="mt-10 max-w-3xl mx-auto text-slate-300 italic font-serif text-xl leading-10 whitespace-pre-line">
              {content.legacy_body}
            </p>
          )}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#c8a96a]/50 to-transparent" />

      <section className="bg-[#11141b] px-8 md:px-20 py-32 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
          {content.carousel_eyebrow || "Behind The Mission"}
        </p>

        <h2 className="uppercase font-black text-5xl">
          {content.carousel_heading || "The People Who Shaped The Journey"}
        </h2>

        {content.carousel_body && (
          <p className="mt-8 max-w-4xl mx-auto text-slate-400 italic font-serif text-xl leading-9 whitespace-pre-line">
            {content.carousel_body}
          </p>
        )}

        <BookJourneyCarousel images={aboutCarousel} />
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_520px] gap-20 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
              {content.live_fully_eyebrow || "Live Life To Its Fullest"}
            </p>

            <h2 className="uppercase font-black text-5xl md:text-6xl leading-tight whitespace-pre-line">
              {content.live_fully_title || "The Mission\nEvolved."}
            </h2>

            {content.live_fully_body && (
              <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9 whitespace-pre-line">
                {content.live_fully_body}
              </p>
            )}

            {content.live_fully_body_2 && (
              <p className="mt-8 text-slate-400 italic font-serif text-lg leading-8 whitespace-pre-line">
                {content.live_fully_body_2}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={content.live_fully_primary_url || "/forge"}
                className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
              >
                {content.live_fully_primary_text || "Enter The Forge"}
              </a>

              <a
                href={content.live_fully_secondary_url || "/blog"}
                className="border border-[#c8a96a] text-[#c8a96a] px-8 py-4 uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
              >
                {content.live_fully_secondary_text || "Read The Stories"}
              </a>
            </div>
          </div>

          <div>
            <img
              src={content.live_fully_image || "/tj-portrait.webp"}
              alt={content.live_fully_image_alt || "Derek"}
              className="w-full max-h-[620px] object-contain rounded-2xl border border-white/10 shadow-2xl bg-[#11141b]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
            {content.cta_eyebrow || "Collaboration"}
          </p>

          <h2 className="mt-6 uppercase text-5xl font-black">
            {content.cta_heading || "Share The Journey"}
          </h2>

          {content.cta_body && (
            <p className="mt-10 text-slate-300 italic font-serif text-xl leading-10 whitespace-pre-line">
              {content.cta_body}
            </p>
          )}

          {content.cta_body_2 && (
            <p className="mt-8 text-slate-400 leading-8 max-w-3xl mx-auto whitespace-pre-line">
              {content.cta_body_2}
            </p>
          )}

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href={content.cta_primary_url || "/contact"}
              className="bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
            >
              {content.cta_primary_text || "Connect With Derek"}
            </a>

            <a
              href={content.cta_secondary_url || "/forge"}
              className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 uppercase tracking-[0.18em] text-[11px] hover:bg-[#c8a96a] hover:text-black transition"
            >
              {content.cta_secondary_text || "Enter The Forge"}
            </a>
          </div>
        </div>
      </section>

      <GuidingPrinciples />

      <Footer />
    </main>
  );
}

export default Derek;