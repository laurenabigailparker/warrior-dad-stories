import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

import { useState } from "react";

import { HiOutlineMail } from "react-icons/hi";

function Home() {
  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      {/* Top Banner */}
      <div className="h-10 bg-[#c8a96a] text-black flex items-center justify-center relative text-[11px] font-bold tracking-[0.18em] uppercase">
        <span className="flex items-center gap-2">
          <span>⚡</span> Warrior Dad launches May 23, 2026 — Pre-order now
        </span>
        <span className="absolute right-5 top-3">×</span>
      </div>

      {/* Navbar */}
      <nav className="h-24 bg-[#070707]/95 border-b border-white/5 flex items-center justify-between px-8 md:px-20">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 bg-slate-300" />
          <span className="text-[#c8a96a] uppercase tracking-[0.25em] font-bold text-sm">
            Warrior Dad Stories
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-9 text-[11px] uppercase tracking-[0.25em]">
  <Link to="/" className="text-[#c8a96a] hover:text-white transition">
    Home
  </Link>

  <Link to="/shop" className="hover:text-[#c8a96a] transition">
    Shop
  </Link>

  <Link to="/about" className="hover:text-[#c8a96a] transition">
    About
  </Link>

  <Link to="/blog" className="hover:text-[#c8a96a] transition">
    Blog
  </Link>

  <Link to="/forge" className="hover:text-[#c8a96a] transition">
    The Forge
  </Link>

  <Link to="/contact" className="hover:text-[#c8a96a] transition">
    Contact
  </Link>

  <Link
    to="/preorder"
    className="border border-[#c8a96a] text-[#c8a96a] px-6 py-3 hover:bg-[#c8a96a] hover:text-black transition"
  >
    Pre-Order
  </Link>

  <Link to="/shop" className="hover:text-[#c8a96a] transition">
    ▢
  </Link>
</div>
      </nav>

      {/* Hero */}
      {/* Hero */}
<section
  className="relative min-h-[760px] flex items-center px-8 md:px-20 overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(
        90deg,
        rgba(0,0,0,0.92) 0%,
        rgba(0,0,0,0.78) 32%,
        rgba(0,0,0,0.45) 58%,
        rgba(0,0,0,0.88) 100%
      ),
      url('/hero-bg.png')
    `,
  }}
>

        <div className="relative z-10 max-w-xl">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            ✦ Disabled Veteran-Owned · Book Launch 2026
          </p>

          <h1 className="uppercase font-black leading-[0.95] tracking-[0.04em] text-6xl md:text-8xl">
            Warrior <br />
            <span className="text-[#c8a96a]">Dad</span> <br />
            Stories
          </h1>

          <p className="mt-9 text-slate-400 italic font-serif text-lg leading-8">
            From the frontlines to the home front — stories forged in service,
            strengthened by love, and written for legacy.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-[#c8a96a] text-black px-8 py-4 text-[11px] uppercase tracking-[0.18em] font-bold">
              Pre-Order Now
            </button>
            <button className="border border-[#c8a96a] text-[#c8a96a] px-8 py-4 text-[11px] uppercase tracking-[0.18em]">
              Read A Sample →
            </button>
          </div>

          <div className="mt-10 flex items-center gap-3 text-[#c8a96a] text-sm">
            ★★★★★
            <span className="text-slate-500 text-xs">
              Praised by veterans & families
            </span>
          </div>
        </div>
      </section>

      {/* As Seen On */}
      <div className="h-16 bg-[#171b25] border-y border-white/5 px-8 md:px-20 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
          As Seen On
        </span>
       <div className="flex gap-6 text-slate-500 text-xs uppercase tracking-widest">
  <span>YT</span>
  <span>IG</span>
  <span>X</span>
  <span>IN</span>
</div>
        </div>

      {/* Three Text Columns */}
      {/* Three Text Columns */}
<section className="bg-[#101118] px-8 md:px-20 py-20 grid md:grid-cols-3 gap-12">
  {[
    [
      "Stories With Soul.",
      "Raw, honest narratives from the warrior experience — told without filter, written with purpose.",
    ],
    [
      "Leadership With Purpose.",
      "Lessons forged in service that apply at home, at work, and in every moment that matters.",
    ],
    [
      "Legacy Without Limits.",
      "Building something that outlasts the uniform — words that echo long after the mission ends.",
    ],
  ].map(([title, text], index) => (
    <div key={title}>
      <h3
        className={`uppercase text-3xl font-black tracking-wide ${
          index === 1 ? "text-[#c8a96a]" : "text-white"
        }`}
      >
        {title}
      </h3>

      <p className="mt-4 text-slate-400 italic font-serif leading-7">
        {text}
      </p>
    </div>
  ))}
</section>
      {/* Book Showcase */}
<section className="bg-[#171b25] px-8 md:px-20 py-28">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-[320px_1fr] gap-28 items-center">
    <div className="flex flex-col items-center">
      <div className="relative w-64">
        <img
          src="/book-cover.png"
          alt="Warrior Dad Book"
          className="w-full h-[390px] object-cover rounded-sm border border-white/10 shadow-2xl"
        />
      </div>

      <div className="mt-5 text-[#c8a96a]">★★★★★</div>
      <p className="text-xs text-slate-500">Hardcover + Ebook available</p>
    </div>

    <div>
      <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-4">
        The Book
      </p>

      <h2 className="text-5xl uppercase font-black tracking-wide">
        Warrior Dad
      </h2>

      <h3 className="text-3xl uppercase font-black text-slate-500 mt-2">
        A Collection of Odes
      </h3>

      <p className="mt-8 text-slate-300 font-serif text-lg leading-8 max-w-3xl">
        A raw, powerful collection of poetry that bridges the gap between battlefield
        and home, exploring the dual identity of warriors who fight abroad and love
        fiercely at home.
      </p>

      <div className="grid grid-cols-3 gap-8 mt-10">
        {[
          ["May 23", "Launch Date"],
          ["2 Formats", "Hardcover + Ebook"],
          ["120+ Pages", "Of Poetry"],
        ].map(([big, small]) => (
          <div key={big}>
            <h4 className="text-[#c8a96a] uppercase text-4xl font-black">
              {big}
            </h4>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-2">
              {small}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9 flex gap-4">
        <button className="bg-[#c8a96a] text-black px-10 py-4 text-[11px] uppercase tracking-[0.18em] font-bold">
          Pre-Order Hardcover
        </button>

        <button className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 text-[11px] uppercase tracking-[0.18em]">
          Get Ebook
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        Ships on launch day · Free companion guide included
      </p>
    </div>
  </div>
</section>

      {/* Video */}
      <section className="bg-[#1c222d] py-28 px-8">
        <SectionTitle eyebrow="Watch The Story" title="Warrior Dad — The Journey" />
        <div className="mt-12 max-w-5xl mx-auto h-[430px] bg-[#090a0f] rounded-md shadow-2xl border border-black flex items-center justify-center relative">
          <button className="h-20 w-20 rounded-full bg-[#c8a96a] text-black flex items-center justify-center text-2xl">
            ■
          </button>
          <div className="absolute bottom-8 left-8">
            <h4 className="uppercase text-xl font-black">Book Launch Trailer</h4>
            <p className="text-slate-400 italic font-serif mt-2">
              The making of Warrior Dad — from battlefield to bookshelf
            </p>
          </div>
        </div>
      </section>

      {/* Path Forward */}
      <section className="bg-[#101118] py-28 px-8">
        <SectionTitle eyebrow="Three Ways To Engage" title="Your Path Forward" />
        <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-6">
          {[
           ["▣", "Warrior Dad", "The Book", "A collection of odes forged in service and strengthened by love. Pre-order now for May 23 launch."],
["◇", "Companion Guide", "Free Download", "Go deeper into each poem with reflection prompts, discussion questions, and leadership insights."],
["⚒", "The Creative Forge", "Community Hub", "Resources, tools, and community for warrior storytellers and veteran creatives building legacy."],
          ].map(([icon, title, label, text]) => (
            <div key={title} className="bg-[#202632] border border-white/10 rounded-lg p-8">
              <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-[#c8a96a]">
                <span>{icon}</span>
              </div>
              <h3 className="mt-8 uppercase text-2xl font-black tracking-widest">
                {title}
              </h3>
              <p className="uppercase text-xs tracking-[0.25em] text-slate-500 mt-1">
                {label}
              </p>
              <p className="mt-5 text-slate-300 font-serif leading-7">
                {text}
              </p>
              <p className="mt-8 text-[#c8a96a] uppercase text-[11px] tracking-[0.22em]">
                Explore →
              </p>
            </div>
          ))}
        </div>
      </section>

   {/* Testimonials */}
<TestimonialsCarousel />


      {/* Email */}
      <section className="bg-[#171b25] py-28 px-8 text-center">
        <SectionTitle eyebrow="Join The Mission" title="Get First Access" subtitle="+ Free Companion Guide" />
        <p className="text-slate-400 italic font-serif mt-6">
          Join thousands of warriors and dads getting stories, inspiration, and early access.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <input
            placeholder="your@email.com"
            className="w-80 bg-[#202632] border border-white/10 px-5 py-4 text-sm outline-none"
          />
          <button className="bg-[#c8a96a] text-black px-8 py-4 text-[11px] uppercase tracking-[0.18em] font-bold">
            Join The Mission
          </button>
        </div>
      </section>

      {/* Author */}
      <section className="bg-[#101118] py-28 px-8 text-center">
        <SectionTitle eyebrow="Meet TJ" title="Warrior. Father. Storyteller." />
        <img
  src="/author.jpg"
  alt="TJ Warrior Dad"
  className="mx-auto mt-8 h-36 w-36 rounded-full object-cover border border-[#c8a96a] shadow-2xl"
/>
        <p className="max-w-3xl mx-auto mt-8 text-slate-300 italic font-serif leading-8">
          A disabled veteran turned storyteller, TJ bridges the gap between
          service and family, crafting words that honor both the warrior's
          calling and the father's devotion.
        </p>
        <button className="mt-8 border border-[#c8a96a] text-[#c8a96a] px-9 py-4 text-[11px] uppercase tracking-[0.18em]">
          Read The Full Story →
        </button>
      </section>

      {/* Instagram */}
      <section className="bg-[#171b25] py-28 px-8 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] flex items-center justify-center gap-3">
          <span>IG</span> Follow The Journey       </p>
        <h2 className="mt-5 text-5xl uppercase font-black">@TJWarriorDad</h2>
        <p className="text-slate-400 italic font-serif mt-4">
          Daily reflections, behind-the-scenes, and the warrior dad community
        </p>

        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-[#202632] border border-white/10 rounded-md flex items-center justify-center"
            >
              <div className="h-10 w-10 bg-slate-600/40" />
            </div>
          ))}
        </div>

        <button className="mt-10 border border-[#c8a96a] text-[#c8a96a] px-9 py-4 text-[11px] uppercase tracking-[0.18em]">
          Follow On Instagram →
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#080a0f] px-8 md:px-20 py-20 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-slate-300" />
              <span className="text-[#c8a96a] uppercase tracking-[0.22em] font-bold">
                Warrior Dad Stories
              </span>
            </div>
            <p className="mt-6 text-slate-500 italic font-serif">
              Stories forged in service, strengthened by love.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.25em] text-slate-400">
            <a>Home</a>
            <a>Shop</a>
            <a>About</a>
            <a>Blog</a>
            <a>The Creative Forge</a>
            <a>Contact</a>
          </div>

          <div>
          <div className="flex gap-5 text-slate-500 text-lg">
  <FaLinkedinIn className="hover:text-[#c8a96a] transition" />
  <FaFacebookF className="hover:text-[#c8a96a] transition" />
  <FaInstagram className="hover:text-[#c8a96a] transition" />
  <FaXTwitter className="hover:text-[#c8a96a] transition" />
</div>

<p className="mt-5 text-slate-500 text-sm flex gap-3 items-center">
  <HiOutlineMail className="text-base" />
  contact@warriordadstories.com
</p>
          </div>
        </div>
<div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex justify-between items-center text-slate-600 text-sm">
  <p>© 2026 Warrior Dad Stories</p>

  <div className="flex items-center gap-6">
    <p>A Disabled Veteran-Owned Business</p>

    <a
      href="/admin"
      className="uppercase tracking-[0.2em] hover:text-[#c8a96a] transition"
    >
      Admin
    </a>
  </div>
</div>
      </footer>
    </main>
  );
}

function TestimonialsCarousel() {
  const testimonials = [
    {
      quote:
        "This book captures what so many of us have felt but could never put into words. Each poem is a mirror reflecting both the weight of service and the beauty of being a father. Powerful, raw, and unforgettable.",
      name: "Marcus Thompson",
      role: "Combat Veteran, Father of Three",
    },
    {
      quote:
        "Warrior Dad is more than poetry — it is truth laid bare. It speaks to sacrifice, identity, and the quiet strength of fatherhood after service.",
      name: "James Holloway",
      role: "Retired Army Sergeant",
    },
    {
      quote:
        "Every page feels personal. These stories honor veterans while reminding fathers that vulnerability can still be strength.",
      name: "Daniel Reyes",
      role: "Marine Veteran & Mentor",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  return (
    <section className="bg-[#1c222d] py-28 px-8">
      <SectionTitle eyebrow="Critical Acclaim" title="Readers Are Moved." />

      <div className="max-w-4xl mx-auto mt-12 border-l-4 border-[#c8a96a] pl-8 transition-all duration-500">
        <p className="text-slate-300 italic font-serif text-xl leading-9">
          "{active.quote}"
        </p>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-slate-700" />

          <div>
            <p className="text-sm">{active.name}</p>
            <p className="text-xs text-slate-500">{active.role}</p>
            <p className="text-[#c8a96a] mt-2">★★★★★</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition ${
              activeIndex === index ? "bg-[#c8a96a]" : "bg-slate-600"
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center">
      <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-4">
        {eyebrow}
      </p>
      <h2 className="uppercase text-4xl md:text-5xl font-black tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <h3 className="uppercase text-2xl md:text-3xl font-black text-slate-500 mt-2">
          {subtitle}
        </h3>
      )}
    </div>
  );
}

export default Home;