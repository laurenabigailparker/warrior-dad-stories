import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ConfirmModal from "../../components/admin/ConfirmModal";
import StatusMessage from "../../components/admin/StatusMessage";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [featuredOnly, setFeaturedOnly] = useState(false);
const [deleteTarget, setDeleteTarget] = useState(null);
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("success");

const showMessage = (type, text) => {
  setMessageType(type);
  setMessage(text);
  setTimeout(() => setMessage(""), 4000);
};



const loadProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setProducts(data || []);
};

useEffect(() => {
  const loadInitialProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  };

  loadInitialProducts();
}, []);


  const activeProducts = products.filter(
  (product) => product.in_stock
).length;

const featuredProducts = products.filter(
  (product) => product.featured
).length;

const filteredProducts = products.filter((product) => {
  const matchesSearch =
    product.name?.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "all"
      ? true
      : statusFilter === "active"
      ? product.in_stock
      : !product.in_stock;

  const matchesFeatured =
    featuredOnly ? product.featured : true;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesFeatured
  );
});

const handleDeleteProduct = async () => {
  if (!deleteTarget) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", deleteTarget.id);

  if (error) {
    console.error(error);
    showMessage("error", "Failed to delete product.");
    return;
  }

  setProducts(products.filter((p) => p.id !== deleteTarget.id));
  setDeleteTarget(null);
};
const handleSyncPrintful = async () => {
  try {
    const response = await fetch("/api/sync-printful-products", {
      method: "POST",
    });

    const text = await response.text();
    console.log("SYNC RAW RESPONSE:", text);

    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { error: text };
    }

    if (!response.ok) {
      console.error("SYNC ERROR:", data);

      showMessage(
        "error",
        typeof data.error === "string"
          ? data.error
          : data.message || "Failed to sync Printful products."
      );

      return;
    }

    showMessage("success", `Synced ${data.count || 0} Printful products.`);
    loadProducts();
  } catch (error) {
    console.error(error);
    showMessage("error", "Failed to sync Printful products.");
  }
};
  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Product Management" back="/admin/dashboard" />

       <section className="p-8">
  <StatusMessage
    message={message}
    type={messageType}
  />

  <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Stat label="Total Products" value={products.length} />
            <Stat label="Active Products" value={activeProducts} />
            <Stat label="Featured Products" value={featuredProducts} />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">

  <div className="flex flex-col md:flex-row gap-4">

    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="bg-[#202632] px-4 py-3 outline-none border border-white/5 focus:border-[#c8a96a]"
    />

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="bg-[#202632] px-4 py-3 border border-white/5"
    >
      <option value="all">All Products</option>
      <option value="active">Active</option>
      <option value="draft">Draft</option>
    </select>

    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={featuredOnly}
        onChange={() =>
          setFeaturedOnly(!featuredOnly)
        }
      />
      Featured Only
    </label>

  </div>
            <h2 className="uppercase text-2xl font-black tracking-widest">
              Products
            </h2>

           <div className="flex gap-3">
  <button
    onClick={handleSyncPrintful}
    className="bg-white/10 px-6 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
  >
    Sync Printful
  </button>

  <Link
    to="/admin/products/new"
    className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
  >
    + New Product
  </Link>
</div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#202632] rounded-lg p-10 text-slate-500 italic font-serif">
              No products yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-[#202632] rounded-lg p-7">
                  <div className="h-44 bg-[#101118] rounded overflow-hidden flex items-center justify-center text-slate-600 text-xs uppercase tracking-[0.2em]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "Image"
                    )}
                  </div>

                  <div className="mt-6 flex justify-between items-start gap-4">
                    <div>
                      <h3 className="uppercase font-black text-2xl">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-slate-500 italic font-serif">
                        {product.category || "Product"}
                      </p>
                    </div>

                    <span className="bg-[#2b342d] text-green-700 px-3 py-2 text-[10px] uppercase">
                      {product.in_stock ? "Active" : "Draft"}
                    </span>
                  </div>

                  <p className="mt-5 text-slate-400 italic font-serif leading-7">
                    {product.description}
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 uppercase text-[10px] tracking-[0.2em]">
                        Price
                      </p>
                      <p className="mt-2 text-[#c8a96a] font-black text-xl">
                        ${Number(product.price || 0).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 uppercase text-[10px] tracking-[0.2em]">
                        Featured
                      </p>
                      <p className="mt-2 text-white font-black text-xl">
                        {product.featured ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-white/5 flex gap-5 text-slate-400">
                    <Link to={`/admin/products/edit/${product.id}`}>✎ Edit</Link>

                   <button onClick={() => setDeleteTarget(product)}>
  🗑 Delete
</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

<ConfirmModal
  open={Boolean(deleteTarget)}
  title="Delete Product?"
  message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
  confirmText="Delete Product"
  onConfirm={handleDeleteProduct}
  onCancel={() => setDeleteTarget(null)}
/>

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


export default ProductManagement;