import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";
import ConfirmModal from "../../components/admin/ConfirmModal";

function SocialLinksManagement() {
  const [links, setLinks] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    display_order: 0,
    active: true,
  });

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const loadLinks = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error(error);
      showMessage("error", "Failed to load social links.");
      return;
    }

    setLinks(data || []);
  };

  useEffect(() => {
  const loadInitialLinks = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error(error);
      setMessageType("error");
      setMessage("Failed to load social links.");
      return;
    }

    setLinks(data || []);
  };

  loadInitialLinks();
}, []);

  const handleAddLink = async () => {
    const { error } = await supabase.from("social_links").insert([
      {
        platform: formData.platform,
        url: formData.url,
        display_order: Number(formData.display_order || 0),
        active: formData.active,
      },
    ]);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to add social link.");
      return;
    }

    setFormData({
      platform: "",
      url: "",
      display_order: 0,
      active: true,
    });

    showMessage("success", "Social link added.");
    loadLinks();
  };

  const toggleActive = async (item) => {
    const { error } = await supabase
      .from("social_links")
      .update({ active: !item.active })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to update social link.");
      return;
    }

    setLinks(
      links.map((link) =>
        link.id === item.id ? { ...link, active: !link.active } : link
      )
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to delete social link.");
      return;
    }

    setLinks(links.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    showMessage("success", "Social link deleted.");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Social Links" back="/admin/dashboard" />

        <section className="p-8 grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <StatusMessage message={message} type={messageType} />

            <h2 className="mt-6 uppercase text-2xl font-black tracking-widest mb-8">
              Public Social Links
            </h2>

            <div className="space-y-5">
              {links.length === 0 ? (
                <p className="bg-[#202632] p-8 text-slate-500 italic font-serif">
                  No social links yet.
                </p>
              ) : (
                links.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#202632] rounded-lg p-6 border border-white/5 flex flex-col md:flex-row md:items-center gap-6"
                  >
                    <div className="flex-1">
                      <h3 className="uppercase font-black text-xl">
                        {item.platform}
                      </h3>

                      <p className="mt-2 text-slate-500 text-sm break-all">
                        {item.url}
                      </p>

                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                        Order: {item.display_order} •{" "}
                        {item.active ? "Active" : "Hidden"}
                      </p>
                    </div>

                    <div className="flex gap-5 text-slate-400">
                      <button onClick={() => toggleActive(item)}>
                        {item.active ? "Hide" : "Show"}
                      </button>

                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside>
            <Panel title="Add Social Link">
              <Field
                label="Platform"
                placeholder="YouTube"
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
              />

              <Field
                label="URL"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />

              <Field
                label="Display Order"
                placeholder="1"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    display_order: e.target.value,
                  })
                }
              />

              <label className="mt-5 flex items-center gap-3 text-slate-400">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                />
                Active/Public
              </label>

              <button
                onClick={handleAddLink}
                className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
              >
                Add Link
              </button>
            </Panel>
          </aside>
        </section>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete Social Link?"
        message={`Are you sure you want to delete "${deleteTarget?.platform}"?`}
        confirmText="Delete Link"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </main>
  );
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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

export default SocialLinksManagement;