import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function MediaLibrary() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image")
        .not("image", "is", null);

      console.log("MEDIA DATA:", data);
      console.log("MEDIA ERROR:", error);

      if (error) return;

      const productImages = (data || []).map((product) => ({
        name: product.name,
        publicUrl: product.image,
      }));

      setMedia(productImages);
    };

    loadMedia();
  }, []);

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Media Library" back="/admin/dashboard" />

        <section className="p-8">
          {media.length === 0 ? (
            <div className="border border-dashed border-white/10 rounded-lg p-12 text-center">
              <p className="text-slate-500 uppercase tracking-[0.25em] text-[11px]">
                No media uploaded yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {media.map((item) => (
                <div
                  key={item.publicUrl}
                  className="bg-[#202632] rounded-lg overflow-hidden border border-white/5"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={item.publicUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="truncate uppercase tracking-[0.12em] font-bold text-sm">
                      {item.name}
                    </h3>

                    <div className="mt-5 pt-4 border-t border-white/5 flex justify-between text-slate-400 text-sm">
                      <a href={item.publicUrl} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
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

export default MediaLibrary;