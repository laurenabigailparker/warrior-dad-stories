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

      if (error) {
        console.error(error);
        return;
      }

      const productImages = (data || []).map((product) => ({
        id: product.id,
        name: product.name,
        publicUrl: product.image,
      }));

      setMedia(productImages);
    };

    loadMedia();
  }, []);

  const copyUrl = async (url) => {
    await navigator.clipboard.writeText(url);
    alert("Image URL copied!");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Media Library" back="/admin/dashboard" />

        <section className="p-8">
          <div className="flex flex-col lg:flex-row gap-5 justify-between mb-10">
            <input
              placeholder="Search media..."
              className="w-96 max-w-full bg-[#202632] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
            />

            <Link
              to="/admin/products/new"
              className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold text-center"
            >
              + Upload Via Product
            </Link>
          </div>

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
                  key={item.id}
                  className="bg-[#202632] rounded-lg overflow-hidden border border-white/5 hover:border-[#c8a96a] transition"
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

                    <p className="mt-3 text-slate-500 text-xs truncate">
                      {item.publicUrl}
                    </p>

                    <div className="mt-5 pt-4 border-t border-white/5 flex justify-between text-slate-400 text-sm">
                      <a
                        href={item.publicUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>

                      <button onClick={() => copyUrl(item.publicUrl)}>
                        Copy URL
                      </button>
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