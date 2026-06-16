import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase";
import GuidingPrinciples from "../components/GuidingPrinciples";

function ForgeEntryDetail() {
  const { slug } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntry = async () => {
      const { data, error } = await supabase
        .from("forge_entries")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) {
        console.error(error);
      }

      setEntry(data || null);
      setLoading(false);
    };

    loadEntry();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#11141b] text-white">
        <Navbar />

        <section className="px-8 py-32 text-center">
          <p className="text-slate-400 italic font-serif">Loading story...</p>
        </section>

        <Footer />
      </main>
    );
  }

  if (!entry) {
    return (
      <main className="min-h-screen bg-[#11141b] text-white">
        <Navbar />

        <section className="px-8 py-32 text-center">
          <h1 className="uppercase text-4xl font-black">Story Not Found</h1>

          <Link
            to="/forge"
            className="inline-block mt-8 text-[#c8a96a] uppercase tracking-[0.2em] text-[11px]"
          >
            ← Back to The Forge
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  const image =
    entry.featured_image || entry.artwork_image || entry.background_image;

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      <section className="relative min-h-[520px] flex items-center px-8 md:px-20 bg-[#11141b]">
        {image && (
          <img
            src={image}
            alt={entry.title}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#11141b]" />

        <div className="max-w-5xl relative z-10">
          <Link
            to="/forge"
            className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px]"
          >
            ← Back to The Forge
          </Link>

          <p className="mt-10 text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
            {entry.entry_type || "Creative Forge"}
          </p>

          <h1 className="mt-6 uppercase font-black text-5xl md:text-7xl leading-tight">
            {entry.title}
          </h1>

          {entry.excerpt && (
            <p className="mt-8 max-w-3xl text-slate-300 italic font-serif text-xl leading-9">
              {entry.excerpt}
            </p>
          )}
        </div>
      </section>

      <section className="bg-[#1a1f27] px-8 md:px-20 py-24">
        <article className="max-w-4xl mx-auto bg-[#202632] border border-white/5 rounded-2xl p-8 md:p-14">
          {image && (
            <img
              src={image}
              alt={entry.title}
              className="w-full max-h-[620px] object-cover rounded-xl mb-10 border border-white/10"
            />
          )}

          <div className="whitespace-pre-line text-slate-200 font-serif text-lg leading-9">
            {entry.body}
          </div>

          {entry.video_url && (
            <div className="mt-12 overflow-hidden rounded-xl border border-white/10">
              <iframe
                className="w-full aspect-video"
                src={entry.video_url}
                title={entry.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </article>
      </section>

      <GuidingPrinciples />
      <Footer />
    </main>
  );
}

export default ForgeEntryDetail;