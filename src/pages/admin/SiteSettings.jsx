import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function SiteSettings() {
const [settings, setSettings] = useState({
  author_name: "",
  author_bio: "",
  contact_email: "",
  derek_contact_email: "",
  instagram_url: "",
  facebook_url: "",
  business_facebook_url: "",
  linkedin_url: "",
  x_url: "",
  youtube_url: "",
  footer_text: "",
  copyright_text: "",
});
   const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(error);
        return;
      }

   setSettings({
  author_name: data.author_name || "",
  author_bio: data.author_bio || "",
  contact_email: data.contact_email || "",
  derek_contact_email: data.derek_contact_email || "",
  instagram_url: data.instagram_url || "",
  facebook_url: data.facebook_url || "",
  business_facebook_url: data.business_facebook_url || "",
  linkedin_url: data.linkedin_url || "",
  x_url: data.x_url || "",
  youtube_url: data.youtube_url || "",
  footer_text: data.footer_text || "",
  copyright_text: data.copyright_text || "",
});
    };

    loadSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

const handleSave = async () => {
  const { error } = await supabase
    .from("site_settings")
    .update(settings)
    .eq("id", 1);

  if (error) {
    console.error(error);

    setMessageType("error");
    setMessage("Failed to save settings.");

    setTimeout(() => setMessage(""), 4000);
    return;
  }

  setMessageType("success");
  setMessage("Settings saved successfully.");

  setTimeout(() => setMessage(""), 4000);
};

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Site Settings" back="/admin/dashboard" />

        <section className="p-8 grid lg:grid-cols-[1fr_360px] gap-8">
         {message && (
  <div
    className={`lg:col-span-2 rounded-lg px-5 py-4 border text-sm font-medium ${
      messageType === "success"
        ? "bg-green-500/10 border-green-500/20 text-green-300"
        : "bg-red-500/10 border-red-500/20 text-red-300"
    }`}
  >
    {message}
  </div>
)}
         
          <div className="space-y-8">
            <Panel title="General Site Info">
              <Field
                label="Author Name"
                value={settings.author_name}
                onChange={(e) => handleChange("author_name", e.target.value)}
              />

              <TextArea
                label="Author Bio"
                value={settings.author_bio}
                onChange={(e) => handleChange("author_bio", e.target.value)}
              />

              <Field
                label="Contact Email"
                value={settings.contact_email}
                onChange={(e) => handleChange("contact_email", e.target.value)}
              />
              <Field
  label="Derek Contact Email"
  value={settings.derek_contact_email}
  onChange={(e) => handleChange("derek_contact_email", e.target.value)}
/>
            </Panel>

            <Panel title="Social Links">
              <Field
                label="Instagram URL"
                value={settings.instagram_url}
                onChange={(e) => handleChange("instagram_url", e.target.value)}
              />

              <Field
                label="Facebook URL"
                value={settings.facebook_url}
                onChange={(e) => handleChange("facebook_url", e.target.value)}
              />

              <Field
                label="YouTube URL"
                value={settings.youtube_url}
                onChange={(e) => handleChange("youtube_url", e.target.value)}
              />
              <Field
  label="LinkedIn URL"
  value={settings.linkedin_url || ""}
  onChange={(e) =>
    setSettings({
      ...settings,
      linkedin_url: e.target.value,
    })
  }
/>

<Field
  label="Business Facebook URL"
  value={settings.business_facebook_url || ""}
  onChange={(e) =>
    setSettings({
      ...settings,
      business_facebook_url: e.target.value,
    })
  }
/>

<Field
  label="X / Twitter URL"
  value={settings.x_url || ""}
  onChange={(e) =>
    setSettings({
      ...settings,
      x_url: e.target.value,
    })
  }
/>
            </Panel>

            <Panel title="Footer Content">
              <TextArea
                label="Footer Text"
                value={settings.footer_text}
                onChange={(e) => handleChange("footer_text", e.target.value)}
              />

              <Field
                label="Copyright Text"
                value={settings.copyright_text}
                onChange={(e) => handleChange("copyright_text", e.target.value)}
              />
            </Panel>
          </div>

          <aside className="space-y-6">
            <Panel title="Preview">
              <p className="text-slate-500 uppercase tracking-[0.25em] text-[10px]">
                Author
              </p>

              <h3 className="mt-3 text-2xl font-black uppercase">
                {settings.author_name || "Author Name"}
              </h3>

              <p className="mt-4 text-slate-400 italic font-serif leading-7">
                {settings.author_bio || "Author bio preview will appear here."}
              </p>

              <p className="mt-6 text-[#c8a96a] text-sm">
                {settings.contact_email || "contact@email.com"}
              </p>
            </Panel>

            <Panel title="Publish">
              <p className="text-slate-500 text-sm leading-7">
                These settings can power footer text, contact email, author
                information, and social links across the public site.
              </p>

              <button
                onClick={handleSave}
                className="mt-6 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
              >
                Save Settings
              </button>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div className="mb-6 last:mb-0">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        className="w-full bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div className="mb-6 last:mb-0">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <textarea
        value={value}
        onChange={onChange}
        className="w-full h-36 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
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

export default SiteSettings;