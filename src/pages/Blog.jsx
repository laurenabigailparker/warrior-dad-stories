import Navbar from "../components/layout/Navbar";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

function Blog() {
  const tourCards = [
    {
      date: "May 24, 2026",
      title: "Launch Day Reading & Signing",
      location: "Fort Liberty, NC",
      status: "Confirmed",
    },
    {
      date: "June 2026",
      title: "Tour Dates Being Scheduled",
      location: "Coming Soon",
      status: "TBA",
    },
  ];

  const mediaCards = [
    {
      title: "Veterans Voices Podcast",
      subtitle: "From Warrior to Writer",
      date: "May 2026",
      action: "Listen Now →",
    },
    {
      title: "The Dad Edge",
      subtitle: "Leadership at Home",
      date: "Coming Soon",
      action: "Scheduled →",
    },
    {
      title: "Stories of Service",
      subtitle: "The Turn",
      date: "Coming Soon",
      action: "Scheduled →",
    },
  ];

  const posts = [
    {
      category: "Stories",
      title: "The Ode I Almost Didn't Write",
      excerpt:
        "Some stories demand to be told. This one lived in my chest for three years before I found the words.",
      date: "Apr 2026",
      read: "4 min read",
    },
    {
      category: "Leadership",
      title: "Leading When You're Running On Empty",
      excerpt:
        "Leadership is easy when the mission is clear and the team is full. What happens when neither is true?",
      date: "Apr 2026",
      read: "5 min read",
    },
    {
      category: "Veteran Life",
      title: "The Weight Of Coming Home",
      excerpt:
        "Everyone celebrates the homecoming. Nobody talks about what happens when the door closes.",
      date: "Mar 2026",
      read: "7 min read",
    },
    {
      category: "Stories",
      title: "On Writing In The Margins",
      excerpt:
        "I wrote most of this book in fifteen-minute windows. Between shifts, after bedtime, before the world woke.",
      date: "Mar 2026",
      read: "3 min read",
    },
    {
      category: "Fatherhood",
      title: "The Mission Statement Every Dad Needs",
      excerpt:
        "You had orders in the field. Do you have a mission for your home? Here is how I built mine.",
      date: "Feb 2026",
      read: "5 min read",
    },
    {
      category: "Leadership",
      title: "Resilience Is Not What You Think",
      excerpt:
        "It isn't about not breaking. It's about what you build after you do.",
      date: "Feb 2026",
      read: "4 min read",
    },
    {
      category: "Veteran Life",
      title: "A Letter To My Younger Self In Uniform",
      excerpt:
        "If I could send a message back to the kid who raised his right hand for the first time.",
      date: "Jan 2026",
      read: "6 min read",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      <Navbar />

      {/* Blog Header */}
      <section className="bg-[#171b25] px-8 md:px-20 py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
              The Warrior Dad Blog
            </p>

            <h1 className="uppercase font-black text-5xl md:text-6xl leading-tight">
              Stories. Reflections. Leadership.
            </h1>

            <p className="mt-6 text-slate-400 italic font-serif text-lg">
              Words forged in service. Written for legacy.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {["All", "Stories", "Leadership", "Fatherhood", "Veteran Life"].map(
              (filter, index) => (
                <button
                  key={filter}
                  className={`px-5 py-3 border text-[10px] uppercase tracking-[0.2em] transition ${
                    index === 0
                      ? "border-[#c8a96a] text-[#c8a96a]"
                      : "border-white/10 text-slate-500 hover:border-[#c8a96a] hover:text-[#c8a96a]"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Book Tours */}
      <section className="bg-[#1c222d] px-8 md:px-20 py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            Book Tours
          </p>

          <h2 className="uppercase font-black text-4xl md:text-5xl">
            Bringing Warrior Dad Stories To Your Community
          </h2>

          <p className="mt-8 max-w-4xl text-slate-400 italic font-serif text-lg leading-8">
            Book tour dates and events coming soon. TJ is available for signings,
            readings, and veteran-focused community events.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {tourCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#202632] rounded-lg border border-white/5 p-8 relative"
              >
                <span className="absolute top-8 right-8 bg-white/5 text-slate-400 px-3 py-2 text-[10px] uppercase tracking-[0.2em]">
                  {card.status}
                </span>

                <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                  {card.date}
                </p>

                <h3 className="mt-8 uppercase font-black text-2xl">
                  {card.title}
                </h3>

                <p className="mt-4 text-slate-500 italic font-serif">
                  {card.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="bg-[#101118] px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            Podcasts & Media
          </p>

          <h2 className="uppercase font-black text-4xl">Listen To TJ's Story</h2>

          <p className="mt-8 text-slate-400 italic font-serif text-lg">
            Recent and upcoming podcast appearances, interviews, and media
            features.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {mediaCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#202632] rounded-lg border border-white/5 p-8"
              >
                <h3 className="uppercase font-black text-xl">{card.title}</h3>

                <p className="mt-4 text-slate-500 italic font-serif">
                  {card.subtitle}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px]">
                    {card.date}
                  </p>

                  <button className="text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
                    {card.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Story */}
          <div className="mt-28 bg-[#202632] rounded-lg overflow-hidden grid lg:grid-cols-[1.3fr_0.9fr] border border-white/5">
            <div className="min-h-[380px] bg-slate-700/70 flex items-center justify-center">
              <span className="uppercase tracking-[0.25em] text-xs text-slate-400">
                Featured Image
              </span>
            </div>

            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="bg-green-900/40 text-green-500 px-3 py-2 text-[10px] uppercase tracking-[0.2em] w-fit">
                Fatherhood
              </span>

              <h2 className="mt-8 uppercase font-black text-4xl leading-tight">
                What The Uniform Taught Me About Fatherhood
              </h2>

              <p className="mt-8 text-slate-400 italic font-serif text-lg leading-8">
                There's a kind of discipline that comes from the field — and it
                looks nothing like the kind that works at home. Here's what I had
                to unlearn.
              </p>

              <p className="mt-8 text-slate-500 uppercase tracking-[0.2em] text-[10px]">
                TJ Baird · May 2026 · 6 min read
              </p>

              <button className="mt-10 text-left text-slate-300 uppercase tracking-[0.25em] text-[11px]">
                Read The Story →
              </button>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.title}
                className="bg-[#202632] rounded-lg overflow-hidden border border-white/5"
              >
                <div className="h-56 bg-slate-700/70 relative flex items-center justify-center">
                  <span className="absolute bottom-5 left-5 bg-green-900/40 text-green-500 px-3 py-2 text-[10px] uppercase tracking-[0.2em]">
                    {post.category}
                  </span>

                  <span className="uppercase text-slate-500 tracking-[0.25em] text-xs">
                    Image {index + 1}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="uppercase font-black text-2xl leading-tight">
                    {post.title}
                  </h3>

                  <p className="mt-5 text-slate-400 italic font-serif leading-7">
                    {post.excerpt}
                  </p>

                  <div className="mt-7 pt-5 border-t border-white/10 flex justify-between items-center">
                    <p className="text-slate-500 uppercase tracking-[0.18em] text-[10px]">
                      {post.date} · {post.read}
                    </p>

                    <button className="text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
                      Read →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-20 bg-[#202632] border border-white/10 rounded-lg px-8 md:px-12 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-3">
                Join The Mission
              </p>

              <h2 className="uppercase font-black text-3xl">
                Get New Stories In Your Inbox
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-[#171b25] border border-white/10 px-6 py-5 text-white outline-none w-full lg:w-96"
              />

              <button className="bg-[#c8a96a] text-black px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
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

export default Blog;