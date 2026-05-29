import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Blog() {
  const categories = ["All", "Stories", "Leadership", "Fatherhood", "Veteran Life"];
  const [activeCategory, setActiveCategory] = useState("All");

  const posts = [
    {
      category: "Fatherhood",
      title: "The Turn: When The Mission Evolved",
      excerpt:
        "Becoming a father while serving changed everything. The mission did not end — it evolved.",
      date: "May 2026",
      read: "6 min read",
      image: "/fatherhood-journey.webp",
    },
    {
      category: "Leadership",
      title: "Discipline, Thought, Word, And Deed",
      excerpt:
        "Leadership is not only what we say in public. It is what we practice when no one is watching.",
      date: "May 2026",
      read: "5 min read",
      image: "/leadership-reflection.webp",
    },
    {
      category: "Veteran Life",
      title: "The Weight Of Coming Home",
      excerpt:
        "Everyone celebrates the homecoming. Fewer understand the quiet work of learning how to be home again.",
      date: "Apr 2026",
      read: "7 min read",
      image: "/the-weight-of-coming-home.webp",
    },
    {
      category: "Stories",
      title: "The Ode I Almost Did Not Write",
      excerpt:
        "Some stories live in your chest for years before you finally find the courage to give them words.",
      date: "Apr 2026",
      read: "4 min read",
      image: "/the-ode-i-almost-did-not-write.webp",
    },
    {
      category: "Fatherhood",
      title: "Bedtime Stories From Across The World",
      excerpt:
        "Phone calls, missed birthdays, and the small rituals that kept love alive across distance.",
      date: "Mar 2026",
      read: "5 min read",
      image: "/bedtime-across-the-world.webp",
    },
    {
      category: "Leadership",
      title: "Be Fit: Mind, Body, And Spirit",
      excerpt:
        "Growth requires more than endurance. It requires harmony across every part of life.",
      date: "Mar 2026",
      read: "5 min read",
      image: "/mind-body-spirit.webp",
    },
  ];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const tours = [
    [
      "May 23, 2026",
      "Warrior Dad Book Launch",
      "Launch day details coming soon",
      "Upcoming",
    ],
    [
      "June 2026",
      "Book Tour Dates",
      "Additional appearances being scheduled",
      "TBA",
    ],
  ];

  const podcasts = [
    ["Veterans Voices Podcast", "From Warrior to Writer", "Upcoming"],
    ["The Dad Edge", "Leadership At Home", "Scheduled"],
    ["Stories Of Service", "Legacy Through Storytelling", "Coming Soon"],
  ];

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      {/* HERO - keeping this clean so the filters actually make sense lol */}
      <section className="bg-[#171c25] px-8 md:px-20 py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            The Warrior Dad Blog
          </p>

          <h1 className="uppercase font-black text-5xl md:text-7xl leading-tight max-w-5xl">
            Lessons Written In Real Life.
          </h1>

          <p className="mt-8 max-w-4xl text-slate-300 italic font-serif text-xl leading-9">
            Words forged through service, fatherhood, resilience, and the quiet
            work of becoming who we were called to be.
          </p>

          {/* CATEGORY FILTERS - these now control the cards directly underneath */}
          <div className="mt-14 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 border text-[10px] uppercase tracking-[0.2em] transition ${
                  activeCategory === category
                    ? "border-[#c8a96a] text-[#c8a96a]"
                    : "border-white/10 text-slate-500 hover:border-[#c8a96a] hover:text-[#c8a96a]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST REFLECTIONS - moved this up so the buttons don't feel fake */}
      <section className="bg-[#11141b] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
              Latest Reflections
            </p>

            <h2 className="uppercase font-black text-5xl">
              From The Journey
            </h2>

            <p className="mt-6 text-slate-500 uppercase tracking-[0.25em] text-[11px]">
              Showing: {activeCategory}
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.title}
                  className="bg-[#202632] rounded-xl overflow-hidden border border-white/5 hover:border-[#c8a96a]/50 transition"
                >
                  <div className="h-56 bg-[#151922] relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-75"
                    />

                    <span className="absolute bottom-5 left-5 bg-black/70 text-[#c8a96a] px-3 py-2 text-[10px] uppercase tracking-[0.2em]">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-8">
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
          ) : (
            <div className="bg-[#202632] border border-white/5 rounded-xl p-12 text-center">
              <p className="text-slate-400 italic font-serif">
                No posts in this category yet — but the stories are coming.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED STORY */}
      <section className="bg-[#1a1f27] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto bg-[#202632] rounded-2xl overflow-hidden grid lg:grid-cols-[1.2fr_0.9fr] border border-white/5">
          <div className="min-h-[430px] bg-[#151922] relative">
            <img
              src="/what-the-uniform-taught-me-about-fatherhood.png"
              alt="Featured Warrior Dad story"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="bg-[#c8a96a]/15 text-[#c8a96a] px-3 py-2 text-[10px] uppercase tracking-[0.2em] w-fit">
              Fatherhood
            </span>

            <h2 className="mt-8 uppercase font-black text-4xl leading-tight">
              What The Uniform Taught Me About Fatherhood
            </h2>

            <p className="mt-8 text-slate-400 italic font-serif text-lg leading-8">
              There is a kind of discipline that comes from the field — and it
              looks nothing like the kind that works at home. Here is what had
              to be unlearned, rebuilt, and carried forward.
            </p>

            <p className="mt-8 text-slate-500 uppercase tracking-[0.2em] text-[10px]">
              TJ Baird · May 2026 · 6 min read
            </p>

            <Link
  to="/blog/the-uniform-taught-me-about-fatherhood"
  className="mt-10 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition w-fit inline-block"
