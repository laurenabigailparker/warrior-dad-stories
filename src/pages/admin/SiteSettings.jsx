import { Link } from "react-router-dom";

function SiteSettings() {
  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Site Settings" back="/admin/dashboard" />

        <section className="p-8 grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-8">
            <Panel title="General Site Info">
              <Field label="Site Name" placeholder="Warrior Dad Stories" />
              <Field label="Tagline" placeholder="Stories forged in service, strengthened by love." />
              <Field label="Contact Email" placeholder="contact@warriordadstories.com" />
            </Panel>

            <Panel title="Homepage Announcement">
              <Field label="Banner Text" placeholder="Warrior Dad launches May 23, 2026 — Pre-order now" />
              <Field label="CTA Label" placeholder="Pre-Order Now" />
              <Field label="CTA Link" placeholder="/preorder" />
            </Panel>

            <Panel title="Social Links">
              <Field label="Instagram" placeholder="@tjwarriordad" />
              <Field label="Facebook" placeholder="/TJWarriorDad" />
              <Field label="X / Twitter" placeholder="@TJWarriorDad" />
              <Field label="LinkedIn" placeholder="thomas-tj-baird" />
            </Panel>
          </div>

          <aside className="space-y-6">
            <Panel title="Brand Assets">
              <div className="h-40 bg-[#101118] border border-dashed border-white/10 rounded flex items-center justify-center text-slate-600 text-sm">
                Logo Upload Placeholder
              </div>

              <div className="mt-5 h-40 bg-[#101118] border border-dashed border-white/10 rounded flex items-center justify-center text-slate-600 text-sm">
                Favicon Upload Placeholder
              </div>
            </Panel>

            <Panel title="Publish">
              <p className="text-slate-500 text-sm leading-7">
                Frontend-only placeholder. Students can wire this to backend settings later.
              </p>

              <button className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold">
                Save Settings
              </button>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Field({ label, placeholder }) {
  return (
    <div className="mb-6 last:mb-0">
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

export default SiteSettings;