import { Link } from "react-router-dom";

function NewProduct() {
  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Create New Product" back="/admin/products" />

        <section className="p-8 grid lg:grid-cols-[1fr_340px] gap-8">
          <div className="bg-[#202632] rounded-lg p-8 grid md:grid-cols-2 gap-7">
            <Field label="Product Name" placeholder="Warrior Dad" />
            <Field label="Category" placeholder="Book / Merch / Guide" />
            <Field label="Type / Edition" placeholder="Hardcover Edition" />
            <Field label="Price" placeholder="$29.97" />
            <Field label="Inventory" placeholder="100" />
            <Field label="SKU" placeholder="WD-HC-001" />
            <Field label="Weight" placeholder="1.2 lbs" />
            <Field label="Dimensions" placeholder="6 x 9 in" />

            <div className="md:col-span-2">
              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Description
              </label>
              <textarea
                placeholder="Product description..."
                className="w-full h-48 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
              />
            </div>
          </div>

          <aside className="space-y-6">
            <Panel title="Product Status">
              <select className="w-full bg-[#101118] border border-white/5 px-4 py-4 text-slate-400">
                <option>Draft</option>
                <option>Active</option>
                <option>Coming Soon</option>
              </select>

              <button className="w-full mt-6 bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold">
                Save Product
              </button>
            </Panel>

            <Panel title="Product Image">
              <div className="h-64 bg-[#101118] border border-dashed border-white/10 rounded flex items-center justify-center text-slate-600 text-sm">
                Upload Placeholder
              </div>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Field({ label, placeholder }) {
  return (
    <div>
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
    <div className="bg-[#202632] rounded-lg p-6">
      <h3 className="uppercase tracking-[0.25em] text-[11px] text-[#c8a96a] mb-5">
        {title}
      </h3>
      {children}
    </div>
  );
}

function AdminSubTop({ title, back }) {
  return (
    <header className="h-20 bg-[#202632] px-8 grid grid-cols-3 items-center">
      <Link to={back} className="uppercase tracking-[0.2em] text-[11px] text-slate-400">
        ← Back
      </Link>
      <h1 className="uppercase tracking-[0.25em] font-black text-center">
        {title}
      </h1>
      <div />
    </header>
  );
}

export default NewProduct;