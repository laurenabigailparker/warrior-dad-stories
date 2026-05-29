import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Change this to true when preorder info is ready to show again
  const showPreOrder = false;

  return (
    <header className="sticky top-0 z-50 bg-[#080a0f]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
      {/* LOGO */}
<Link to="/" className="flex items-center gap-4">
  <img
    src="/wds-logo-primary.png"
    alt="Warrior Dad Stories logo"
    className="h-12 w-12 object-contain"
  />

  <span className="text-[#c8a96a] uppercase tracking-[0.25em] font-black text-sm">
    Warrior Dad Stories
  </span>
</Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 uppercase tracking-[0.2em] text-[11px] text-slate-300">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/forge">The Forge</Link>
          <Link to="/contact">Contact</Link>

          {showPreOrder && (
            <Link
              to="/preorder"
              className="bg-[#c8a96a] text-black px-5 py-3 font-bold"
            >
              Pre Order
            </Link>
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white text-3xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-[#101118] border-t border-white/5 px-6 py-8 space-y-6 uppercase tracking-[0.2em] text-[11px] text-slate-300">
          <Link to="/" className="block" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/shop" className="block" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>

          <Link to="/about" className="block" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link to="/blog" className="block" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>

          <Link to="/forge" className="block" onClick={() => setMenuOpen(false)}>
            The Forge
          </Link>

          <Link
            to="/contact"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {showPreOrder && (
            <Link
              to="/preorder"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#c8a96a] text-black px-5 py-4 text-center font-bold"
            >
              Pre Order
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;