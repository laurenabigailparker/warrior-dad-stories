import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";


function Home() {
 return (
  <main className="min-h-screen bg-[#11141b] text-white">
    <Navbar />
    <Hero />
    <Mission />
    <BookLaunch />
    <FeaturedIn />
    <WatchStory />
    <PathForward />
    <TestimonialsCarousel />

    {/* emotional breath section */}
    <CinematicDivider />

    <PrinciplesPreview />
    <MeetTJ />
    <FinalCTA />
    <Footer />
  </main>
);
}

function Hero() {
  return (
    <section
      className="relative min-h-[780px] flex items-center px-8 md:px-20 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(13,15,20,0.92) 0%,
            rgba(13,15,20,0.78) 38%,
            rgba(13,15,20,0.45) 65%,
            rgba(13,15,20,0.88) 100%
          ),
          url('/hero-walking-the-journey.png')
        `,
      }}
    >
      <div className="max-w-2xl relative z-10">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
          Veteran-Owned Storytelling · Fatherhood · Legacy
        </p>

        <h1 className="uppercase font-black leading-[0.92] tracking-wide text-6xl md:text-8xl">
          Stories <br />
          Forged In <br />
          <span className="text-[#c8a96a]">Service.</span>
        </h1>

        <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9 max-w-xl">
          Warrior Dad Stories exists to inspire others to walk their path,
          share their story, and remember that the mission does not end — it
          evolves.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#book"
            className="bg-[#c8a96a] text-black px-8 py-4 text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-white transition"
          >
            Start The Journey
          </a>

          <a
            href="/about"
            className="border border-[#c8a96a] text-[#c8a96a] px-8 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
          >
            Meet TJ
          </a>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const pillars = [
    [
      "Stories With Soul.",
      "Reflections from service, family, sacrifice, and the quiet moments that shape who we become.",
    ],
    [
      "Leadership With Humanity.",
      "A lived approach to resilience, fatherhood, and purpose — not polished theory, but real life.",
    ],
    [
      "Legacy Without Limits.",
      "Words, images, and memories created to outlast the uniform and keep love within reach.",
    ],
  ];

  return (
    <section className="bg-[#1a1f27] px-8 md:px-20 py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-14">
        {pillars.map(([title, text], index) => (
          <div key={title}>
            <h3
              className={`uppercase text-3xl font-black tracking-wide ${
                index === 1 ? "text-[#c8a96a]" : "text-white"
              }`}
            >
              {title}
            </h3>

            <p className="mt-5 text-slate-400 italic font-serif leading-8">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookLaunch() {
  return (
    <section id="book" className="bg-[#1b212b] px-8 md:px-20 py-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-24 items-center">
        <div className="text-center">
          <img
            src="/wd-book-cover.png"
            alt="Warrior Dad Book Cover"
            className="w-72 mx-auto rounded-sm border border-white/10 shadow-2xl"
          />

          <div className="mt-6 text-[#c8a96a]">★★★★★</div>
          <p className="text-xs text-slate-500">
            100 pages of poetry and illustrations
          </p>
        </div>

        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-4">
            The Book
          </p>

          <h2 className="text-5xl md:text-6xl uppercase font-black tracking-wide">
            Warrior Dad
          </h2>

          <h3 className="text-2xl md:text-3xl uppercase font-black text-slate-500 mt-2">
            A Collection Of Odes
          </h3>

          <p className="mt-8 text-slate-300 font-serif text-lg leading-9 max-w-3xl">
            A collection of moments, reflections, odes, and illustrations that
            bridge the space between battlefield and family. Warrior Dad
            preserves the love, sacrifice, humor, and legacy carried by those
            who serve — and those who wait for them to come home.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-10">
            <Stat big="May 23" small="Launch Date" />
            <Stat big="100" small="Pages" />
            <Stat big="HC + Ebook" small="Formats" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/shop"
              className="bg-[#c8a96a] text-black px-10 py-4 text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-white transition"
            >
              View The Book
            </a>

            <a
              href="/forge"
              className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
            >
              Enter The Forge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedIn() {
  return (
    <section className="bg-[#202632] py-20 px-8">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
          Featured In
        </p>

        <h2 className="uppercase text-4xl md:text-5xl font-black">
          Recognized Beyond The Page
        </h2>

        <div className="mt-12 bg-[#1b212b] border border-white/10 rounded-2xl p-10 md:p-14">
          <p className="uppercase tracking-[0.3em] text-[11px] text-[#c8a96a]">
            Texoma's Homepage
          </p>

          <h3 className="mt-5 text-3xl font-black uppercase">
            Veteran Author T.J. Baird Honors Military Members In Lawton
          </h3>

          <p className="mt-6 text-slate-400 italic font-serif text-lg leading-8">
            Warrior Dad Stories and author T.J. Baird were featured by
            Texoma's Homepage for honoring military members through storytelling,
            service, and community impact.
          </p>

          <a
            href="https://www.texomashomepage.com/news/local-news/veteran-author-t-j-baird-honors-military-members-in-lawton/"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
          >
            Read The Article →
          </a>
        </div>
      </div>
    </section>
  );
}

function WatchStory() {
  return (
    <section className="bg-[#1f2631] py-28 px-8">
      <SectionTitle
        eyebrow="Watch The Story"
        title="The Journey Behind Warrior Dad"
      />

      <div
        className="relative mt-14 max-w-5xl mx-auto h-[430px] bg-cover bg-center rounded-xl overflow-hidden border border-white/10 flex items-center justify-center"
        style={{
          backgroundImage: `
            linear-gradient(
              to top,
              rgba(0,0,0,0.75),
              rgba(0,0,0,0.2)
            ),
            url('/fatherhood-through-service.jpg')
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

     <button
  className="group relative z-10 h-24 w-24 rounded-full border border-[#c8a96a]/70 bg-black/35 backdrop-blur-md flex items-center justify-center shadow-[0_0_45px_rgba(200,169,106,0.25)] hover:scale-105 hover:bg-[#c8a96a]/20 transition-all duration-300"
  aria-label="Play video"
>
  <span className="absolute inset-0 rounded-full border border-[#c8a96a]/30 animate-ping" />
  <span className="relative ml-1 text-[#c8a96a] text-3xl group-hover:text-white transition">
    ▶
  </span>
</button>

        <div className="absolute bottom-8 left-8 z-10">
          <h4 className="uppercase text-xl font-black">
            Watch The Story
          </h4>

          <p className="text-slate-300 italic font-serif mt-2">
            Trailer and introduction video coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}

