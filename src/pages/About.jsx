import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";

function About() {
  const [timeline, setTimeline] = useState([]);

  const principles = [
    [
      "Smile And The World Smiles With You",
      "Lead with positivity, connection, and humanity.",
    ],
    [
      "Discipline, Thought, Word, And Deed",
      "Live intentionally and lead with consistency.",
    ],
    [
      "Be Fit — Mind, Body, And Spirit",
      "Growth requires harmony across every part of life.",
    ],
    [
      "Live Life To Its Fullest",
      "Pursue purpose, service, adventure, and meaningful relationships.",
    ],
  ];

  useEffect(() => {
    const loadTimeline = async () => {
      const { data, error } = await supabase
        .from("timeline_events")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setTimeline(data || []);
    };

    loadTimeline();
  }, []);

  return (
    <main className="bg-[#11141b] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
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
            url('/about-hero-journey.webp')
          `,
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

        <div className="max-w-[320px] sm:max-w-3xl relative z-10">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            Warrior Dad Stories · About TJ
          </p>

          <h1 className="uppercase font-black text-[2.4rem] sm:text-6xl md:text-8xl leading-[0.92]">
            Warrior. <br />
            Father. <br />
            Story. <br />
            <span className="text-[#c8a96a]">Teller.</span>
          </h1>

          <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9 max-w-2xl">
            Stories forged through service, strengthened by love, and written
            for legacy.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-[#171c25] px-8 md:px-20 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-20 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
              The Mission
            </p>

            <h2 className="uppercase text-5xl font-black leading-tight">
              The Mission Did Not End. <br />
              It Evolved.
            </h2>

            <p className="mt-8 text-slate-300 font-serif italic leading-9 text-lg">
              Warrior Dad Stories was born from the realization that leadership,
              fatherhood, service, and storytelling are not separate journeys —
              they are deeply connected.
            </p>

            <p className="mt-6 text-slate-400 leading-8">
              After decades of military service, deployments, sacrifice, and
              leadership, TJ discovered that some of life’s greatest lessons
              existed not on the battlefield, but in fatherhood, reflection,
              resilience, and the quiet moments that shape legacy.
            </p>
          </div>

          <div className="relative">
            <img
              src="/mission-evolved-study.webp"
              alt="TJ reflecting and writing"
              className="rounded-2xl shadow-2xl border border-white/10 max-h-[620px] w-full object-cover"
            />

            <div className="absolute -bottom-6 -left-6 bg-[#c8a96a] text-black px-6 py-5 uppercase tracking-[0.2em] text-[10px] font-black shadow-xl">
              Veteran · Father · Author
            </div>
          </div>
        </div>
      </section>

      {/* THE TURN */}
      <section className="relative bg-[#11141b] px-8 md:px-20 py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
            A New Season
          </p>

          <h2 className="mt-6 uppercase text-6xl font-black">The Turn</h2>

          <p className="mt-10 text-2xl italic font-serif text-slate-300 leading-[1.9]">
            “The mission did not end, it evolved.”
          </p>

          <div className="mt-16 grid lg:grid-cols-[1fr_420px] gap-16 items-center text-left">
            <div>
              <p className="text-slate-300 leading-9 text-lg font-serif italic">
                Becoming a father while serving changed everything. The man who
                once measured success through missions, deployments, and
                responsibility began to measure it differently — in bedtime
                stories, early mornings, phone calls from across the world, and
                the look in his daughter’s eyes when he came home.
              </p>

              <p className="mt-8 text-slate-400 leading-8">
                Today, TJ stands in a new season of life. The little girl who
                once reached for his hand is becoming a strong, driven, and
                successful young woman forging her own path forward.
              </p>

              <p className="mt-8 text-slate-300 font-serif italic text-xl leading-9">
                The Turn is the journey from protecting her to walking beside
                her — carrying the same love, leadership, and purpose into every
                stage of life.
              </p>
            </div>

            <img
              src="/tj-and-macaroni.webp"
              alt="Father and daughter"
              className="rounded-2xl border border-white/10 shadow-2xl max-h-[620px] w-full object-cover bg-[#151922] transition duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              The Journey
            </p>

            <h2 className="mt-6 uppercase text-5xl font-black">
              Warrior Dad Timeline
            </h2>
          </div>

          <div className="mt-20 space-y-10 relative">
            <div className="absolute left-[58px] top-0 bottom-0 w-px bg-white/10" />

            {timeline.length === 0 ? (
              <p className="text-center text-slate-500 italic font-serif">
                No timeline events published yet.
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

      {/* LEGACY DIVIDER */}
      <section
        className="relative min-h-[620px] flex items-center justify-center text-center px-8 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(10,12,16,0.78),
              rgba(10,12,16,0.78)
            ),
            url('/legacy-carried-forward.webp')
          `,
          backgroundPosition: "center 38%",
        }}
      >
        <div className="max-w-5xl relative z-10">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-8">
            Legacy
          </p>

          <h2 className="uppercase text-4xl md:text-7xl font-black leading-[1.15]">
            Legacy Is Not <br />
            What We Leave Behind. <br />
            <span className="text-[#c8a96a]">
              It’s What We Carry Forward.
            </span>
          </h2>

          <p className="mt-10 max-w-3xl mx-auto text-slate-300 italic font-serif text-xl leading-10">
            Warrior Dad Stories exists to preserve the lessons, memories,
            relationships, and humanity that continue long after service ends.
          </p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative bg-[#11141b] px-8 md:px-20 py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              Guiding Principles
            </p>

            <h2 className="mt-6 uppercase text-5xl font-black">
              Lived. Not Lectured.
            </h2>
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-12">
            {principles.map(([title, text]) => (
              <div key={title} className="border-l border-[#c8a96a] pl-6">
                <h3 className="uppercase text-2xl font-black leading-tight">
                  {title}
                </h3>

                <p className="mt-5 text-slate-400 italic font-serif leading-8">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFE BEYOND SERVICE */}
      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_520px] gap-20 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
              Live Life To Its Fullest
            </p>

            <h2 className="uppercase font-black text-5xl md:text-6xl leading-tight">
              The Mission <br />
              Evolved.
            </h2>

            <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
              Service shaped the discipline. Fatherhood shaped the heart. But
              life after both became something deeper — adventure, connection,
              reflection, purpose, and learning how to fully live in the moments
              that matter.
            </p>

            <p className="mt-8 text-slate-400 italic font-serif text-lg leading-8">
              Warrior Dad Stories is not only about surviving hard things. It’s
              about building a life worth remembering after them.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/forge"
                className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
              >
                Enter The Forge
              </a>

              <a
                href="/blog"
                className="border border-[#c8a96a] text-[#c8a96a] px-8 py-4 uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
              >
                Read The Stories
              </a>
            </div>
          </div>

          <div>
            <img
              src="/vstar-adventure.jpg"
              alt="TJ and VSTAR adventure"
              className="w-full max-h-[620px] object-contain rounded-2xl border border-white/10 shadow-2xl bg-[#11141b]"
            />
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="bg-[#1a1f27] px-8 md:px-20 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
            Collaboration
          </p>

          <h2 className="mt-6 uppercase text-5xl font-black">
            Share The Journey
          </h2>

          <p className="mt-10 text-slate-300 italic font-serif text-xl leading-10">
            Warrior Dad Stories exists to inspire others to walk their path and
            share their stories with the world.
          </p>

          <p className="mt-8 text-slate-400 leading-8 max-w-3xl mx-auto">
            Through speaking, storytelling, poetry, leadership reflections, and
            creative collaboration, Warrior Dad Stories continues building a
            platform rooted in service, resilience, and human connection.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
            >
              Connect With TJ
            </a>

            <a
              href="/forge"
              className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 uppercase tracking-[0.18em] text-[11px] hover:bg-[#c8a96a] hover:text-black transition"
            >
              Enter The Forge
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default About;