import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function Footer() {
  const [settings, setSettings] = useState(null);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const loadFooter = async () => {
      const { data: settingsData, error: settingsError } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (settingsError) {
        console.error(settingsError);
      } else {
        setSettings(settingsData);
      }

   const { data: badgeData, error: badgeError } = await supabase
  .from("footer_badges")
  .select("*")
  .eq("published", true)
  .order("sort_order", { ascending: true });

console.log("FOOTER BADGES:", badgeData);
console.log("FOOTER BADGE ERROR:", badgeError);

if (badgeError) {
  console.error("FOOTER BADGE ERROR:", badgeError);
} else {
  console.log("FOOTER BADGE DATA:", badgeData);
  setBadges(badgeData || []);
}
    };

    loadFooter();
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
              {settings?.footer_brand_name || "Warrior Dad Stories"}
            </span>
          </Link>

          <p className="mt-6 text-slate-400 italic font-serif leading-8 max-w-sm">
            {settings?.footer_text ||
              "Stories forged in service, strengthened by love, and carried forward through legacy, leadership, and storytelling."}
          </p>

          <p className="mt-8 text-slate-500 italic font-serif text-sm">
            {settings?.footer_tagline || "Smile and the world smiles with you."}
          </p>
        </div>

        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[10px] mb-6">
            {settings?.footer_navigation_title || "Navigation"}
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
            <Link to="/contact" className="block hover:text-[#c8a96a] transition">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[10px] mb-6">
            {settings?.footer_connect_title || "Connect"}
          </p>

          <div className="space-y-4 text-slate-400">
            {settings?.youtube_url && <FooterLink href={settings.youtube_url} label="YouTube" />}
            {settings?.instagram_url && <FooterLink href={settings.instagram_url} label="Instagram" />}
            {settings?.facebook_url && <FooterLink href={settings.facebook_url} label="Facebook" />}
            {settings?.business_facebook_url && <FooterLink href={settings.business_facebook_url} label="Warrior Dad Facebook" />}
            {settings?.linkedin_url && <FooterLink href={settings.linkedin_url} label="LinkedIn" />}
            {settings?.x_url && <FooterLink href={settings.x_url} label="X" />}

            <div className="pt-4 space-y-2 text-slate-500 border-t border-white/5">
              <a
                href={`mailto:${settings?.contact_email || "tj_warriordad@warriordadstories.com"}`}
                className="block hover:text-[#c8a96a] transition"
              >
                {settings?.contact_email || "tj_warriordad@warriordadstories.com"}
              </a>

              <a
                href={`mailto:${settings?.derek_contact_email || "derek_warriordad@warriordadstories.com"}`}
                className="block hover:text-[#c8a96a] transition"
              >
                {settings?.derek_contact_email || "derek_warriordad@warriordadstories.com"}
              </a>
            </div>

            {badges.length > 0 && (
  <div className="pt-6 border-t border-white/5 space-y-6">
    {badges.map((badge) => (
                  <a
                    key={badge.id}
                    href={badge.link_url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center hover:opacity-80 transition"
                  >
                    {badge.title && (
                      <p className="font-bold text-slate-300">{badge.title}</p>
                    )}

                    {badge.subtitle && (
                      <p className="text-slate-500">{badge.subtitle}</p>
                    )}

                    {badge.image_url && (
                    <img
  src={badge.image_url}
  alt={badge.title || "Footer badge"}
  className="mt-4 max-h-24 max-w-[220px] mx-auto object-contain"
/>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center text-slate-600 text-sm">
        <p>{settings?.copyright_text || "© 2026 Warrior Dad Stories"}</p>

        <p>
          {settings?.footer_business_badge ||
            "A Disabled Veteran-Owned Business"}
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block hover:text-[#c8a96a] transition"
    >
      {label}
    </a>
  );
}

export default Footer;