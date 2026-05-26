import { Link } from "react-router-dom";

function ProductManagement() {
  const products = [
    ["Warrior Dad", "Hardcover", "$29.97", "142", "Active"],
    ["Warrior Dad", "Ebook", "$2.99", "∞", "Active"],
    ["Companion Guide", "PDF", "Free", "∞", "Active"],
    ["Warrior Dad Patch", "Merch", "TBD", "0", "Draft"],
    ["Mission Journal", "Merch", "TBD", "0", "Draft"],
    ["Forge Hoodie", "Apparel", "TBD", "0", "Draft"],
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Product Management" back="/admin/dashboard" />

        <section className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Stat label="Total Products" value="6" />
            <Stat label="Active Products" value="3" />
            <Stat label="Pre-Orders" value="234" />
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="uppercase text-2xl font-black tracking-widest">
              Products
            </h2>

            <Link
              to="/admin/products/new"
              className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
            >
              + New Product
            </Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map(([name, type, price, inventory, status]) => (
              <div key={name + type} className="bg-[#202632] rounded-lg p-7">
                <div className="h-44 bg-[#101118] rounded flex items-center justify-center text-slate-600 text-xs uppercase tracking-[0.2em]">
                  Image
                </div>

                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="uppercase font-black text-2xl">{name}</h3>
                    <p className="mt-2 text-slate-500 italic font-serif">{type}</p>
                  </div>

                  <span className="bg-[#2b342d] text-green-700 px-3 py-2 text-[10px] uppercase">
                    {status}
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 uppercase text-[10px] tracking-[0.2em]">
                      Price
                    </p>
                    <p className="mt-2 text-[#c8a96a] font-black text-xl">{price}</p>
                  </div>

                  <div>
                    <p className="text-slate-500 uppercase text-[10px] tracking-[0.2em]">
                      Inventory
                    </p>
                    <p className="mt-2 text-white font-black text-xl">{inventory}</p>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-white/5 flex gap-5 text-slate-400">
                  <button>✎ Edit</button>
                  <button>🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-[#202632] rounded-lg p-7">
      <p className="uppercase tracking-[0.25em] text-[10px] text-slate-500">
        {label}
      </p>
      <h3 className="mt-4 text-4xl text-[#c8a96a] font-black">{value}</h3>
    </div>
  );
}

function AdminSubTop({ title, back }) {
  return (
    <header className="h-20 bg-[#202632] px-8 grid grid-cols-3 items-center">
      <Link to={back} className="uppercase tracking-[0.2em] text-[11px] text-slate-400">
        ← Back To Dashboard
      </Link>
      <h1 className="uppercase tracking-[0.25em] font-black text-center">
        {title}
      </h1>
      <div />
    </header>
  );
}

export default ProductManagement;