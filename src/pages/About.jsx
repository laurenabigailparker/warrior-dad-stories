import Navbar from "../components/layout/Navbar";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

function About() {
  const timeline = [
    ["1992", "Enlisted", "The journey begins."],
    ["1993", "82nd Airborne Division", "First duty assignment."],
    ["2001", "Towers Fell", "Deployed when everything changed."],
    ["2002", "First Combat Deployment", "Tested. Forged. Changed forever."],
    ["2006", "Became A Father", "The mission found its deepest purpose."],
    ["2017", "Last Combat Deployment", "Nine deployments. One calling."],
    ["2018", "Started Writing", "Stories written for his daughter."],
    ["2025", "Retired From The Army", "Trophy Husband and Author."],
    ["2025", "Warrior Dad Stories Founded", "A platform for veterans, dads, and storytellers."],
    ["2026", "Warrior Dad Book Launch", "The mission, bound in pages."],
  ];

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
      "Be Fit, Mind, Body, And Spirit",
      "Growth requires harmony across every part of life.",
    ],
    [
      "Live Life To Its Fullest",
      "Pursue purpose, service, adventure, and meaningful relationships.",
    ],
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-[620px] flex items-center justify-center text-center px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.55),
              rgba(0,0,0,0.62)
            ),
            url('/about-hero.jpg')
          `,
        }}
      >
        <div className="relative z-10 max-w-3xl">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
            The Man Behind The Mission
          </p>

        <h1 className="uppercase font-black leading-[0.95] tracking-wide text-5xl md:text-8xl">
  Warrior. <br />
  Father. <br />
  Storyteller.
</h1>

          <p className="mt-8 text-slate-300 italic font-serif text-2xl">
            Born from service. Built by love. Written for legacy.
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#202632] px-8 md:px-20 py-24 text-center relative">
        <div className="absolute left-10 top-16 text-8xl font-black text-slate-300/90">
          "
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-3xl md:text-4xl italic font-serif text-slate-200 leading-[1.7]">
            These stories were forged in uniform, strengthened by family,
            and written to help others lead with heart, purpose, and resilience.
          </p>

          <p className="mt-10 text-[#c8a96a] uppercase tracking-[0.3em] text-[11px]">
            — T.J. Baird, Warrior Dad
          </p>
        </div>
      </section>

      {/* story section */}
      <section className="bg-[#171b25] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="flex items-start gap-5">
              <div className="h-20 w-[4px] bg-[#c8a96a] mt-3" />

              <h2 className="uppercase font-black text-4xl md:text-5xl leading-tight max-w-md">
                "The Mission Doesn't End When You Come Home."
              </h2>
            </div>

            <div className="mt-10 h-[620px] rounded-sm bg-[#202632] border border-white/10 flex items-center justify-center">
              <span className="uppercase text-slate-500 tracking-[0.25em] text-xs">
                Story Image Placeholder
              </span>
            </div>
          </div>

          <div className="space-y-16">
            {[
              [
                "The Beginning",
                "TJ Baird didn't set out to become a storyteller. He set out to serve. Years in uniform taught him discipline, sacrifice, and responsibility — for the mission, for his team, and eventually, for something even more important: his family.",
              ],
              [
                "The Turn",
                "Becoming a father while serving changed everything. The mission evolved. The priorities shifted. Leadership became less about command and more about presence, love, and legacy.",
              ],
              [
                "The Mission",
                "TJ writes because there were stories that needed to come out — stories about duty, family, growth, sacrifice, and resilience. Warrior Dad Stories is where those stories live.",
              ],
              [
                "What's Next",
                "The mission continues through books, mentorship, storytelling, and community. The Creative Forge is being built for veterans, fathers, and creators who still have something meaningful to say.",
              ],
            ].map(([title, text]) => (
              <div key={title}>
                <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
                  {title}
                </p>

                <p className="text-slate-300 font-serif text-lg leading-10">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* timeline here */}
      <section className="bg-[#080a0f] px-8 md:px-20 py-32">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] text-center mb-24">
          The Timeline
        </p>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          <div className="space-y-28">
            {timeline.map(([year, title, text], index) => (
              <div
                key={year + title}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={`${
                    index % 2 === 0
                      ? "md:text-right md:pr-16"
                      : "md:text-left md:pl-16"
                  }`}
                >
                  <h3 className="text-[#c8a96a] text-5xl font-black uppercase">
                    {year}
                  </h3>

                  <h4 className="mt-3 uppercase text-2xl font-black">
                    {title}
                  </h4>

                  <p className="mt-3 text-slate-500 italic font-serif text-lg">
                    {text}
                  </p>
                </div>

                <div className="relative hidden md:block">
                  <div className="absolute top-1/2 left-1/2 h-4 w-4 rounded-full bg-[#c8a96a] -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the principles */}
      <section className="bg-[#1c222d] px-8 md:px-20 py-28">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] text-center mb-20">
          Guiding Principles
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
          {principles.map(([title, text]) => (
            <div key={title} className="flex gap-5">
              <div className="w-[3px] bg-[#c8a96a]" />

              <div>
                <h3 className="uppercase text-2xl font-black">{title}</h3>

                <p className="mt-4 text-slate-400 italic font-serif text-lg">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* speaking cta  */}
      <section className="bg-[#202632] px-8 md:px-20 py-28 text-center border-t border-white/5">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          Speaking · Media · Partnerships
        </p>

        <h2 className="mt-8 uppercase font-black text-5xl max-w-5xl mx-auto leading-tight">
          Bring The Warrior Dad Story To Your Audience
        </h2>

        <p className="mt-8 text-slate-400 italic font-serif text-xl">
          TJ is available for keynotes, podcast appearances, media features,
          and veteran-focused events.
        </p>

        <button className="mt-10 bg-[#c8a96a] text-black px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold">
          Get In Touch →
        </button>

        <div className="mt-16 flex flex-wrap justify-center gap-12 text-slate-500 uppercase tracking-[0.22em] text-[11px]">
          <span>Keynote Speaker</span>
          <span>Podcast Guest</span>
          <span>Media Appearances</span>
          <span>Veteran Events</span>
        </div>
      </section>

      {/* email */}
      <section className="bg-[#171b25] px-8 md:px-20 py-28 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          Join The Mission
        </p>

        <h2 className="mt-6 uppercase font-black text-5xl leading-tight">
          Get First Access
          <br />
          <span className="text-slate-400 text-3xl">
            + Free Companion Guide
          </span>
        </h2>

        <p className="mt-8 text-slate-400 italic font-serif text-xl">
          Join thousands of warriors and dads getting stories, inspiration,
          and early access.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-[#202632] border border-white/10 px-6 py-5 text-white outline-none"
          />

          <button className="bg-[#c8a96a] text-black px-10 py-5 uppercase tracking-[0.18em] text-[11px] font-bold">
            Join The Mission
          </button>
        </div>

        <p className="mt-5 text-xs text-slate-600">
          No spam. Unsubscribe anytime.
        </p>
      </section>

      {/* footer */}
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
    </main>
  );
}

export default About;