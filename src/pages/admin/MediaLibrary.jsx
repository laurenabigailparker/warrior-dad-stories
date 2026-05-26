import { Link } from "react-router-dom";

function MediaLibrary() {
  const media = [
    ["hero-home.jpg", "2.4 MB", "JPG"],
    ["book-cover.png", "1.8 MB", "PNG"],
    ["author-headshot.jpg", "3.1 MB", "JPG"],
    ["forge-banner.png", "4.2 MB", "PNG"],
    ["podcast-cover.jpg", "1.1 MB", "JPG"],
    ["timeline-image.png", "2.7 MB", "PNG"],
    ["quote-bg.jpg", "5.3 MB", "JPG"],
    ["shop-item.png", "2.0 MB", "PNG"],
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Media Library" back="/admin/dashboard" />

        <section className="p-8">
          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row gap-5 justify-between mb-10">
            <div className="flex gap-4">
              <input
                placeholder="Search media..."
                className="w-96 max-w-full bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
              />

              {/* STUDENTS: add real toggle functionality later */}
              <div className="flex overflow-hidden rounded border border-white/5">
                <button className="bg-[#202632] px-5 text-slate-400">
                  ◫
                </button>

                <button className="bg-[#171c27] px-5 text-slate-600">
                  ☰
                </button>
              </div>
            </div>

            {/* STUDENTS: connect upload functionality later */}
            <button className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold">
              + Upload Media
            </button>
          </div>

          {/* MEDIA GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {media.map(([name, size, type], index) => (
              <div
                key={name}
                className="bg-[#202632] rounded-lg overflow-hidden border border-white/5 hover:border-[#c8a96a] transition"
              >
                {/* STUDENTS: replace placeholders with real uploads */}
                <div className="h-52 bg-[#171c27] flex items-center justify-center text-slate-600 uppercase tracking-[0.2em] text-xs">
                  Preview {index + 1}
                </div>

                <div className="p-5">
                  <h3 className="truncate uppercase tracking-[0.12em] font-bold text-sm">
                    {name}
                  </h3>

                  <div className="mt-4 flex justify-between items-center text-slate-500 text-xs uppercase tracking-[0.18em]">
                    <span>{size}</span>
                    <span>{type}</span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex justify-between text-slate-400 text-sm">
                    <button>✎ Edit</button>
                    <button>🗑 Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE PLACEHOLDER */}
          <div className="mt-16 border border-dashed border-white/10 rounded-lg p-12 text-center">
            <p className="text-slate-500 uppercase tracking-[0.25em] text-[11px]">
              Students should implement:
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
              <span>Real uploads</span>
              <span>Image previews</span>
              <span>Cloud storage</span>
              <span>Filtering</span>
              <span>Sorting</span>
              <span>Grid/List toggle</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminSubTop({ title, back }) {
  return (
    <header className="h-20 bg-[#202632] px-8 grid grid-cols-3 items-center">
      <Link
        to={back}
        className="uppercase tracking-[0.2em] text-[11px] text-slate-400"
      >
        ← Back To Dashboard
      </Link>

      <h1 className="uppercase tracking-[0.25em] font-black text-center">
        {title}
      </h1>

      <div />
    </header>
  );
}

export default MediaLibrary;