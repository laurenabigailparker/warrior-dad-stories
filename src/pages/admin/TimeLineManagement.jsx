import { Link } from "react-router-dom";

function TimeLineManagement() {
  const timeline = [
    ["1992", "Enlisted", "The journey begins."],
    ["1993", "82nd Airborne Division", "First duty assignment."],
    ["2001", "Towers Fell", "Deployed when everything changed."],
    ["2002", "First Combat Deployment", "Tested. Forged. Changed forever."],
    ["2006", "Became A Father", "The mission found its deepest purpose."],
    ["2017", "Last Combat Deployment", "Nine deployments. One calling."],
    ["2025", "Retired From The Army", "Trophy Husband and Author."],
    ["2026", "Warrior Dad Book Launch", "The mission, bound in pages."],
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Timeline Management" back="/admin/dashboard" />

        <section className="p-8 grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="mb-8">
              <h2 className="uppercase text-2xl font-black tracking-widest">
                Timeline Events
              </h2>

              <p className="mt-3 text-slate-500 italic font-serif">
                Frontend-only scaffold. Students should refine this and connect
                real timeline data later.
              </p>
            </div>

            <div className="space-y-5">
              {timeline.map(([year, title, description]) => (
                <div
                  key={year + title}
                  className="bg-[#202632] rounded-lg p-6 border border-white/5 flex flex-col md:flex-row md:items-center gap-6"
                >
                  <div className="md:w-32">
                    <p className="text-[#c8a96a] text-4xl font-black">
                      {year}
                    </p>
                  </div>

                  <div className="flex-1">
                    <h3 className="uppercase text-xl font-black">{title}</h3>
                    <p className="mt-2 text-slate-500 italic font-serif">
                      {description}
                    </p>
                  </div>

                  <div className="flex gap-5 text-slate-400">
                    <button>✎ Edit</button>
                    <button>🗑 Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Panel title="Add Timeline Event">
              <Field label="Year" placeholder="2026" />
              <Field label="Title" placeholder="Warrior Dad Book Launch" />

              <div>
                <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                  Description
                </label>

                <textarea
                  placeholder="Short timeline description..."
                  className="w-full h-32 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
                />
              </div>

              <button className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold">
                Add Event
              </button>
            </Panel>

            <Panel title="Student Notes">
              <p className="text-slate-500 text-sm leading-7">
                Replace mock data with real timeline entries, refine spacing to
                match Figma, and wire add/edit/delete functionality in a future
                backend ticket.
              </p>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Field({ label, placeholder }) {
  return (
    <div className="mb-6">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
      />
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-[#202632] rounded-lg p-7">
      <h3 className="uppercase tracking-[0.25em] text-[11px] text-[#c8a96a] mb-6">
        {title}
      </h3>

      {children}
    </div>
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

export default TimeLineManagement;