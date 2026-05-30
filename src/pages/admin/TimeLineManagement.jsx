import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ConfirmModal from "../../components/admin/ConfirmModal";

function TimeLineManagement() {
  const [timeline, setTimeline] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    event_date: "",
    title: "",
    description: "",
    sort_order: 0,
    published: true,
  });

  useEffect(() => {
    loadTimeline();
  }, []);

 async function loadTimeline() {
  const { data, error } = await supabase
    .from("timeline_events")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  setTimeline(data || []);
}

const handleAddEvent = async () => {
  const { error } = await supabase.from("timeline_events").insert([
    {
      event_date: formData.event_date,
      title: formData.title,
      description: formData.description,
      sort_order: Number(formData.sort_order || 0),
      published: formData.published,
    },
  ]);

  if (error) {
    console.error(error);
    alert("Failed to add timeline event.");
    return;
  }

  setFormData({
    event_date: "",
    title: "",
    description: "",
    sort_order: 0,
    published: true,
  });

  loadTimeline();
};

const handleDelete = async () => {
  if (!deleteTarget) return;

  const { error } = await supabase
    .from("timeline_events")
    .delete()
    .eq("id", deleteTarget.id);

  if (error) {
    console.error(error);
    return;
  }

  setTimeline(timeline.filter((item) => item.id !== deleteTarget.id));
  setDeleteTarget(null);
};

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
                Manage public timeline milestones for Warrior Dad Stories.
              </p>
            </div>

            {timeline.length === 0 ? (
              <div className="bg-[#202632] rounded-lg p-8 text-slate-500 italic font-serif">
                No timeline events yet.
              </div>
            ) : (
              <div className="space-y-5">
                {timeline.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#202632] rounded-lg p-6 border border-white/5 flex flex-col md:flex-row md:items-center gap-6"
                  >
                    <div className="md:w-32">
                      <p className="text-[#c8a96a] text-4xl font-black">
                        {item.event_date}
                      </p>
                    </div>

                    <div className="flex-1">
                      <h3 className="uppercase text-xl font-black">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-slate-500 italic font-serif">
                        {item.description}
                      </p>

                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                        Sort Order: {item.sort_order} •{" "}
                        {item.published ? "Published" : "Draft"}
                      </p>
                    </div>

                    <div className="flex gap-5 text-slate-400">
                    <button onClick={() => setDeleteTarget(item)}>
  🗑 Delete
</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <Panel title="Add Timeline Event">
              <Field
                label="Year / Date"
                placeholder="2026"
                value={formData.event_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    event_date: e.target.value,
                  })
                }
              />

              <Field
                label="Title"
                placeholder="Warrior Dad Book Launch"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />

              <Field
                label="Sort Order"
                placeholder="1"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: e.target.value,
                  })
                }
              />

              <div>
                <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                  Description
                </label>

                <textarea
                  placeholder="Short timeline description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-32 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
                />
              </div>

              <label className="mt-5 flex items-center gap-3 text-slate-400">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      published: e.target.checked,
                    })
                  }
                />
                Published
              </label>

              <button
                onClick={handleAddEvent}
                className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
              >
                Add Event
              </button>
            </Panel>
          </aside>
        </section>
      </div>

<ConfirmModal
  open={Boolean(deleteTarget)}
  title="Delete Timeline Event?"
  message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
  confirmText="Delete Event"
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

export default TimeLineManagement;