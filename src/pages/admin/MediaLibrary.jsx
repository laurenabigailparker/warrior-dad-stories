import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";
import ConfirmModal from "../../components/admin/ConfirmModal";

function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  useEffect(() => {
    const loadMedia = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image")
        .not("image", "is", null);

      if (error) {
        console.error(error);
        showMessage("error", "Failed to load media.");
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
    showMessage("success", "Image URL copied.");
  };

const removeImage = async () => {
  if (!deleteTarget) return;

  const { error } = await supabase
    .from("products")
    .update({ image: null })
    .eq("id", deleteTarget.id);

  if (error) {
    console.error(error);
    showMessage("error", "Failed to remove image.");
    return;
  }

  setMedia(
    media.filter((item) => item.id !== deleteTarget.id)
  );

  setDeleteTarget(null);

  showMessage(
    "success",
    "Image removed from product."
  );
};

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Media Library" back="/admin/dashboard" />

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="flex flex-col lg:flex-row gap-5 justify-between mt-6 mb-10">
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

                    <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-4 justify-between text-slate-400 text-sm">
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

                      <button
  onClick={() => setDeleteTarget(item)}
  className="text-red-400"
>
  Remove
</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

<ConfirmModal
  open={Boolean(deleteTarget)}
  title="Remove Product Image?"
  message={`Remove the image from "${deleteTarget?.name}"? The product will remain, but the image will disappear from the website.`}
  confirmText="Remove Image"
  onConfirm={removeImage}
  onCancel={() => setDeleteTarget(null)}
/>


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