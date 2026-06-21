import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function AdminDash() {
  const [submissions, setSubmissions] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const [
        submissionsResult,
        blogResult,
        productsResult,
        timelineResult,
        testimonialsResult,
        socialLinksResult,
        podcastsResult,
      ] = await Promise.all([
        supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("blog_posts").select("*"),
        supabase.from("products").select("*"),
        supabase.from("timeline_events").select("*"),
        supabase.from("testimonials").select("*"),
        supabase.from("social_links").select("*"),
        supabase.from("podcasts").select("*"),
      ]);

      if (submissionsResult.error) console.error(submissionsResult.error);
      if (blogResult.error) console.error(blogResult.error);
      if (productsResult.error) console.error(productsResult.error);
      if (timelineResult.error) console.error(timelineResult.error);
      if (testimonialsResult.error) console.error(testimonialsResult.error);
      if (socialLinksResult.error) console.error(socialLinksResult.error);
      if (podcastsResult.error) console.error(podcastsResult.error);

      setSubmissions(submissionsResult.data || []);
      setBlogPosts(blogResult.data || []);
      setProducts(productsResult.data || []);
      setTimelineEvents(timelineResult.data || []);
      setTestimonials(testimonialsResult.data || []);
      setSocialLinks(socialLinksResult.data || []);
      setPodcasts(podcastsResult.data || []);

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const mediaCount = products.filter((product) => product.image).length;
  const activeProducts = products.filter((product) => product.in_stock).length;
  const featuredTestimonials = testimonials.filter((item) => item.featured).length;
  const publishedTimelineEvents = timelineEvents.filter((item) => item.published).length;
  const publishedPosts = blogPosts.filter((post) => post.published).length;

  const stats = [
    {
      icon: "▤",
      label: "Blog Posts",
      value: blogPosts.length,
      subtext: `${publishedPosts} published`,
    },
    {
      icon: "▣",
      label: "Products",
      value: products.length,
      subtext: `${activeProducts} active`,
    },
    {
      icon: "▧",
      label: "Media Files",
      value: mediaCount,
      subtext: "Product images",
    },
    {
      icon: "★",
      label: "Featured Reviews",
      value: featuredTestimonials,
      subtext: "Homepage testimonials",
    },
    {
      icon: "◉",
      label: "Published Posts",
      value: publishedPosts,
      subtext: "Live articles",
    },
    {
      icon: "◈",
      label: "Timeline Events",
      value: timelineEvents.length,
      subtext: `${publishedTimelineEvents} published`,
    },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080a0f] text-white flex items-center justify-center">
        <div className="bg-[#202632] border border-white/5 rounded-xl p-10 text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[10px]">
            Warrior Dad Stories
          </p>

          <h2 className="mt-4 text-3xl font-black uppercase">
            Loading Dashboard...
          </h2>

          <p className="mt-4 text-slate-500 italic font-serif">
            Pulling the latest content and analytics.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] rounded-xl overflow-hidden border border-white/5">
        <AdminTop title="Admin Dashboard" handleLogout={handleLogout} />

        <section className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[10px] mb-3">
                Warrior Dad Stories CMS
              </p>

              <h2 className="uppercase text-3xl md:text-4xl font-black tracking-widest">
                Dashboard
              </h2>

              <div className="mt-6 bg-[#202632] border border-white/5 rounded-xl p-6">
                <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[10px]">
                  Welcome Back
                </p>

                <h3 className="mt-3 text-2xl font-black">TJ Baird</h3>

                <p className="mt-3 text-slate-500 italic font-serif">
                  Manage products, blog content, testimonials, media, and timeline events
                  from your Warrior Dad Stories command center.
                </p>

                <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-400">
                  <span>{products.length} Products</span>
                  <span>{blogPosts.length} Posts</span>
                  <span>{timelineEvents.length} Events</span>
                  <span>{testimonials.length} Testimonials</span>
                </div>
              </div>

              <p className="mt-4 text-slate-500 italic font-serif">
                Manage products, media, timeline events, testimonials, and site
                settings from one place.
              </p>
            </div>

            <Link
              to="/"
              className="bg-[#c8a96a] text-black px-6 py-4 uppercase tracking-[0.18em] text-[11px] font-bold text-center hover:bg-white transition"
            >
              View Live Site
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="grid xl:grid-cols-[1fr_360px] gap-8 mt-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="uppercase text-2xl font-black tracking-widest">
                  Recent Messages
                </h2>

                <p className="text-slate-600 uppercase tracking-[0.2em] text-[10px]">
                  {submissions.length} total
                </p>
              </div>

              <div className="bg-[#202632] rounded-xl border border-white/5 overflow-hidden">
                {submissions.length === 0 ? (
                  <p className="p-8 text-slate-500 italic font-serif">
                    No messages yet.
                  </p>
                ) : (
                  <div className="divide-y divide-white/5">
                    {submissions.slice(0, 4).map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div>
                            <h3 className="uppercase font-black text-lg">
                              {item.name}
                            </h3>

                            <p className="text-[#c8a96a] text-sm mt-1">
                              {item.email}
                            </p>
                          </div>

                          <p className="uppercase tracking-[0.2em] text-[10px] text-slate-500">
                            {item.inquiry_type || "General"}
                          </p>
                        </div>

                        <p className="mt-4 text-slate-300 italic font-serif leading-7 line-clamp-2">
                          {item.message}
                        </p>

                        <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="uppercase text-2xl font-black tracking-widest">
                  Recent Blog Posts
                </h2>

                <Link
                  to="/admin/blog"
                  className="text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]"
                >
                  Manage Posts →
                </Link>
              </div>

              <div className="bg-[#202632] rounded-xl border border-white/5 overflow-hidden">
                {blogPosts.length === 0 ? (
                  <p className="p-8 text-slate-500 italic font-serif">
                    No blog posts yet.
                  </p>
                ) : (
                  <div className="divide-y divide-white/5">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="p-6 flex justify-between gap-6">
                        <div>
                          <h3 className="uppercase font-black text-lg">
                            {post.title}
                          </h3>

                          <p className="mt-2 text-slate-500 italic font-serif line-clamp-2">
                            {post.excerpt || "No excerpt yet."}
                          </p>
                        </div>

                        <span
                          className={`h-fit px-3 py-2 text-[10px] uppercase ${
                            post.published
                              ? "bg-[#2b342d] text-green-600"
                              : "bg-[#34302b] text-[#c8a96a]"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <MiniPanel title="Publishing Snapshot">
                <SnapshotRow label="Timeline Events" value={timelineEvents.length} />
                <SnapshotRow label="Published Timeline" value={publishedTimelineEvents} />
                <SnapshotRow label="Testimonials" value={testimonials.length} />
                <SnapshotRow label="Featured Reviews" value={featuredTestimonials} />
              </MiniPanel>

              <MiniPanel title="Quick Actions">
                <QuickLink to="/admin/products/new" label="+ New Product" />
                <QuickLink to="/admin/blog/new" label="+ New Blog Post" />
                <QuickLink to="/admin/timeline" label="Manage Timeline" />
                <QuickLink to="/admin/testimonials" label="Manage Testimonials" />
              </MiniPanel>
            </aside>
          </div>

     {/* HOME */}
<h2 className="uppercase text-xl font-black tracking-widest mt-14 mb-6">
  Home
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  <AdminCard href="/admin/home-content" icon="🏠" title="Home Page" desc="Edit homepage content" meta="CMS" />
  <AdminCard href="/admin/principles" icon="🧭" title="Four Life Principles" desc="Edit principles sitewide" meta="Global" />
</div>

{/* ABOUT */}
<h2 className="uppercase text-xl font-black tracking-widest mt-14 mb-6">
  About
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  <AdminCard href="/admin/about" icon="👤" title="TJ Page" desc="Edit TJ content" meta="Content" />
  <AdminCard href="/admin/timeline" icon="📅" title="TJ Timeline" desc="Manage TJ timeline" meta={`${timelineEvents.length} Events`} />
  <AdminCard href="/admin/about-carousel" icon="👨‍👩‍👧‍👦" title="TJ Carousel" desc="Manage TJ photos" meta="CMS" />

  <AdminCard href="/admin/derek" icon="👥" title="Derek Page" desc="Edit Derek content" meta="Content" />
  <AdminCard href="/admin/derek-timeline" icon="📅" title="Derek Timeline" desc="Manage Derek timeline" meta="Timeline" />
  <AdminCard href="/admin/derek-carousel" icon="🖼️" title="Derek Carousel" desc="Manage Derek photos" meta="CMS" />
</div>

{/* STORIES & MEDIA */}
<h2 className="uppercase text-xl font-black tracking-widest mt-14 mb-6">
  Stories & Media
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  <AdminCard href="/admin/blog" icon="▤" title="Blog Posts" desc="Manage articles" meta={`${blogPosts.length} Posts`} />
  <AdminCard href="/admin/podcasts" icon="🎙" title="Podcasts" desc="Manage podcast appearances" meta={`${podcasts.length} Episodes`} />
  <AdminCard href="/admin/books" icon="📚" title="Books" desc="Manage books" meta="Content" />
  <AdminCard href="/admin/bingo" icon="🎯" title="Warrior Dad Bingo" desc="Manage monthly cards" meta="Monthly" />
</div>

{/* THE FORGE */}
<h2 className="uppercase text-xl font-black tracking-widest mt-14 mb-6">
  The Forge
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  <AdminCard href="/admin/forge" icon="🔥" title="Forge Page" desc="Edit Forge messaging" meta="Content" />
  <AdminCard href="/admin/forge-entries" icon="✍️" title="Forge Entries" desc="Manage poems and reflections" meta="CMS" />
  <AdminCard href="/admin/reflections" icon="📸" title="Moments Carousel" desc="Manage smile moments" meta="CMS" />
</div>

{/* SHOP */}
<h2 className="uppercase text-xl font-black tracking-widest mt-14 mb-6">
  Shop
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  <AdminCard href="/admin/products" icon="🛒" title="Products" desc="Manage merchandise" meta={`${products.length} Items`} />
</div>

{/* COMMUNITY */}
<h2 className="uppercase text-xl font-black tracking-widest mt-14 mb-6">
  Community
</h2>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  <AdminCard href="/admin/testimonials" icon="💬" title="Testimonials" desc="Manage testimonials" meta={`${testimonials.length} Reviews`} />
  <AdminCard href="/admin/book-journey" icon="📘" title="Book Journey" desc="Manage event photos" meta="CMS" />
  <AdminCard href="/admin/newsletter" icon="✉️" title="Newsletter" desc="View subscribers" meta="Mailchimp" />
</div>


        

          <h2 className="uppercase text-2xl font-black tracking-widest mt-14 mb-8">
            Marketing & Community
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AdminCard href="/admin/newsletter" icon="✉️" title="Newsletter" desc="View mission subscribers" meta="Subscribers" />
            <AdminCard href="/admin/socials" icon="🌐" title="Social Links" desc="Manage public social and platform links" meta={`${socialLinks.length} Links`} />
          </div>

          <h2 className="uppercase text-2xl font-black tracking-widest mt-14 mb-8">
            Site Administration
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AdminCard href="/admin/media" icon="🖼️" title="Media Library" desc="View and manage uploaded media" meta={`${mediaCount} Files`} />
            <AdminCard href="/admin/settings" icon="⚙️" title="Site Settings" desc="Update footer, contact, and site-wide settings" meta="Global Settings" />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, subtext }) {
  return (
    <div className="bg-[#202632] rounded-xl p-7 border border-white/5 hover:border-[#c8a96a]/50 transition">
      <div className="flex items-center justify-between">
        <p className="text-[#c8a96a] text-3xl">{icon}</p>

        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
          Live
        </span>
      </div>

      <p className="mt-8 uppercase tracking-[0.25em] text-[10px] text-slate-500">
        {label}
      </p>

      <h3 className="mt-4 text-5xl font-black">{value}</h3>

      <p className="mt-4 text-slate-500 italic font-serif text-sm">
        {subtext}
      </p>
    </div>
  );
}

function AdminCard({ href, icon, title, desc, meta }) {
  return (
    <Link
      to={href}
      className="bg-[#202632] rounded-xl p-8 min-h-[220px] hover:border-[#c8a96a]/70 border border-white/5 transition group"
    >
      <div className="flex items-center justify-between">
        <p className="text-[#c8a96a] text-4xl">{icon}</p>

        <span className="text-slate-600 group-hover:text-[#c8a96a] transition">
          →
        </span>
      </div>

      <h3 className="mt-8 uppercase text-2xl font-black leading-tight">
        {title}
      </h3>

      <p className="mt-4 text-slate-500 italic font-serif leading-7">{desc}</p>

      <p className="mt-8 uppercase tracking-[0.2em] text-[10px] text-slate-400">
        {meta}
      </p>
    </Link>
  );
}

function MiniPanel({ title, children }) {
  return (
    <div className="bg-[#202632] rounded-xl p-7 border border-white/5">
      <h3 className="uppercase tracking-[0.25em] text-[11px] text-[#c8a96a] mb-6">
        {title}
      </h3>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SnapshotRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-b-0">
      <p className="text-slate-400">{label}</p>
      <p className="text-white font-black">{value}</p>
    </div>
  );
}

function QuickLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block bg-[#101118] border border-white/5 px-5 py-4 uppercase tracking-[0.18em] text-[10px] text-slate-400 hover:text-[#c8a96a] hover:border-[#c8a96a]/50 transition"
    >
      {label}
    </Link>
  );
}

function AdminTop({ title, handleLogout }) {
  return (
    <header className="h-20 bg-[#202632] px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-[#c8a96a] flex items-center justify-center font-black text-black">
          TJ
        </div>

        <h1 className="uppercase tracking-[0.25em] font-black">{title}</h1>
      </div>

      <div className="flex gap-8 uppercase tracking-[0.2em] text-[11px] text-slate-400">
        <Link to="/">◉ View Site</Link>

        <button onClick={handleLogout} className="uppercase tracking-[0.2em]">
          ↳ Logout
        </button>
      </div>
    </header>
  );
}

export default AdminDash;