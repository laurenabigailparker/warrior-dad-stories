import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "./StatusMessage";
import ConfirmModal from "./ConfirmModal";

function CarouselImageManagement({
  title,
  tableName,
  uploadFolder,
  addTitle,
  saveLabel,
  back,
  page = "about",
}) {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };



const loadImages = async () => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("page", page)
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    showMessage("error", "Failed to load images.");
    return;
  }

  setImages(data || []);
};

useEffect(() => {
  const fetchImages = async () => {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("page", page)
      .order("display_order", { ascending: true });

    if (error) {
      console.error(error);
      showMessage("error", "Failed to load images.");
      return;
    }

    setImages(data || []);
  };

  fetchImages();
}, [tableName, page]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const cleanFileName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filePath = `${uploadFolder}/${Date.now()}-${cleanFileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      showMessage("error", "Image upload failed.");
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    setImageUrl(data.publicUrl);
    showMessage("success", "Image uploaded successfully.");
  };

  const handleCreate = async () => {
    if (!imageUrl) {
      showMessage("error", "Please upload or paste an image URL first.");
      return;
    }

    const { error } = await supabase.from(tableName).insert([
      {
        page,
        image_url: imageUrl,
        caption,
        display_order: Number(displayOrder) || 0,
        published,
      },
    ]);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to save image.");
      return;
    }

    setCaption("");
    setImageUrl("");
    setDisplayOrder(0);
    setPublished(true);
    showMessage("success", "Image saved.");
    loadImages();
  };

  const handleUpdate = async (item, field, value) => {
    const { error } = await supabase
      .from(tableName)
      .update({ [field]: value })
      .eq("id", item.id)
      .eq("page", page);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to update image.");
      return;
    }

    setImages((prev) =>
      prev.map((image) =>
        image.id === item.id ? { ...image, [field]: value } : image
      )
    );

    showMessage("success", "Image updated.");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", deleteTarget.id)
      .eq("page", page);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to delete image.");
      return;
    }

    setImages(images.filter((image) => image.id !== deleteTarget.id));
    setDeleteTarget(null);
    showMessage("success", "Image deleted.");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
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

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="bg-[#202632] rounded-xl border border-white/5 p-6 mt-6 mb-10">
            <h2 className="uppercase text-2xl font-black tracking-widest">
              {addTitle}
            </h2>

            <div className="mt-6 grid md:grid-cols-2 gap-5">
              <input
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="bg-[#101118] p-4 border border-white/5 outline-none focus:border-[#c8a96a]"
              />

              <input
                type="number"
                placeholder="Display Order"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                className="bg-[#101118] p-4 border border-white/5 outline-none focus:border-[#c8a96a]"
              />

              <input
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-[#101118] p-4 border border-white/5 outline-none focus:border-[#c8a96a] md:col-span-2"
              />

              <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-white/10 bg-[#101118] text-center hover:border-[#c8a96a] transition md:col-span-2">
                <span className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px] font-bold">
                  Upload Image
                </span>

                <span className="mt-3 text-slate-500 italic font-serif text-sm">
                  Drag or choose file
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>

              <label className="flex items-center gap-3 text-slate-300">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Published
              </label>
            </div>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-6 h-64 w-full object-cover rounded border border-white/10"
              />
            )}

            <button
              onClick={handleCreate}
              className="mt-6 bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
            >
              {saveLabel}
            </button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-[#202632] rounded-xl border border-white/5 overflow-hidden"
              >
                <img
                  src={image.image_url}
                  alt={image.caption || "Carousel image"}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5 space-y-4">
                  <input
                    value={image.caption || ""}
                    onChange={(e) =>
                      handleUpdate(image, "caption", e.target.value)
                    }
                    className="w-full bg-[#101118] p-3 border border-white/5"
                  />

                  <input
                    type="number"
                    value={image.display_order || 0}
                    onChange={(e) =>
                      handleUpdate(
                        image,
                        "display_order",
                        Number(e.target.value) || 0
                      )
                    }
                    className="w-full bg-[#101118] p-3 border border-white/5"
                  />

                  <label className="flex items-center gap-3 text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(image.published)}
                      onChange={(e) =>
                        handleUpdate(image, "published", e.target.checked)
                      }
                    />
                    Published
                  </label>

                  <button
                    onClick={() => setDeleteTarget(image)}
                    className="text-red-400 uppercase tracking-[0.2em] text-[10px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete Image?"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete Image"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </main>
  );
}

export default CarouselImageManagement;