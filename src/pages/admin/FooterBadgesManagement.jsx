import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function FooterBadgesManagement() {
  const emptyForm = {
    title: "",
    subtitle: "",
    image_url: "",
    link_url: "",
    sort_order: 0,
    published: true,
  };

  const [badges, setBadges] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const loadBadges = async () => {
    const { data, error } = await supabase
      .from("footer_badges")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setBadges(data || []);
  };

  useEffect(() => {
  const fetchBadges = async () => {
    const { data, error } = await supabase
      .from("footer_badges")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setBadges(data || []);
  };

  fetchBadges();
}, []);

  const uploadBadgeImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `footer-badges/badge-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      setMessage("Image upload failed.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("site-images")
      .getPublicUrl(fileName);

    setForm((prev) => ({
      ...prev,
      image_url: data.publicUrl,
    }));

    setUploading(false);
    setMessage("Image uploaded. Fill out the rest and save.");
    setTimeout(() => setMessage(""), 4000);
  };

  const saveBadge = async () => {
    const { error } = await supabase.from("footer_badges").insert([form]);

    if (error) {
      console.error(error);
      setMessage("Failed to save badge.");
      return;
    }

    setForm(emptyForm);
    setMessage("Footer badge added.");
    setTimeout(() => setMessage(""), 4000);
    loadBadges();
  };

  const deleteBadge = async (id) => {
    await supabase.from("footer_badges").delete().eq("id", id);
    loadBadges();
  };

  const togglePublished = async (badge) => {
    await supabase
      .from("footer_badges")
      .update({ published: !badge.published })
      .eq("id", badge.id);

    loadBadges();
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Footer Badges" back="/admin/dashboard" />

        <section className="p-8 grid lg:grid-cols-[420px_1fr] gap-8">
          <div className="bg-[#202632] p-7 rounded-lg h-fit">
            <h2 className="uppercase font-black text-2xl mb-6">
              Add Footer Badge
            </h2>

            {message && (
              <p className="mb-5 text-[#c8a96a] italic font-serif">
                {message}
              </p>
            )}

            <Field
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Field
              label="Subtitle"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />

            <div className="mb-5">
              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Badge Logo
              </label>

              <div className="bg-[#101118] border border-dashed border-white/10 rounded-lg p-6 text-center">
                {form.image_url ? (
                  <img
                    src={form.image_url}
                    alt="Badge preview"
                    className="max-h-32 mx-auto object-contain mb-5"
                  />
                ) : (
                  <p className="text-slate-500 italic font-serif mb-5">
                    Upload badge/logo image
                  </p>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadBadgeImage}
                  className="block w-full text-sm text-slate-400"
                />

                {uploading && (
                  <p className="mt-4 text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
                    Uploading...
                  </p>
                )}
              </div>
            </div>

            <Field
              label="Link URL"
              value={form.link_url}
              onChange={(e) => setForm({ ...form, link_url: e.target.value })}
            />

            <Field
              label="Sort Order"
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
            />

            <label className="flex items-center gap-3 text-slate-400 text-sm mt-4">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
              />
              Published
            </label>

            <button
              onClick={saveBadge}
              className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
            >
              Add Footer Badge
            </button>
          </div>

          <div className="space-y-5">
            {badges.length === 0 ? (
              <p className="text-slate-500 italic font-serif">
                No footer badges yet.
              </p>
            ) : (
              badges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-[#202632] p-6 rounded-lg flex flex-col md:flex-row gap-6 md:items-center md:justify-between"
                >
                  <div className="flex gap-5 items-center">
                    {badge.image_url && (
                      <img
                        src={badge.image_url}
                        alt={badge.title}
                        className="h-20 w-28 object-contain bg-black rounded"
                      />
                    )}

                    <div>
                      <h3 className="font-black uppercase">
                        {badge.title || "Untitled Badge"}
                      </h3>

                      <p className="text-slate-400">
                        {badge.subtitle || "No subtitle"}
                      </p>

                      <p className="text-slate-600 text-xs break-all">
                        {badge.link_url}
                      </p>

                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        Sort: {badge.sort_order} ·{" "}
                        {badge.published ? "Published" : "Hidden"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => togglePublished(badge)}
                      className="text-[#c8a96a]"
                    >
                      {badge.published ? "Hide" : "Publish"}
                    </button>

                    <button
                      onClick={() => deleteBadge(badge.id)}
                      className="text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-5">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        type={type}
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

export default FooterBadgesManagement;