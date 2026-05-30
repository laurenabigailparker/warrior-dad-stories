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
    const fetchSubmissions = async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) return console.error(error);
      setSubmissions(data || []);
    };

    const fetchBlogPosts = async () => {
      const { data, error } = await supabase.from("blog_posts").select("*");

      if (error) return console.error(error);
      setBlogPosts(data || []);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) return console.error(error);
      setProducts(data || []);
    };

    const fetchTimelineEvents = async () => {
      const { data, error } = await supabase
        .from("timeline_events")
        .select("*");

      if (error) return console.error(error);
      setTimelineEvents(data || []);
    };

    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*");

      if (error) return console.error(error);
      setTestimonials(data || []);
    };

    fetchSubmissions();
    fetchBlogPosts();
    fetchProducts();
    fetchTimelineEvents();
    fetchTestimonials();
  }, []);

  const mediaCount = products.filter((product) => product.image).length;

  const stats = [
    ["◉", "Total Views", "12,456", "↗ +12%"],
    ["✉", "Messages", submissions.length, "Live"],
    ["▤", "Blog Posts", blogPosts.length, "Live"],
    ["▣", "Products", products.length, "Live"],
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118]">
        <AdminTop title="Admin Dashboard" handleLogout={handleLogout} />

        <section className="p-8">
          <h2 className="uppercase text-2xl font-black tracking-widest mb-8">
            Overview
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {stats.map(([icon, label, value, trend]) => (
              <div key={label} className="bg-[#202632] rounded-lg p-7">
                <p className="text-[#c8a96a] text-2xl">{icon}</p>

                <p className="mt-5 uppercase tracking-[0.25em] text-[10px] text-slate-500">
                  {label}
                </p>

                <div className="mt-4 flex items-end gap-4">
                  <h3 className="text-4xl font-black">{value}</h3>
                  <span className="text-green-700 text-xs">{trend}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="uppercase text-2xl font-black tracking-widest mt-12 mb-8">
            Recent Contact Submissions
          </h2>

          <div className="bg-[#202632] rounded-lg border border-white/5 overflow-hidden">
            {submissions.length === 0 ? (
              <p className="p-8 text-slate-500 italic font-serif">
                No messages yet.
              </p>
            ) : (
              <div className="divide-y divide-white/5">
                {submissions.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="uppercase font-black text-xl">
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

                    {item.organization && (
                      <p className="mt-4 text-slate-400 text-sm">
                        {item.organization}
                      </p>
                    )}

                    <p className="mt-4 text-slate-300 italic font-serif leading-7">
                      {item.message}
                    </p>

                    <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" • "}
                      {new Date(item.created_at).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <h2 className="uppercase text-2xl font-black tracking-widest mt-12 mb-8">
            Content Management
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
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
              desc="Upload and organize images"
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
              desc="Configure general settings"
              meta="All Settings"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminCard({ href, icon, title, desc, meta }) {
  return (
    <Link
      to={href}
      className="bg-[#202632] rounded-lg p-8 min-h-[210px] hover:border-[#c8a96a] border border-transparent transition"
    >
      <p className="text-[#c8a96a] text-4xl">{icon}</p>

      <h3 className="mt-7 uppercase text-2xl font-black">{title}</h3>

      <p className="mt-4 text-slate-500 italic font-serif">{desc}</p>

      <p className="mt-9 uppercase tracking-[0.2em] text-[10px] text-slate-400">
        {meta}
      </p>
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