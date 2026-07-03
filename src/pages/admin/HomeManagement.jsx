import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

const imageFieldKeys = [
  "author_message_poster",
  "hero_image",
  "reflection_background_image",
  "principles_background_image",
  "meet_tj_image",
  "meet_derek_image",

  // backup matches in case your Supabase rows are named differently
  "hero_background_image",
  "hero_background",
  "reflection_image",
  "principles_image",
];

const fieldLabels = {
  author_message_eyebrow: "Welcome Video Eyebrow",
  author_message_title: "Welcome Video Title",
  author_message_body: "Welcome Video Description",
  author_message_video: "Welcome Video YouTube Embed URL",
  author_message_poster: "Welcome Video Poster Image",

  hero_eyebrow: "Hero Eyebrow",
  hero_headline: "Hero Headline",
  hero_body: "Hero Body",
  hero_button_text: "Hero Button Text",
  hero_image: "Hero Image",

  meet_tj_eyebrow: "Meet TJ Eyebrow",
  meet_tj_heading: "Meet TJ Heading",
  meet_tj_body: "Meet TJ Body",
  meet_tj_button_text: "Meet TJ Button Text",
  meet_tj_button_url: "Meet TJ Button URL",
  meet_tj_image: "Meet TJ Image",
  meet_tj_image_alt: "Meet TJ Image Alt Text",

  meet_derek_eyebrow: "Meet Derek Eyebrow",
  meet_derek_heading: "Meet Derek Heading",
  meet_derek_body: "Meet Derek Body",
  meet_derek_button_text: "Meet Derek Button Text",
  meet_derek_button_url: "Meet Derek Button URL",
  meet_derek_image: "Meet Derek Image",
  meet_derek_image_alt: "Meet Derek Image Alt Text",
};

function getFieldKey(item) {
  return `${item.section}_${item.field}`;
}

function getFieldLabel(item) {
  const key = getFieldKey(item);

  if (fieldLabels[key]) return fieldLabels[key];

  return `${item.section.replaceAll("_", " ")} / ${item.field.replaceAll(
    "_",
    " "
  )}`;
}

function HomeContentManagement() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [uploadingId, setUploadingId] = useState("");

  useEffect(() => {
    async function fetchContent() {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "home")
        .order("section", { ascending: true })
        .order("field", { ascending: true });

      if (error) {
        console.error(error);
        setMessage("Could not load home page content.");
        return;
      }

      setItems(data || []);
    }

    fetchContent();
  }, []);

  const handleChange = (id, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const uploadImage = async (event, item) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingId(item.id);
    setMessage("Uploading image...");

    const fileExt = file.name.split(".").pop();
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();

 const uniqueId = crypto.randomUUID();

    const fileName = `home/${getFieldKey(
      item
    )}-${safeName}-${uniqueId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error(uploadError);
      setMessage("Image upload failed.");
      setUploadingId("");
      return;
    }

    const { data } = supabase.storage
      .from("site-images")
      .getPublicUrl(fileName);

    handleChange(item.id, data.publicUrl);

    setUploadingId("");
    setMessage("Image uploaded. Click Save to publish.");
  };

  const handleSave = async (item) => {
    const { error } = await supabase
      .from("site_content")
      .update({ value: item.value })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      setMessage("Could not save content.");
      return;
    }

    setMessage("Content saved.");
  };

  return (
    <div className="min-h-screen bg-[#11141b] text-white px-8 py-10">
      <Link
        to="/admin/dashboard"
        className="inline-flex items-center gap-2 text-[#c8a96a] uppercase tracking-[0.2em] text-[11px] hover:text-white transition mb-6"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-4xl font-black uppercase">Home Page Content</h1>

      <p className="mt-3 text-slate-400">
        Edit homepage text, image paths, button links, and YouTube embed URLs.
      </p>

      <p className="mt-3 text-slate-500 italic font-serif">
        For YouTube videos, paste the embed URL format:
        https://www.youtube.com/embed/VIDEOID
      </p>

      {message && <p className="mt-6 text-[#c8a96a]">{message}</p>}

      <div className="mt-10 space-y-6">
        {items.map((item) => {
          const key = getFieldKey(item);
          const isImage = imageFieldKeys.includes(key);

console.log("HOME FIELD:", key, "IS IMAGE:", isImage);

          return (
            <div
              key={item.id}
              className="bg-[#1b212b] border border-white/10 rounded-xl p-6"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[#c8a96a]">
                {getFieldLabel(item)}
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                {item.section} / {item.field}
              </p>

              {isImage ? (
                <div className="mt-4 bg-[#11141b] border border-white/10 rounded-lg p-5">
                  {item.value && (
                    <img
                      src={item.value}
                      alt={getFieldLabel(item)}
                      className="mb-4 h-48 w-full object-contain rounded border border-white/10 bg-black"
                    />
                  )}

                  <p className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px] font-bold mb-3">
                    Upload Image
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadImage(e, item)}
                    className="block w-full cursor-pointer rounded bg-[#202632] border border-white/10 px-4 py-4 text-sm text-slate-300 file:mr-4 file:cursor-pointer file:border-0 file:bg-[#c8a96a] file:px-4 file:py-2 file:text-black file:font-bold file:uppercase"
                  />

                  {uploadingId === item.id && (
                    <p className="mt-3 text-[#c8a96a] text-xs uppercase tracking-[0.2em]">
                      Uploading...
                    </p>
                  )}

                  <textarea
                    value={item.value || ""}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    className="mt-4 w-full min-h-[90px] bg-[#11141b] border border-white/10 rounded-lg p-4 text-white outline-none focus:border-[#c8a96a]"
                  />
                </div>
              ) : (
                <textarea
                  value={item.value || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="mt-4 w-full min-h-[120px] bg-[#11141b] border border-white/10 rounded-lg p-4 text-white outline-none focus:border-[#c8a96a]"
                />
              )}

              <button
                onClick={() => handleSave(item)}
                className="mt-4 bg-[#c8a96a] text-black px-6 py-3 text-xs uppercase tracking-[0.18em] font-bold hover:bg-white transition"
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeContentManagement;