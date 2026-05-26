import Navbar from "../components/layout/Navbar";
import {
  HiOutlineShieldCheck,
  HiOutlineCube,
  HiOutlineStar,
  HiOutlineTruck,
  HiOutlineLockClosed,
  HiOutlineRefresh,
  HiOutlineBadgeCheck,
  HiOutlineMail,
} from "react-icons/hi";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

function Shop() {
  const products = [
    ["Book", "Warrior Dad", "Hardcover Edition", "$29.97", "Pre-Order"],
    ["Book", "Warrior Dad", "Ebook Edition", "$2.99", "Pre-Order"],
    ["Guide", "Companion Guide", "Free PDF Download", "Free", "Download Free"],
    ["Merch", "Warrior Dad Patch", "Mission Gear", "TBD", "Coming Soon"],
    ["Merch", "Mission Journal", "Warrior Dad Edition", "TBD", "Coming Soon"],
    ["Merch", "Forge Hoodie", "Apparel", "TBD", "Coming Soon"],
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      <Navbar />

      <section className="bg-[#171b25] px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
              Warrior Dad Stories Store
            </p>

            <h1 className="text-5xl md:text-7xl uppercase font-black leading-[0.95] tracking-wide">
              Gear Up. <br />
              Suit Up. <br />
              Show Up.
            </h1>

            <p className="mt-8 text-slate-400 italic font-serif text-lg">
              Books, guides, and mission gear for warriors and dads.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center text-slate-400">
            {[
              [HiOutlineShieldCheck, "Veteran Owned"],
              [HiOutlineCube, "Ships May 23"],
              [HiOutlineStar, "★★★★★ Rated"],
            ].map(([Icon, label]) => (
              <div key={label}>
                <Icon className="mx-auto text-[#c8a96a] text-2xl mb-3" />
                <p className="uppercase tracking-[0.25em] text-[10px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 grid lg:grid-cols-[420px_1fr] gap-28 items-center">
          <div className="flex flex-col items-center">
            <div className="relative w-80">
              <span className="absolute -top-3 right-[-14px] bg-[#c8a96a] text-black px-4 py-2 text-[10px] font-bold uppercase">
                Bestseller In Progress
              </span>

              <div className="h-[520px] bg-[#202632] border border-white/10 rounded-sm flex items-center justify-center">
                <span className="text-slate-500 text-xs uppercase tracking-[0.25em]">
                  Product Image
                </span>
              </div>
            </div>

            <div className="mt-5 text-[#c8a96a]">★★★★★</div>
            <p className="text-xs text-slate-500">
              Hardcover + Ebook available
            </p>
          </div>

          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-4">
              The Book
            </p>

            <h2 className="text-5xl uppercase font-black tracking-wide">
              Warrior Dad
            </h2>

            <h3 className="text-3xl uppercase font-black text-slate-500 mt-2">
              A Collection of Odes
            </h3>

            <p className="mt-8 text-slate-300 font-serif text-lg leading-8 max-w-3xl">
              A debut collection of odes and reflections written by a veteran
              and father about the space between duty and love. These are
              stories about showing up — in uniform and at home.
            </p>

            <div className="grid grid-cols-3 gap-8 mt-10">
              {[
                ["May 23", "Launch Date"],
                ["HC + Ebook", "Formats"],
                ["~220", "Pages"],
              ].map(([big, small]) => (
                <div key={big}>
                  <h4 className="text-[#c8a96a] uppercase text-3xl font-black">
                    {big}
                  </h4>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-2">
                    {small}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button className="bg-[#c8a96a] text-black px-10 py-4 text-[11px] uppercase tracking-[0.18em] font-bold">
                Hardcover — $29.97
              </button>
              <button className="text-slate-400 px-6 py-4 text-[11px] uppercase tracking-[0.18em]">
                Ebook — $2.99
              </button>
            </div>

            <p className="mt-5 text-xs text-green-700">
              ✓ Pre-orders ship May 23
            </p>

            <button className="mt-6 w-full bg-[#c8a96a] text-black px-10 py-5 text-[12px] uppercase tracking-[0.2em] font-bold">
              Pre-Order Now — $29.97
            </button>

            <p className="mt-4 text-center text-xs text-slate-600">
              Includes free Companion Guide (PDF)
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#1c222d] px-8 md:px-20 py-28">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] text-center mb-14">
          All Products
        </p>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(([category, name, subtitle, price, action]) => (
            <div
              key={`${name}-${subtitle}`}
              className="bg-[#202632] rounded-lg border border-white/5 p-8 min-h-[420px] flex flex-col justify-end"
            >
              <div className="h-28 flex items-center justify-center mb-auto">
                <div className="h-12 w-12 bg-slate-500/60" />
              </div>

              <p className="text-slate-500 uppercase tracking-[0.25em] text-[10px]">
                {category}
              </p>

              <h3 className="mt-3 text-2xl uppercase font-black">{name}</h3>

              <p className="mt-1 text-slate-400 italic font-serif">
                {subtitle}
              </p>

              <p className="mt-5 text-slate-400 italic font-serif text-sm leading-7">
                Placeholder product description. Student should replace this
                with Figma-approved copy and imagery.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-[#c8a96a] text-2xl font-black uppercase">
                  {price}
                </span>

                <button className="uppercase tracking-[0.25em] text-[10px] text-slate-300">
                  {action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#202632] border-y border-white/10 px-8 md:px-20 py-24 text-center">
        <span className="bg-[#c8a96a] text-black px-4 py-2 text-[10px] uppercase font-bold tracking-[0.18em]">
          Best Value
        </span>

        <h2 className="mt-8 text-4xl uppercase font-black">
          The Complete Warrior Dad Bundle
        </h2>

        <p className="mt-5 text-slate-400 italic font-serif">
          Everything you need to go deeper.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-10 text-slate-400 text-sm">
          <span>✓ Warrior Dad Hardcover</span>
          <span>✓ Companion Guide PDF</span>
          <span>✓ Priority Shipping</span>
        </div>

        <div className="mt-12">
          <span className="text-[#c8a96a] text-5xl font-black">$29.99</span>
          <span className="ml-4 text-green-700 text-sm uppercase">
            Save $9.99
          </span>
        </div>

        <button className="mt-8 bg-[#c8a96a] text-black px-16 py-5 text-[12px] uppercase tracking-[0.2em] font-bold">
          Get The Bundle
        </button>
      </section>

      <section className="bg-[#101118] px-8 md:px-20 py-10 grid md:grid-cols-4 gap-8 text-slate-400 text-sm">
        {[
          [HiOutlineTruck, "Free shipping on orders $35+"],
          [HiOutlineLockClosed, "Secure checkout"],
          [HiOutlineRefresh, "30-day satisfaction guarantee"],
          [HiOutlineBadgeCheck, "Veteran-owned business"],
        ].map(([Icon, text]) => (
          <div key={text} className="flex items-center justify-center gap-3">
            <Icon className="text-[#c8a96a] text-xl" />
            <span>{text}</span>
          </div>
        ))}
      </section>

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
            <a>Home</a>
            <a>Shop</a>
            <a>About</a>
            <a>Blog</a>
            <a>The Creative Forge</a>
            <a>Contact</a>
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
    </main>
  );
}

export default Shop;