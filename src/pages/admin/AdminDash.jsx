import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function AdminDash() {
  const [submissions, setSubmissions] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

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
      ] = await Promise.all([
        supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("blog_posts").select("*"),
        supabase.from("products").select("*"),
        supabase.from("timeline_events").select("*"),
        supabase.from("testimonials").select("*"),
      ]);

      if (submissionsResult.error) console.error(submissionsResult.error);
      if (blogResult.error) console.error(blogResult.error);
      if (productsResult.error) console.error(productsResult.error);
      if (timelineResult.error) console.error(timelineResult.error);
      if (testimonialsResult.error) console.error(testimonialsResult.error);

      setSubmissions(submissionsResult.data || []);
      setBlogPosts(blogResult.data || []);
      setProducts(productsResult.data || []);
      setTimelineEvents(timelineResult.data || []);
      setTestimonials(testimonialsResult.data || []);
    };

    fetchDashboardData();
  }, []);

 const mediaCount = products.filter((product) => product.image).length;

const activeProducts = products.filter((product) => product.in_stock).length;

const featuredTestimonials = testimonials.filter(
  (item) => item.featured
).length;

const publishedTimelineEvents = timelineEvents.filter(
  (item) => item.published
).length;

const publishedPosts = blogPosts.filter((post) => post.published).length;

  const stats = [
    {
  icon: "▤",
  label: "Blog Posts",
  value: blogPosts.length,
  subtext: `${publishedPosts} published`,
},
    {
      icon: "▤",
      label: "Blog Posts",
      value: blogPosts.length,
      subtext: "Stored articles",
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
  ];

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
                          {new Date(item.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <MiniPanel title="Publishing Snapshot">
                <SnapshotRow label="Timeline Events" value={timelineEvents.length} />
                <SnapshotRow
                  label="Published Timeline"
                  value={publishedTimelineEvents}
                />
                <SnapshotRow label="Testimonials" value={testimonials.length} />
                <SnapshotRow
                  label="Featured Reviews"
                  value={featuredTestimonials}
                />
              </MiniPanel>

              <MiniPanel title="Quick Actions">
                <QuickLink to="/admin/products/new" label="+ New Product" />
                <QuickLink to="/admin/blog/new" label="+ New Blog Post" />
                <QuickLink to="/admin/timeline" label="Manage Timeline" />
<QuickLink to="/admin/testimonials" label="Manage Testimonials" />
              </MiniPanel>
            </aside>
          </div>

          <h2 className="uppercase text-2xl font-black tracking-widest mt-14 mb-8">
            Content Management
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AdminCard
              href="/admin/blog"
              icon="▤"
              title="Blog Posts"
              desc="Create and manage blog content"
              meta={`${blogPosts.length} Posts`}
            />

            <AdminCard
              href="/admin/products"
              icon="▣"
              title="Products"
              desc="Manage books and merchandise"
              meta={`${products.length} Items`}
            />

            <AdminCard
              href="/admin/media"
              icon="▧"
              title="Media Library"
              desc="View, copy, and remove product images"
              meta={`${mediaCount} Files`}
            />

            <AdminCard
              href="/admin/timeline"
              icon="▢"
              title="Timeline Events"
              desc="Edit military service timeline"
              meta={`${timelineEvents.length} Events`}
            />

            <AdminCard
              href="/admin/testimonials"
              icon="♁"
              title="Testimonials"
              desc="Manage reader testimonials"
              meta={`${testimonials.length} Reviews`}
            />

            <AdminCard
              href="/admin/settings"
              icon="⚙"
              title="Site Settings"
              desc="Update footer, contact, and social links"
              meta="Global Settings"
            />
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
        <div className="h-9 w-9 bg-[#c8a96a]" />

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