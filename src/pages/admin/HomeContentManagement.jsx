import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

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

function getFieldLabel(item) {
  const key = `${item.section}_${item.field}`;

  if (fieldLabels[key]) {
    return fieldLabels[key];
  }

  return `${item.section.replaceAll("_", " ")} / ${item.field.replaceAll(
    "_",
    " "
  )}`;
}

function HomeContentManagement() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

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
        {items.map((item) => (
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

            <textarea
              value={item.value || ""}
              onChange={(e) => handleChange(item.id, e.target.value)}
              className="mt-4 w-full min-h-[120px] bg-[#11141b] border border-white/10 rounded-lg p-4 text-white outline-none focus:border-[#c8a96a]"
            />

            <button
              onClick={() => handleSave(item)}
              className="mt-4 bg-[#c8a96a] text-black px-6 py-3 text-xs uppercase tracking-[0.18em] font-bold hover:bg-white transition"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeContentManagement;