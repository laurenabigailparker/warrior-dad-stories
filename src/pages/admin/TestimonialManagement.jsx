import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    featured: true,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return console.error(error);
    setTestimonials(data || []);
  }

  function resetForm() {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      quote: "",
      featured: true,
    });
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      role: item.role || "",
      quote: item.quote || "",
      featured: item.featured ?? true,
    });
  }

  async function handleSubmit() {
    const payload = {
      name: formData.name,
      role: formData.role,
      quote: formData.quote,
      featured: formData.featured,
    };

    const { error } = editingId
      ? await supabase.from("testimonials").update(payload).eq("id", editingId)
      : await supabase.from("testimonials").insert([payload]);

    if (error) {
      console.error(error);
      alert("Failed to save testimonial.");
      return;
    }

    resetForm();
    loadTestimonials();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this testimonial?")) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete testimonial.");
      return;
    }

    setTestimonials(testimonials.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Testimonials" back="/admin/dashboard" />

        <section className="p-8 grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <h2 className="uppercase text-2xl font-black tracking-widest mb-8">
              Reader Testimonials
            </h2>

            <div className="space-y-5">
              {testimonials.length === 0 ? (
                <p className="bg-[#202632] p-8 text-slate-500 italic font-serif">
                  No testimonials yet.
                </p>
              ) : (
                testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#202632] rounded-lg p-6 border border-white/5"
                  >
                    <p className="text-slate-300 italic font-serif leading-8">
                      “{item.quote}”
                    </p>

                    <div className="mt-6 flex justify-between gap-6">
                      <div>
                        <h3 className="uppercase font-black">{item.name}</h3>
                        <p className="text-slate-500 text-sm">{item.role}</p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#c8a96a]">
                          {item.featured ? "Featured" : "Hidden"}
                        </p>
                      </div>

                      <div className="flex gap-4 text-slate-400">
                        <button onClick={() => handleEdit(item)}>✎ Edit</button>

                        <button onClick={() => handleDelete(item.id)}>
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside>
            <div className="bg-[#202632] rounded-lg p-7">
              <h3 className="uppercase tracking-[0.25em] text-[11px] text-[#c8a96a] mb-6">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>

              <Field
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <Field
                label="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />

              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Quote
              </label>

              <textarea
                value={formData.quote}
                onChange={(e) =>
                  setFormData({ ...formData, quote: e.target.value })
                }
                className="w-full h-36 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
              />

              <label className="mt-5 flex items-center gap-3 text-slate-400">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                />
                Featured/Public
              </label>

              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
              >
                {editingId ? "Update Testimonial" : "Add Testimonial"}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="mt-4 w-full border border-white/10 text-slate-400 py-4 uppercase tracking-[0.2em] text-[11px]"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        className="w-full bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
      />
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

export default TestimonialManagement;