import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";
import GuidingPrinciples from "../components/GuidingPrinciples";

function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [featuredPodcasts, setFeaturedPodcasts] = useState([]);
const [featuredBingo, setFeaturedBingo] = useState(null);
const [expandedPodcast, setExpandedPodcast] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }  

      setPosts(data || []);
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
  const fetchFeaturedPodcasts = async () => {
    const { data, error } = await supabase
      .from("podcasts")
      .select("*")
      .eq("featured", true)
      .limit(6);

    if (error) {
      console.error(error);
      return;
    }

    setFeaturedPodcasts(data || []);
  };

  fetchFeaturedPodcasts();
}, []);

useEffect(() => {
  const fetchFeaturedBingo = async () => {
    const { data, error } = await supabase
      .from("forge_entries")
      .select("*")
      .eq("entry_type", "bingo")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    setFeaturedBingo(data);
  };

  fetchFeaturedBingo();
}, []);


const filteredPosts =
  activeCategory === "All"
    ? posts
    : posts.filter((post) => post.category === activeCategory);

const categories = [
  "All",
  ...new Set(posts.map((post) => post.category).filter(Boolean)),
];



  const tours = [
  [
    "Published",
    "Warrior Dad",
    "Now available on Amazon and through Warrior Dad Stories.",
    "Available",
  ],
  [
    "Now Booking",
    "Speaking & Community Events",
    "Available for veteran events, leadership discussions, book signings, and community appearances.",
    "Booking",
  ],
];

  

