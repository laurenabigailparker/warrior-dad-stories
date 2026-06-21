import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function Footer() {
  const [settings, setSettings] = useState(null);

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

      setSettings(data);
    };

    loadSettings();
  }, []);

  return (
    <footer className="bg-black border-t border-white/5 px-8 md:px-20 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
        <div>
          <Link to="/" className="flex items-center gap-4">
            <img
              src="/wds-logo-primary.png"
              alt="Warrior Dad Stories logo"
              className="h-14 w-14 object-contain"
            />

            <span className="uppercase tracking-[0.22em] text-[#c8a96a] font-bold text-sm">
              Warrior Dad Stories
            </span>
          </Link>

          <p className="mt-6 text-slate-400 italic font-serif leading-8 max-w-sm">
            {settings?.footer_text ||
              "Stories forged in service, strengthened by love, and carried forward through legacy, leadership, and storytelling."}
          </p>

          <p className="mt-8 text-slate-500 italic font-serif text-sm">
            Smile and the world smiles with you.
          </p>
        </div>

        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[10px] mb-6">
            Navigation
          </p>

          <div className="space-y-4 uppercase text-sm tracking-[0.18em] text-slate-400">
            <Link to="/" className="block hover:text-[#c8a96a] transition">
              Home
            </Link>

            <Link to="/shop" className="block hover:text-[#c8a96a] transition">
              Shop
            </Link>

         <Link to="/about" className="block hover:text-[#c8a96a] transition">
  About TJ
</Link>

<Link to="/derek" className="block hover:text-[#c8a96a] transition">
  Meet Derek
</Link>

<Link to="/blog" className="block hover:text-[#c8a96a] transition">
  Perspectives & Conversations
</Link>

            <Link to="/forge" className="block hover:text-[#c8a96a] transition">
              The Creative Forge
            </Link>

            <Link
              to="/contact"
              className="block hover:text-[#c8a96a] transition"
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[10px] mb-6">
            Connect
          </p>

          <div className="space-y-4 text-slate-400">
            {settings?.youtube_url && (
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#c8a96a] transition"
              >
                YouTube
              </a>
            )}

            {settings?.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#c8a96a] transition"
              >
                Instagram
              </a>
            )}

            {settings?.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#c8a96a] transition"
              >
                Facebook
              </a>
            )}

           <div className="pt-4 space-y-2 text-slate-500">
  <a
    href={`mailto:${
      settings?.contact_email ||
      "tj_warriordad@warriordadstories.com"
    }`}
    className="block hover:text-[#c8a96a] transition"
  >
    {settings?.contact_email ||
      "tj_warriordad@warriordadstories.com"}
  </a>

  <a
    href={`mailto:${
      settings?.derek_contact_email ||
      "derek_warriordad@warriordadstories.com"
    }`}
    className="block hover:text-[#c8a96a] transition"
  >
    {settings?.derek_contact_email ||
      "derek_warriordad@warriordadstories.com"}
  </a>
</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center text-slate-600 text-sm">
        <p>
          {settings?.copyright_text || "© 2026 Warrior Dad Stories"}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-center">
          <p>A Disabled Veteran-Owned Business</p>

          
        </div>
      </div>
    </footer>
  );
}

export default Footer;