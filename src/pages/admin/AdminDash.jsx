import { Link } from "react-router-dom";

function AdminDash() {
  const stats = [
    ["◉", "Total Views", "12,456", "↗ +12%"],
    ["$", "Pre-Orders", "234", "↗ +28%"],
    ["▤", "Blog Posts", "8", "↗ +2"],
    ["♁", "Email Subscribers", "1,847", "↗ +15%"],
  ];

  const cards = [
    ["/admin/blog", "▤", "Blog Posts", "Create and manage blog content", "8 Posts"],
    ["/admin/products", "▣", "Products", "Manage books and merchandise", "6 Items"],
    ["/admin/media", "▧", "Media Library", "Upload and organize images", "143 Files"],
    ["/admin/timeline", "▢", "Timeline Events", "Edit military service timeline", "11 Events"],
    ["#", "♁", "Testimonials", "Manage reader testimonials", "12 Reviews"],
    ["/admin/settings", "⚙", "Site Settings", "Configure general settings", "All Settings"],
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118]">
        <AdminTop title="Admin Dashboard" />

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
            Content Management
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {cards.map(([href, icon, title, desc, meta]) => (
              <Link
                key={title}
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
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminTop({ title }) {
  return (
    <header className="h-20 bg-[#202632] px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 bg-[#c8a96a]" />
        <h1 className="uppercase tracking-[0.25em] font-black">{title}</h1>
      </div>

      <div className="flex gap-8 uppercase tracking-[0.2em] text-[11px] text-slate-400">
        <Link to="/">◉ View Site</Link>
        <Link to="/admin">↳ Logout</Link>
      </div>
    </header>
  );
}

export default AdminDash;