import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const loadSubscribers = async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setSubscribers(data || []);
    };

    loadSubscribers();
  }, []);

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Newsletter Subscribers" back="/admin/dashboard" />

        <section className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Stat label="Total Subscribers" value={subscribers.length} />

            <Stat
              label="Latest Signup"
              value={
                subscribers[0]
                  ? new Date(subscribers[0].created_at).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" }
                    )
                  : "None"
              }
            />
          </div>

          <div className="bg-[#202632] rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-[1fr_220px] text-slate-400 uppercase tracking-[0.25em] text-[10px] px-6 py-4 border-b border-white/5">
              <span>Email</span>
              <span>Date Joined</span>
            </div>

            {subscribers.length === 0 ? (
              <p className="p-8 text-slate-500 italic font-serif">
                No subscribers yet.
              </p>
            ) : (
              subscribers.map((item) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-[1fr_220px] gap-4 px-6 py-5 border-b border-white/5 last:border-b-0"
                >
                  <p className="text-slate-200">{item.email}</p>

                  <p className="text-slate-500">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Unknown"}
                  </p>
                </div>
              ))
            )}
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

export default NewsletterManagement;