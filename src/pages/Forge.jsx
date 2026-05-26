import Navbar from "../components/layout/Navbar";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

function Forge() {
  const haikus = [
    "Steel and silk entwined Duty's weight and love's soft touch Both hands hold the same",
    "Boots beside her bed Mission complete, mission starts Home is the hard part",
    "Words in the margins Written between shifts and sleep Stories find their way",
  ];

  const odes = [
    ["Reforged: An Ode To The Journey Through Prep", "Award-Winning · 2025"],
    ["An Ode To The Daughter Who Watches", "Featured In Warrior Dad"],
    ["An Ode To The Quiet After Deployment", "Featured In Warrior Dad"],
  ];

  const moments = [
    "Morning coffee before the world wakes",
    "The walk that clears the mind",
    "Sunset — proof the day is done",
    "The page where stories live",
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[640px] flex items-center justify-center text-center px-8 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,.62), rgba(0,0,0,.72)),
            url('/forge-hero.jpg')
          `,
        }}
      >
        <div className="max-w-4xl">
          <div className="mx-auto mb-8 h-16 w-16 bg-[#c8a96a]" />

          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            The Creative Forge
          </p>

          <h1 className="uppercase font-black text-6xl md:text-8xl leading-[0.95]">
            Where Stories <br />
            Are Forged
          </h1>

          <p className="mt-10 max-w-3xl mx-auto text-slate-300 italic font-serif text-2xl leading-10">
            This is the heart of Warrior Dad Stories. The place where words are
            forged in reflection, shaped by experience, and given to those who
            need them most.
          </p>

          <p className="mt-12 text-slate-400 uppercase tracking-[0.3em] text-[11px]">
            🔥 Heat. Pressure. Purpose.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#1c222d] px-8 md:px-20 py-28 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
          The Powerhouse Behind The Platform
        </p>

        <h2 className="uppercase font-black text-5xl md:text-6xl leading-tight">
          Built In Fire. <br />
          Shaped By Pressure. <br />
          Given With Purpose.
        </h2>

        <p className="mt-10 max-w-5xl mx-auto text-slate-300 italic font-serif text-xl leading-9">
          The Creative Forge is where poetry, reflection, and storytelling meet.
          It's not a blog. It's not a journal. It's the raw work of finding words
          for what's hard to say — and offering them to others who need to hear it.
        </p>

        <p className="mt-10 max-w-4xl mx-auto text-slate-400 italic font-serif text-lg leading-9">
          This section is intentionally scaffolded. Students should refine spacing,
          replace visuals, and align this content more closely to the final Figma.
        </p>
      </section>

      {/* Haikus */}
      <section className="bg-[#101118] px-8 md:px-20 py-28 text-center">
        <p className="text-[#c8a96a] text-4xl mb-4">⌕</p>

        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
          Haikus
        </p>

        <h2 className="uppercase font-black text-5xl">
          Small Words, Big Weight
        </h2>

        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
          {haikus.map((haiku, index) => (
            <div
              key={index}
              className="bg-[#202632] rounded-lg border border-white/5 p-10 min-h-[190px] flex flex-col justify-center"
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

      {/* Odes */}
      <section className="bg-[#1c222d] px-8 md:px-20 py-28">
        <div className="text-center">
          <p className="text-[#c8a96a] text-4xl mb-4">✧</p>

          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
            Odes
          </p>

          <h2 className="uppercase font-black text-5xl">
            Stories Written To Last
          </h2>
        </div>

        <div className="max-w-6xl mx-auto mt-20 space-y-8">
          {odes.map(([title, tag]) => (
            <div
              key={title}
              className="bg-[#202632] rounded-lg border border-white/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <h3 className="uppercase font-black text-2xl">{title}</h3>

                <p className="mt-4 text-slate-400 italic font-serif text-lg">
                  Placeholder excerpt. Student should replace with final Figma
                  content and spacing.
                </p>
              </div>

              <span className="bg-[#c8a96a]/15 text-[#c8a96a] px-4 py-2 text-[10px] uppercase tracking-[0.22em] w-fit">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Moments Gallery */}
      <section className="bg-[#101118] px-8 md:px-20 py-28 text-center">
        <p className="text-[#c8a96a] text-4xl mb-4">♡</p>

        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
          Moments That Make Me Smile
        </p>

        <h2 className="uppercase font-black text-5xl">
          The Quiet Beauty Between The Missions
        </h2>

        <p className="mt-8 max-w-4xl mx-auto text-slate-400 italic font-serif text-xl">
          Not every moment needs weight. Some are just good. Simple. Worth
          remembering.
        </p>

        <div className="max-w-7xl mx-auto mt-20 grid md:grid-cols-4 gap-8">
          {moments.map((caption, index) => (
            <div
              key={caption}
              className="relative h-72 bg-[#202632] rounded-lg overflow-hidden border border-white/5 flex items-end"
            >
              <div className="absolute inset-0 flex items-center justify-center text-slate-600 uppercase tracking-[0.25em] text-xs">
                Image {index + 1}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <p className="relative z-10 p-5 text-left text-slate-200 italic font-serif">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Quote */}
      <section className="bg-[#202632] px-8 md:px-20 py-28 text-center relative">
        <div className="absolute left-12 top-14 text-8xl text-black/20 font-black">
          "
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

function Footer() {
  return (
    <footer className="bg-[#080a0f] px-8 md:px-20 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
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
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/forge">The Creative Forge</a>
          <a href="/contact">Contact</a>
        </div>

        <div>
          <div className="flex gap-5 text-slate-500 text-lg">
            <FaLinkedinIn />
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
          </div>

          <p className="mt-5 text-slate-500 text-sm flex gap-3 items-center">
            <HiOutlineMail />
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
  );
}

export default Forge;