import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import BookJourneyCarousel from "../components/BookJourneyCarousel";


function Home() {
  const [content, setContent] = useState({});
  

  useEffect(() => {
    const loadContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "home");

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

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />
      <Hero content={content} />
<Mission content={content} />
<WatchStory content={content} />
<BookLaunch />
<FeaturedIn content={content} />
      <PathForward content={content} />
      <TestimonialsCarousel />
      <CinematicDivider content={content} />
      <PrinciplesPreview content={content} />
      <MeetTJ content={content} />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Hero({ content }) {
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
          {content.hero_eyebrow || "Veteran-Owned Storytelling · Fatherhood · Legacy"}
        </p>

        <h1 className="uppercase font-black leading-[0.92] tracking-wide text-6xl md:text-8xl whitespace-pre-line">
  {content.hero_headline || "Stories\nForged In\nService."}
</h1>

        <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9 max-w-xl">
          {content.hero_body ||
  "Every journey begins with purpose. At Warrior Dad Stories, our paths are built from service, strengthened by love, and carried forward through words that endure.\n\nWhether found in a battlefield reflection, a father's promise, or a story yet unwritten — the journey begins here."}
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#book"
            className="bg-[#c8a96a] text-black px-8 py-4 text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-white transition"
          >
           {content.hero_button_text || "Start The Mission"}
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

function Mission({ content }) {
  const pillars = [
    [
      content.mission_1_title || "Stories With Soul.",
      content.mission_1_body ||
        "Reflections from service, family, sacrifice, and the quiet moments that shape who we become.",
    ],
    [
      content.mission_2_title || "Leadership With Humanity.",
      content.mission_2_body ||
        "A lived approach to resilience, fatherhood, and purpose — not polished theory, but real life.",
    ],
    [
      content.mission_3_title || "Legacy Without Limits.",
      content.mission_3_body ||
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

            <p className="mt-5 text-slate-400 italic font-serif leading-8 whitespace-pre-line">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookLaunch() {
  const [featuredBook, setFeaturedBook] = useState(null);
  const [bookJourney, setBookJourney] = useState([]);

useEffect(() => {
  const loadFeaturedBook = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("featured", true)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    setFeaturedBook(data);
  };

  const loadBookJourney = async () => {
    const { data, error } = await supabase
      .from("book_journey_images")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setBookJourney(data || []);
  };

  loadFeaturedBook();
  loadBookJourney();
}, []);

  const book = featuredBook || {
    title: "Warrior Dad",
    subtitle: "A Collection Of Odes",
    description:
      "From the frontlines to the home front, Warrior Dad is a collection of odes forged in service and strengthened by love. Each piece captures the heart of a warrior and the soul of a father — moments of courage, loss, faith, and devotion woven into words that honor both duty and family.",
    cover_image: "/wd-book-cover.png",
    amazon_url: "https://www.amazon.com/Warrior-Dad-Tj-Baird/dp/B0GXYVQK76",
    status: "Published",
  };

  return (
    <section id="book" className="bg-[#1b212b] px-8 md:px-20 py-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[340px_1fr] gap-24 items-center">
        <div className="text-center">
          <img
            src={book.cover_image || "/wd-book-cover.png"}
            alt={book.title}
            className="w-72 mx-auto rounded-sm border border-white/10 shadow-2xl"
          />

          <div className="mt-6 text-[#c8a96a]">★★★★★</div>

          <p className="text-xs text-slate-500">
            {book.status || "Published"}
          </p>
        </div>

        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-4">
            Featured Book
          </p>

          <h2 className="text-5xl md:text-6xl uppercase font-black tracking-wide">
            {book.title}
          </h2>

          {book.subtitle && (
            <h3 className="text-2xl md:text-3xl uppercase font-black text-slate-500 mt-2">
              {book.subtitle}
            </h3>
          )}

          <p className="mt-8 text-slate-300 font-serif text-lg leading-9 max-w-3xl whitespace-pre-line">
            {book.description}
          </p>

          <div className="grid grid-cols-3 gap-8 mt-10">
            <Stat big={book.status === "Published" ? "Now" : "Soon"} small={book.status || "Status"} />
            <Stat big="WDS" small="Original Work" />
            <Stat big="Book" small="Featured" />
          </div>

        <div className="mt-10 flex flex-wrap gap-4">
  {book.amazon_url ? (
    <>
      <a
        href={book.amazon_url}
        target="_blank"
        rel="noreferrer"
        className="bg-[#c8a96a] text-black px-10 py-4 text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-white transition"
      >
        Buy The Book
      </a>

      <a
        href="/Warrior Dad Companion Guide.pdf"
        target="_blank"
        rel="noreferrer"
        className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
      >
        Companion Guide
      </a>
    </>
  ) : (
    <span className="bg-[#c8a96a] text-black px-10 py-4 text-[11px] uppercase tracking-[0.18em] font-bold">
      Coming Soon
    </span>
  )}

  <a
    href="/forge"
    className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
  >
    Enter The Forge
  </a>
</div>
       </div>
</div>

{bookJourney.length > 0 && (
  <div className="mt-20 h-px bg-gradient-to-r from-transparent via-[#c8a96a]/50 to-transparent" />
)}

{bookJourney.length > 0 && (
  <div className="max-w-7xl mx-auto mt-24">
    <div className="text-center">
      <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
        Warrior Dad Journey
      </p>

      <h3 className="mt-6 uppercase text-4xl font-black">
        The Story Beyond The Pages
      </h3>

      <p className="mt-8 max-w-3xl mx-auto text-slate-400 italic font-serif text-xl leading-9">
        Book signings, speaking engagements, podcasts, community events,
        and the people Warrior Dad Stories continues to connect with.
      </p>
    </div>

    <BookJourneyCarousel images={bookJourney} />
  </div>
)}
</section>
  );
}

function FeaturedIn({ content }) {
  return (
    <section className="bg-[#202632] py-20 px-8">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
          {content.featured_eyebrow || "Featured In"}
        </p>

        <h2 className="uppercase text-4xl md:text-5xl font-black">
          {content.featured_heading || "Recognized Beyond The Page"}
        </h2>

        <div className="mt-12 bg-[#1b212b] border border-white/10 rounded-2xl p-10 md:p-14">
          <p className="uppercase tracking-[0.3em] text-[11px] text-[#c8a96a]">
            {content.featured_source || "Texoma's Homepage"}
          </p>

          <h3 className="mt-5 text-3xl font-black uppercase">
            {content.featured_title ||
              "Veteran Author T.J. Baird Honors Military Members In Lawton"}
          </h3>

          <p className="mt-6 text-slate-400 italic font-serif text-lg leading-8 whitespace-pre-line">
            {content.featured_body ||
              "Warrior Dad Stories and author T.J. Baird were featured by Texoma's Homepage for honoring military members through storytelling, service, and community impact."}
          </p>

          <a
            href={
              content.featured_url ||
              "https://www.texomashomepage.com/news/local-news/veteran-author-t-j-baird-honors-military-members-in-lawton/"
            }
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
          >
            {content.featured_button_text || "Read The Article →"}
          </a>
        </div>
      </div>
    </section>
  );
}

function WatchStory({ content }) {
  return (
    <section className="bg-[#1f2631] py-28 px-8">
      <SectionTitle
        eyebrow={content.author_message_eyebrow || "Author Message"}
        title={content.author_message_title || "The Story Behind Warrior Dad"}
      />

      <p className="mt-6 max-w-3xl mx-auto text-center text-slate-400 italic font-serif text-xl leading-8 whitespace-pre-line">
        {content.author_message_body ||
          "TJ Baird shares the inspiration, experiences, and purpose behind Warrior Dad."}
      </p>

      <div className="mt-14 max-w-5xl mx-auto">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <video
            className="w-full object-cover"
            controls
            poster={content.author_message_poster || "/fatherhood-through-service.jpg"}
          >
            <source
              src={content.author_message_video || "/hero-book-video.mp4"}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}

function PathForward({ content }) {
  const cards = [
    [
      content.path_1_title || "Warrior Dad",
      content.path_1_label || "The Book",
      content.path_1_body ||
        "A collection of odes and illustrations about service, fatherhood, love, and legacy.",
    ],
    [
      content.path_2_title || "The Creative Forge",
      content.path_2_label || "Emotional Core",
      content.path_2_body ||
        "Haikus, odes, moments, and reflections shaped by pressure, memory, and purpose.",
    ],
    [
      content.path_3_title || "Speaking & Media",
      content.path_3_label || "Bring The Story",
      content.path_3_body ||
        "Invite TJ to share reflections on leadership, resilience, storytelling, and fatherhood.",
    ],
  ];

  return (
    <section className="bg-[#1b212b] py-28 px-8">
      <SectionTitle
        eyebrow={content.path_eyebrow || "Three Ways To Engage"}
        title={content.path_heading || "Your Path Forward"}
      />

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

            <p className="mt-5 text-slate-300 font-serif leading-8 whitespace-pre-line">
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
        eyebrow="Reader Acclaim"
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

function CinematicDivider({ content }) {
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
          url('${content.reflection_background_image || "/warrior-dad-reflections.webp"}')
        `,
        backgroundPosition: content.reflection_background_position || "center 42%",
      }}
    >
      <div className="max-w-4xl relative z-10">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-8">
          {content.reflection_eyebrow || "Reflection"}
        </p>

        <h2 className="uppercase text-4xl md:text-6xl font-black leading-[1.2] whitespace-pre-line">
          {content.reflection_heading ||
            "Some Stories\nAre Written In Ink.\nOthers In Sacrifice."}
        </h2>

        <p className="mt-10 text-slate-300 italic font-serif text-xl leading-9 whitespace-pre-line">
          {content.reflection_body ||
            "Warrior Dad Stories exists for the moments that stay with us — long after the uniform, the deployment, or the mission ends."}
        </p>
      </div>
    </section>
  );
}

function PrinciplesPreview({ content }) {
  const principles = [
    [
      content.principles_1_title || "Smile",
      content.principles_1_body || "Lead with positivity, connection, and humanity.",
    ],
    [
      content.principles_2_title || "Discipline",
      content.principles_2_body || "Live intentionally and lead with consistency.",
    ],
    [
      content.principles_3_title || "Be Fit",
      content.principles_3_body || "Mind, body, and spirit in harmony.",
    ],
    [
      content.principles_4_title || "Live Fully",
      content.principles_4_body || "Pursue purpose, service, adventure, and meaningful relationships.",
    ],
  ];

  return (
    <section className="relative bg-[#1b212b] px-8 md:px-20 py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] bg-cover bg-center"
        style={{
          backgroundImage: `url('${content.principles_background_image || "/warrior-dad-reflections.webp"}')`,
        }}
      />

      <div className="absolute inset-0 bg-[#1b212b]/95" />

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6 text-center">
          {content.principles_eyebrow || "Guiding Principles"}
        </p>

        <h2 className="text-center uppercase text-4xl md:text-5xl font-black whitespace-pre-line">
          {content.principles_heading || "Not Corporate Values.\nA Way Of Living."}
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

function MeetTJ({ content }) {
  return (
    <section className="bg-[#1a1f27] py-32 px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_460px] gap-20 items-center">

        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            {content.meet_tj_eyebrow || "Meet TJ"}
          </p>

          <h2 className="uppercase font-black leading-[0.9] text-5xl md:text-7xl whitespace-pre-line">
            {content.meet_tj_heading || "Warrior.\nFather.\nStoryteller."}
          </h2>

          <p className="mt-10 max-w-2xl text-slate-300 italic font-serif text-xl leading-10 whitespace-pre-line">
            {content.meet_tj_body ||
              "Becoming a father while serving changed everything. The mission did not end — it evolved. Warrior Dad Stories carries that evolution forward through poetry, reflection, leadership, and legacy."}
          </p>

          <a
            href={content.meet_tj_button_url || "/about"}
            className="inline-block mt-10 border border-[#c8a96a] text-[#c8a96a] px-9 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-[#c8a96a] hover:text-black transition"
          >
            {content.meet_tj_button_text || "Read The Full Story →"}
          </a>
        </div>

        <div>
          <img
            src={content.meet_tj_image || "/tj-portrait.webp"}
            alt={content.meet_tj_image_alt || "TJ Warrior Dad"}
            className="w-full rounded-2xl border border-white/10 shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) {
      console.error(error);
      setMessage("This email may already be signed up.");
      return;
    }

    setEmail("");
    navigate("/newsletter-success");
  };

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

      <form
        onSubmit={handleNewsletterSubmit}
        className="mt-10 flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto"
      >
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-[#1b212b] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]"
          required
        />

        <button
          type="submit"
          className="bg-[#c8a96a] text-black px-10 py-5 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
        >
          Join The Mission
        </button>
      </form>

      {message && (
        <p className="mt-5 text-[#c8a96a] italic font-serif">{message}</p>
      )}
    </section>
  );
}

function Stat({ big, small }) {
  return (
    <div>
      <h4 className="text-[#c8a96a] uppercase text-3xl font-black">
        {big}
      </h4>

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