const handleNewsletterSubmit = async (e) => {
  e.preventDefault();

  const cleanEmail = email.trim().toLowerCase();

  const { error } = await supabase.from("newsletter_subscribers").insert([
    {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: cleanEmail,
    },
  ]);

  if (error) {
    console.error(error);
    setMessage("This email may already be signed up.");
    return;
  }

  try {
    await fetch("/api/subscribe-mailchimp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: cleanEmail,
      }),
    });
  } catch (error) {
    console.error("Mailchimp sync failed:", error);
  }

  setFirstName("");
  setLastName("");
  setEmail("");
  setMessage("Thank you for joining the mission.");
};

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

     <section className="bg-[#171c25] px-8 md:px-20 py-28 border-b border-white/5">
  <div className="max-w-7xl mx-auto">
    <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
      Perspectives & Conversations
    </p>

    <h1 className="uppercase font-black text-5xl md:text-7xl leading-tight max-w-5xl">
      Reflections. Conversations. Stories.
    </h1>

    <p className="mt-8 max-w-4xl text-slate-300 italic font-serif text-xl leading-9">
      Articles, podcasts, conversations, and reflections forged through service,
      fatherhood, leadership, and the moments that shape our legacy.
    </p>

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
                  key={post.id}
                  className="bg-[#202632] rounded-xl overflow-hidden border border-white/5 hover:border-[#c8a96a]/50 transition"
                >
                  <div className="h-56 bg-[#151922] relative">
                    <img
                      src={post.featured_image || "/warrior-dad-reflections.webp"}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-75"
                    />

                    <span className="absolute bottom-5 left-5 bg-black/70 text-[#c8a96a] px-3 py-2 text-[10px] uppercase tracking-[0.2em]">
                      Blog Post
                    </span>
                  </div>

                  
                <div className="p-8">
  <p className="text-[#c8a96a] uppercase tracking-[0.2em] text-[10px] mb-3">
    {post.category || "Blog"}
  </p>

  <h3 className="uppercase font-black text-2xl leading-tight">
    {post.title}
  </h3>
                    <p className="mt-5 text-slate-400 italic font-serif leading-7">
                      {post.excerpt}
                    </p>

                    <div className="mt-7 pt-5 border-t border-white/10 flex justify-between items-center">
                      <p className="text-slate-500 uppercase tracking-[0.18em] text-[10px]">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-[#202632] border border-white/5 rounded-xl p-12 text-center">
              <p className="text-slate-400 italic font-serif">
                No published posts yet — but the stories are coming.
              </p>
            </div>
          )}
        </div>
      </section>

    {featuredBingo && (
  <section className="bg-[#1a1f27] px-8 md:px-20 py-28">
    <div className="max-w-7xl mx-auto bg-[#202632] rounded-2xl overflow-hidden grid lg:grid-cols-[1.2fr_0.9fr] border border-white/5">
      <div className="min-h-[430px] bg-[#151922] relative">
        <img
          src={
            featuredBingo.featured_image ||
            featuredBingo.artwork_image ||
            "/warrior-dad-reflections.webp"
          }
          alt={featuredBingo.title}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="p-10 md:p-14 flex flex-col justify-center">
        <span className="bg-[#c8a96a]/15 text-[#c8a96a] px-3 py-2 text-[10px] uppercase tracking-[0.2em] w-fit">
          Warrior Dad Bingo
        </span>

        <h2 className="mt-8 uppercase font-black text-4xl leading-tight">
          {featuredBingo.title}
        </h2>

        <p className="mt-8 text-slate-400 italic font-serif text-lg leading-8">
          {featuredBingo.excerpt || "Monthly Warrior Dad Bingo card."}
        </p>

        <p className="mt-8 text-slate-500 uppercase tracking-[0.2em] text-[10px]">
          TJ Baird · Monthly Feature
        </p>
<Link
  to="/bingo"
  className="mt-10 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition w-fit inline-block"
>
  View Bingo Cards
</Link>
      </div>
    </div>
  </section>
)}

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
          {featuredPodcasts.map((podcast) => (
              <div
               key={podcast.id}
                className="bg-[#202632] border border-white/5 rounded-xl p-8 hover:border-[#c8a96a]/50 transition"
              >

                {podcast.image_url && (
  <img
    src={podcast.image_url}
    alt={podcast.title}
    className="w-full h-48 object-cover rounded-lg mb-6"
  />
)}

                <h3 className="uppercase font-black text-xl">{podcast.title}</h3>

                <p className="mt-4 text-slate-500 italic font-serif leading-7">
  {expandedPodcast === podcast.id
    ? podcast.description
    : `${podcast.description?.slice(0, 180) || ""}${
        podcast.description?.length > 180 ? "..." : ""
      }`}
</p>

{podcast.description?.length > 180 && (
  <button
    onClick={() =>
      setExpandedPodcast(
        expandedPodcast === podcast.id ? null : podcast.id
      )
    }
    className="mt-4 text-[#c8a96a] uppercase tracking-[0.2em] text-[10px] hover:text-white transition"
  >
    {expandedPodcast === podcast.id
      ? "Read Less"
      : "Read More"}
  </button>
)}

   <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
  <span className="text-slate-500 uppercase tracking-[0.2em] text-[10px]">
  {podcast.platform || "Podcast"}
</span>

  <a
    href={podcast.url}
    target="_blank"
    rel="noreferrer"
    className="text-[#c8a96a] uppercase tracking-[0.2em] text-[10px] hover:text-white transition"
  >
    Listen →
  </a>

                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto">
   <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
  Appearances & Events
</p>

<h2 className="uppercase font-black text-4xl md:text-5xl">
  Beyond The Book
</h2>

<p className="mt-8 max-w-4xl text-slate-400 italic font-serif text-xl leading-9">
  Warrior Dad continues through speaking engagements, veteran events,
  leadership discussions, community appearances, and the stories still being written.
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
  Interested in hosting TJ for a speaking engagement, veteran event, or community appearance? Contact Warrior Dad Stories for booking information.
</p>
        </div>
      </section>

      <section className="bg-[#202632] px-8 md:px-20 py-28 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          Join The Mission
        </p>

        <h2 className="mt-6 uppercase font-black text-5xl">
          Stay Connected To The Journey
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-slate-400 italic font-serif text-xl leading-9">
          Reflections, book updates, podcasts, speaking news, and leadership
          lessons from Warrior Dad Stories.
        </p>

        <form
  onSubmit={handleNewsletterSubmit}
  className="mt-10 grid md:grid-cols-[1fr_1fr_1.4fr_auto] gap-4 justify-center max-w-5xl mx-auto"
>
  <input
    type="text"
    placeholder="First Name"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    className="bg-[#151922] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]"
    required
  />

  <input
    type="text"
    placeholder="Last Name"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    className="bg-[#151922] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]"
    required
  />

  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="bg-[#151922] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]"
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
  <p className="mt-5 text-[#c8a96a] italic font-serif">
    {message}
  </p>
)}
      </section>

<GuidingPrinciples />

      <Footer />
    </main>
  );
}

export default Blog;