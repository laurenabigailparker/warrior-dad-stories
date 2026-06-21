import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

function Bingo() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBingoCards = async () => {
      const { data, error } = await supabase
        .from("forge_entries")
        .select("*")
        .eq("entry_type", "bingo")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setCards(data || []);
      setLoading(false);
    };

    fetchBingoCards();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#080a0f] text-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
   <Link
  to="/forge"
  className="inline-flex items-center px-4 py-2 bg-[#202632] text-[#c8a96a] uppercase tracking-[0.18em] text-[10px] hover:bg-[#c8a96a] hover:text-black transition"
>
  ← Back to The Creative Forge
</Link>
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-[#202632] text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
              Warrior Dad Bingo
            </span>

            <h1 className="mt-6 text-5xl font-black uppercase">
              Monthly Bingo Cards
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-slate-400">
              Explore current and past Warrior Dad Bingo cards designed to
              encourage intentional fatherhood, meaningful conversations, and
              memorable moments with your family.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-slate-500 mt-20">
              Loading Bingo cards...
            </p>
          ) : cards.length === 0 ? (
            <p className="text-center text-slate-500 mt-20">
              No Bingo cards available yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 mt-20">
          {cards.map((card, index) => (
  <div
    key={card.id}
    className="bg-[#202632] rounded-2xl overflow-hidden border border-white/5"
  >
                  {(card.featured_image || card.artwork_image) && (
                    <img
                      src={card.featured_image || card.artwork_image}
                      alt={card.title}
                     className="w-full object-contain bg-white"
                    />
                  )}

                 <div className="p-8">
  {index === 0 && (
    <span className="inline-block mb-4 px-4 py-2 bg-[#c8a96a] text-black uppercase tracking-[0.2em] text-[10px] font-bold">
      Current Bingo Card
    </span>
  )}

  <span className="inline-block px-4 py-2 bg-[#34302b] text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
    Warrior Dad Bingo
  </span>

  <h2 className="mt-6 text-3xl font-black uppercase">
    {card.title}
  </h2>

                    {card.excerpt && (
                      <p className="mt-6 text-slate-400 italic">
                        {card.excerpt}
                      </p>
                    )}

                    <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      TJ Baird •{" "}
                      {new Date(card.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    {(card.featured_image || card.artwork_image) && (
                     <a
  href={card.featured_image || card.artwork_image}
  target="_blank"
  rel="noreferrer"
  className="inline-block mt-8 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-white transition"
>
  Open Full Size
</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Bingo;