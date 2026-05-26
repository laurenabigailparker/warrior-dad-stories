import Navbar from "../components/layout/Navbar";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import {
  HiOutlineMail,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

function Contact() {
  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      <Navbar />

      {/* Header */}
      <section className="bg-[#171b25] px-8 md:px-20 py-24 text-center border-b border-white/5">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
          Get In Touch
        </p>

        <h1 className="uppercase font-black text-5xl md:text-6xl">
          Let's Talk Mission.
        </h1>

        <p className="mt-6 text-slate-400 italic font-serif text-lg">
          For speaking, media, partnerships, and general inquiries.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-[#101118] px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-28">
          <form className="space-y-8">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              Send A Message
            </p>

            <Field label="Full Name" placeholder="Your full name" />
            <Field label="Email Address" placeholder="your@email.com" />
            <Field label="Subject" placeholder="" />

            <div>
              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Message
              </label>

              <textarea
                placeholder="Tell us what's on your mind..."
                className="w-full h-56 bg-[#1b1b21] border border-white/10 px-5 py-5 text-slate-300 outline-none focus:border-[#c8a96a] transition resize-none"
              />
            </div>

            <button
              type="button"
              className="bg-[#c8a96a] text-black px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition"
            >
              Send Message →
            </button>

            <p className="text-xs text-slate-600">
              We respond within 48 hours. Always.
            </p>
          </form>

          <aside className="space-y-14">
            <div>
              <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-8">
                Contact Info
              </p>

              <div className="space-y-6 text-slate-400 text-sm">
                <p className="flex items-center gap-4">
                  <HiOutlineMail className="text-[#c8a96a] text-xl" />
                  tj_warriordad@warriordadstories.com
                </p>

                <p className="flex items-center gap-4">
                  <HiOutlineGlobeAlt className="text-[#c8a96a] text-xl" />
                  warriordadstories.com
                </p>
              </div>
            </div>

            <div>
              <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-8">
                Social
              </p>

              <div className="space-y-6 text-slate-400 text-sm">
                <SocialRow icon={<FaFacebookF />} label="Facebook" value="/TJWarriorDad" />
                <SocialRow icon={<FaInstagram />} label="Instagram" value="@tjwarriordad" />
                <SocialRow icon={<FaXTwitter />} label="X (Twitter)" value="@TJWarriorDad" />
                <SocialRow icon={<FaLinkedinIn />} label="LinkedIn" value="thomas-tj-baird" />
              </div>
            </div>

            <p className="text-slate-500 text-sm">
              ● Typically responds within 24–48 hours
            </p>
          </aside>
        </div>
      </section>

      {/* Speaking CTA */}
      <section className="bg-[#202632] px-8 md:px-20 py-24 text-center border-y border-white/5">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          Speaking · Keynotes · Podcasts
        </p>

        <h2 className="mt-7 uppercase font-black text-4xl md:text-5xl">
          Bring The Warrior Dad Story To Your Stage
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-slate-400 italic font-serif text-lg leading-8">
          TJ brings firsthand stories of service, sacrifice, and fatherhood to
          audiences who need to hear them most.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-10 text-slate-500 uppercase tracking-[0.22em] text-[11px]">
          <span>Veteran Leadership</span>
          <span>Fatherhood</span>
          <span>Resilience</span>
          <span>Service & Sacrifice</span>
          <span>Storytelling</span>
        </div>

        <button className="mt-12 bg-[#c8a96a] text-black px-14 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition">
          Book TJ For Your Event →
        </button>
      </section>

      <Footer />
    </main>
  );
}

function Field({ label, placeholder }) {
  return (
    <div>
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full bg-[#1b1b21] border border-white/10 px-5 py-5 text-slate-300 outline-none focus:border-[#c8a96a] transition"
      />
    </div>
  );
}

function SocialRow({ icon, label, value }) {
  return (
    <div className="flex gap-4">
      <span className="text-slate-500 text-lg mt-1">{icon}</span>

      <div>
        <p className="text-slate-500 text-xs">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080a0f] px-8 md:px-20 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-slate-300" />

            <span className="text-[#c8a96a] uppercase tracking-[0.22em] font-bold">
              Warrior Dad Stories
            </span>
          </div>

          <p className="mt-6 text-slate-500 italic font-serif">
            Stories forged in service, strengthened by love.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.25em] text-slate-400">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/forge">The Creative Forge</a>
          <a href="/contact">Contact</a>
        </div>

        <div>
          <div className="flex gap-5 text-slate-500 text-lg">
            <FaLinkedinIn />
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
          </div>

          <p className="mt-5 text-slate-500 text-sm flex gap-3 items-center">
            <HiOutlineMail />
            contact@warriordadstories.com
          </p>
        </div>
      </div>

     <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex justify-between items-center text-slate-600 text-sm">
  <p>© 2026 Warrior Dad Stories</p>

  <div className="flex items-center gap-6">
    <p>A Disabled Veteran-Owned Business</p>

    <a
      href="/admin"
      className="uppercase tracking-[0.2em] hover:text-[#c8a96a] transition"
    >
      Admin
    </a>
  </div>
</div>
    </footer>
  );
}

export default Contact;