function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 px-8 md:px-20 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-300" />

            <h2 className="uppercase tracking-[0.2em] text-[#c8a96a] font-bold text-sm">
              Warrior Dad Stories
            </h2>
          </div>

          <p className="mt-6 text-slate-500 italic font-serif">
            Stories forged in service, strengthened by love.
          </p>
        </div>

        <div className="space-y-4 uppercase text-sm tracking-[0.2em] text-slate-400">
          <p>Home</p>
          <p>Shop</p>
          <p>About</p>
          <p>Blog</p>
          <p>The Creative Forge</p>
          <p>Contact</p>
        </div>

        <div className="text-slate-500 space-y-4">
          <p>LinkedIn</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>contact@warriordadstories.com</p>
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

export default Footer;