function PathForward() {
  const cards = [
    [
      "Warrior Dad",
      "The Book",
      "A collection of odes and illustrations about service, fatherhood, love, and legacy.",
    ],
    [
      "The Creative Forge",
      "Emotional Core",
      "Haikus, odes, moments, and reflections shaped by pressure, memory, and purpose.",
    ],
    [
      "Speaking & Media",
      "Bring The Story",
      "Invite TJ to share reflections on leadership, resilience, storytelling, and fatherhood.",
    ],
  ];

  return (
    <section className="bg-[#1b212b] py-28 px-8">
      <SectionTitle eyebrow="Three Ways To Engage" title="Your Path Forward" />

      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-7">
        {cards.map(([title, label, text]) => (
          <div
            key={title}
            className="bg-[#202632] border border-white/10 rounded-xl p-8 hover:border-[#c8a96a]/60 hover:-translate-y-2 transition duration-500"
          >
            <div className="h-12 w-12 rounded-full border border-[#c8a96a]/50 flex items-center justify-center text-[#c8a96a]">
              ✦
            </div>

            <h3 className="mt-8 uppercase text-2xl font-black tracking-widest">
              {title}
            </h3>

            <p className="uppercase text-xs tracking-[0.25em] text-slate-500 mt-1">
              {label}
            </p>

            <p className="mt-5 text-slate-300 font-serif leading-8">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setTestimonials(data || []);
    };

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex];

  return (
    <section className="bg-[#1f2631] py-28 px-8 overflow-hidden">
      <SectionTitle
        eyebrow="Early Acclaim"
        title="Readers See Themselves Here."
      />

      <div className="max-w-5xl mx-auto mt-16 relative">
        <div
          key={active.id}
          className="bg-[#151922] border border-white/10 rounded-2xl p-10 md:p-16 transition-all duration-700"
        >
          <p className="text-slate-200 italic font-serif text-2xl md:text-3xl leading-[1.9]">
            “{active.quote}”
          </p>

          <div className="mt-12">
            <p className="text-white font-bold text-lg">{active.name}</p>

            <p className="text-slate-500 text-sm mt-2 uppercase tracking-[0.18em]">
              {active.role}
            </p>

            <p className="text-[#c8a96a] mt-4 text-lg">★★★★★</p>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index
                  ? "bg-[#c8a96a] w-10 h-3"
                  : "bg-slate-600 w-3 h-3 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CinematicDivider() {
  return (
   <section
  className="relative min-h-[680px] flex items-center justify-center text-center px-8 overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(10,12,16,0.72),
        rgba(10,12,16,0.72)
      ),
      url('/warrior-dad-reflections.webp')
    `,
    backgroundPosition: "center 42%",
  }}
>
      <div className="max-w-4xl relative z-10">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-8">
          Reflection
        </p>

        <h2 className="uppercase text-4xl md:text-6xl font-black leading-[1.2]">
          Some Stories <br />
          Are Written In Ink. <br />
          <span className="text-[#c8a96a]">
            Others In Sacrifice.
          </span>
        </h2>

        <p className="mt-10 text-slate-300 italic font-serif text-xl leading-9">
          Warrior Dad Stories exists for the moments that stay with us —
          long after the uniform, the deployment, or the mission ends.
        </p>
      </div>
    </section>
  );
}

function PrinciplesPreview() {
  const principles = [
    ["Smile", "Lead with positivity, connection, and humanity."],
    ["Discipline", "Live intentionally and lead with consistency."],
    ["Be Fit", "Mind, body, and spirit in harmony."],
    ["Live Fully", "Pursue purpose, service, adventure, and meaningful relationships."],
  ];

  return (
   <section className="relative bg-[#1b212b] px-8 md:px-20 py-28 overflow-hidden">
    <div
  className="absolute inset-0 opacity-[0.05] bg-cover bg-center"
  style={{
    backgroundImage: "url('/warrior-dad-reflections.webp')",
  }}
/>

<div className="absolute inset-0 bg-[#1b212b]/95" />
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6 text-center">
          Guiding Principles
        </p>

        <h2 className="text-center uppercase text-4xl md:text-5xl font-black">
          Not Corporate Values. <br />
          A Way Of Living.
        </h2>

        <div className="mt-16 grid md:grid-cols-4 gap-8">
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

function MeetTJ() {
  return (
    <section className="bg-[#1a1f27] py-32 px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_460px] gap-20 items-center">

        {/* LEFT SIDE */}
        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            Meet TJ
          </p>

          <h2 className="uppercase font-black leading-[0.9] text-5xl md:text-7xl">
            Warrior. <br />
            Father. <br />
            <span className="text-[#c8a96a]">
              Storyteller.
            </span>
          </h2>

          <p className="mt-10 max-w-2xl text-slate-300 italic font-serif text-xl leading-10">
            Becoming a father while serving changed everything. The mission
            did not end — it evolved. Warrior Dad Stories carries that
            evolution forward through poetry, reflection, leadership,
            and legacy.
          </p>

          <a
            href="/about"
            className="inline-block mt-10 border border-[#c8a96a] text-[#c8a96a] px-9 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
          >
            Read The Full Story →
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <img
            src="/tj-portrait.webp"
            alt="TJ Warrior Dad"
            className="w-full rounded-2xl border border-white/10 shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-[#202632] px-8 md:px-20 py-28 text-center">
      <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
        Join The Mission
      </p>

      <h2 className="mt-6 uppercase font-black text-5xl">
        Walk Your Path. <br />
        Share Your Story.
      </h2>

      <p className="mt-8 max-w-3xl mx-auto text-slate-400 italic font-serif text-xl leading-9">
        Get stories, reflections, media updates, and launch news from Warrior
        Dad Stories.
      </p>

<p className="mt-6 text-slate-500 italic font-serif">
  Every story leaves a mark. Every journey becomes legacy.
</p>

      <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 bg-[#1b212b] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]"
        />

        <button className="bg-[#c8a96a] text-black px-10 py-5 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition">
          Join The Journey
        </button>
      </div>
    </section>
  );
}

function Stat({ big, small }) {
  return (
    <div>
      <h4 className="text-[#c8a96a] uppercase text-3xl font-black">{big}</h4>
      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-2">
        {small}
      </p>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="text-center">
      <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
        {eyebrow}
      </p>

      <h2 className="uppercase text-4xl md:text-5xl font-black tracking-wide">
        {title}
      </h2>
    </div>
  );
}

export default Home;