>
  Read The Story
</Link>

</div>
</div>
</section>




      {/* STORY DIVIDER */}
<section
  className="relative py-48 bg-cover bg-center overflow-hidden"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(10,12,16,0.55),
        rgba(10,12,16,0.88)
      ),
      url('/some-stories-are-lived.webp')
    `,
  }}
>
  <div className="max-w-5xl mx-auto text-center px-8">
    <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
      Beyond The Page
    </p>

    <h2 className="uppercase font-black text-5xl md:text-7xl leading-[0.95]">
      Some Stories <br />
      Are Written.
    </h2>

    <h3 className="mt-8 text-[#c8a96a] uppercase font-black text-4xl md:text-5xl">
      Others Are Lived.
    </h3>

    <p className="mt-8 max-w-3xl mx-auto text-slate-300 italic font-serif text-xl leading-10">
      Warrior Dad Stories exists for the lessons carried through service,
      fatherhood, leadership, and the quiet moments that shape us.
    </p>
  </div>
</section>

      {/* PODCASTS */}
      <section className="bg-[#11141b] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            Podcasts & Media
          </p>

          <h2 className="uppercase font-black text-4xl md:text-5xl">
            Listen To TJ’s Story
          </h2>

          <p className="mt-8 max-w-3xl text-slate-400 italic font-serif text-xl leading-9">
            Upcoming and completed conversations about service, storytelling,
            fatherhood, leadership, and legacy.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {podcasts.map(([title, subtitle, status]) => (
              <div
                key={title}
                className="bg-[#202632] border border-white/5 rounded-xl p-8 hover:border-[#c8a96a]/50 transition"
              >
                <h3 className="uppercase font-black text-xl">{title}</h3>

                <p className="mt-4 text-slate-500 italic font-serif">
                  {subtitle}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-slate-500 uppercase tracking-[0.2em] text-[10px]">
                    {status}
                  </span>

                  <span className="text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
                    Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK TOURS */}
      <section className="bg-[#1a1f27] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
            Book Tours
          </p>

          <h2 className="uppercase font-black text-4xl md:text-5xl">
            Bringing Warrior Dad Stories To Your Community
          </h2>

          <p className="mt-8 max-w-4xl text-slate-400 italic font-serif text-xl leading-9">
            Book tours, readings, veteran events, and community appearances will
            help carry the mission beyond the page.
          </p>

          <div className="mt-14 grid md:grid-cols-2 gap-8">
            {tours.map(([date, title, location, status]) => (
              <div
                key={title}
                className="bg-[#202632] border border-white/5 rounded-xl p-8 hover:border-[#c8a96a]/50 transition"
              >
                <div className="flex justify-between gap-6">
                  <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                    {date}
                  </p>

                  <span className="bg-white/5 text-slate-400 px-3 py-2 text-[10px] uppercase tracking-[0.2em] h-fit">
                    {status}
                  </span>
                </div>

                <h3 className="mt-8 uppercase font-black text-2xl">{title}</h3>

                <p className="mt-4 text-slate-500 italic font-serif">
                  {location}
                </p>
              </div>
            ))}
          </div>

<p className="mt-10 text-center text-slate-500 italic font-serif">
  More dates will be announced as events are confirmed.
</p>

        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#202632] px-8 md:px-20 py-28 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          Join The Journey
        </p>

        <h2 className="mt-6 uppercase font-black text-5xl">
          Stay Connected To The Journey
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-slate-400 italic font-serif text-xl leading-9">
          Reflections, book updates, podcasts, speaking news, and leadership
          lessons from Warrior Dad Stories.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-[#151922] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]"
          />

          <button className="bg-[#c8a96a] text-black px-10 py-5 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition">
            Subscribe
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Blog;