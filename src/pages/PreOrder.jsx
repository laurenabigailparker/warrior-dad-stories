import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function PreOrder() {
  const products = [
    {
      category: "Book",
      title: "Warrior Dad",
      subtitle: "Hardcover Edition",
      desc: "100 pages of poetry and illustrations.",
      price: "$29.97",
      action: "Pre-Order",
    },
    {
      category: "Book",
      title: "Warrior Dad",
      subtitle: "Ebook Edition",
      desc: "Instant download on launch day.",
      price: "$2.99",
      action: "Pre-Order",
    },
    {
      category: "Guide",
      title: "Companion Guide",
      subtitle: "Free PDF Download",
      desc: "Reflection prompts and leadership insights.",
      price: "FREE",
      action: "Download",
    },
    {
      category: "Merch",
      title: "Warrior Dad Patch",
      subtitle: "Mission Gear",
      desc: "Embroidered shield patch.",
      price: "TBD",
      action: "Coming Soon",
    },
    {
      category: "Merch",
      title: "Mission Journal",
      subtitle: "Warrior Dad Edition",
      desc: "Tactical notebook for stories and reflections.",
      price: "TBD",
      action: "Coming Soon",
    },
    {
      category: "Merch",
      title: "Forge Hoodie",
      subtitle: "Apparel",
      desc: "Dark colorway hoodie with shield logo.",
      price: "TBD",
      action: "Coming Soon",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080a0f] text-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#171c27] px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              Warrior Dad Stories Store
            </p>

            <h1 className="mt-6 uppercase font-black leading-[0.9] text-6xl md:text-8xl">
              Gear Up.
              <br />
              Suit Up.
              <br />
              Show Up.
            </h1>

            <p className="mt-8 text-slate-400 italic font-serif text-xl">
              Books, guides, and mission gear for warriors and dads.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-10 pt-10">
            <Trust icon="◇" label="Veteran Owned" />
            <Trust icon="▣" label="Ships May 23" />
            <Trust icon="★" label="★★★★★ Rated" />
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="bg-[#0c0d15] px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="text-center">
            {/* STUDENTS: Replace with actual featured book image */}
            <div className="relative mx-auto w-[320px]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#78814b] text-white uppercase tracking-[0.2em] text-[10px] px-5 py-2">
                Bestseller In Progress
              </div>

              <div className="h-[520px] rounded-sm bg-[#1d2230] border border-white/5 flex items-center justify-center text-slate-500">
                Featured Book Image
              </div>
            </div>

            <p className="mt-8 text-[#c8a96a] text-xl tracking-[0.25em]">
              ★★★★★
            </p>

            <p className="mt-2 text-slate-500 text-sm">
              Hardcover + Ebook available
            </p>
          </div>

          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              The Book
            </p>

            <h2 className="mt-5 uppercase font-black text-6xl">
              Warrior Dad
            </h2>

            <h3 className="mt-4 uppercase text-slate-400 font-bold tracking-wide text-3xl">
              A Collection Of Odes
            </h3>

            <p className="mt-10 text-slate-400 leading-10 text-xl font-serif">
              A debut collection of odes and reflections written by a veteran
              and father about the space between duty and love.
            </p>

            <div className="mt-14 grid grid-cols-3 gap-10">
              <Meta title="May 23" label="Launch Date" />
              <Meta title="HC + Ebook" label="Formats" />
              <Meta title="~220" label="Pages" />
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button className="bg-[#c8a96a] text-black px-8 py-4 uppercase text-[11px] tracking-[0.2em] font-bold">
                Hardcover — $29.97
              </button>

              <button className="border border-white/10 text-slate-300 px-8 py-4 uppercase text-[11px] tracking-[0.2em]">
                Ebook — $2.99
              </button>
            </div>

            <p className="mt-6 text-[#78814b] text-sm">
              ✓ Pre-orders ship May 23
            </p>

            <button className="mt-8 w-full bg-[#c8a96a] hover:bg-white transition text-black py-5 uppercase tracking-[0.22em] text-[11px] font-bold">
              Pre-Order Now — $29.97
            </button>

            <p className="mt-5 text-center text-slate-600 text-sm">
              Includes free Companion Guide (PDF)
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-[#171c27] px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-16">
            All Products
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product.title + product.subtitle}
                className="bg-[#202632] rounded-2xl p-8 border border-white/5"
              >
                {/* STUDENTS: Replace image placeholder */}
                <div className="h-52 rounded-xl bg-[#2c3342] flex items-center justify-center text-slate-500">
                  Product Image
                </div>

                <div className="mt-8">
                  <p className="uppercase text-[10px] tracking-[0.3em] text-slate-500">
                    {product.category}
                  </p>

                  <h3 className="mt-3 uppercase font-bold text-3xl">
                    {product.title}
                  </h3>

                  <p className="mt-1 italic font-serif text-slate-400">
                    {product.subtitle}
                  </p>

                  <p className="mt-6 text-slate-500 leading-8">
                    {product.desc}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[#c8a96a] font-black text-4xl">
                      {product.price}
                    </span>

                    <span className="uppercase tracking-[0.22em] text-[11px] text-slate-400">
                      {product.action}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLE */}
      <section className="bg-[#202632] px-8 md:px-20 py-28 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="bg-[#c8a96a] text-black px-5 py-2 uppercase tracking-[0.25em] text-[10px] font-bold">
            Best Value
          </span>

          <h2 className="mt-10 uppercase font-black text-5xl md:text-6xl">
            The Complete Warrior Dad Bundle
          </h2>

          <p className="mt-8 text-slate-400 italic font-serif text-xl">
            Everything you need to go deeper.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-10 text-slate-300">
            <span>✓ Warrior Dad Hardcover</span>
            <span>✓ Companion Guide PDF</span>
            <span>✓ Priority Shipping</span>
          </div>

          <div className="mt-14 flex items-end justify-center gap-4">
            <span className="text-[#c8a96a] text-6xl font-black">
              $29.99
            </span>

            <span className="text-[#78814b] uppercase tracking-wide">
              Save $9.99
            </span>
          </div>

          <button className="mt-12 bg-[#c8a96a] text-black px-14 py-5 uppercase tracking-[0.22em] text-[11px] font-bold hover:bg-white transition">
            Get The Bundle
          </button>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-10 grid md:grid-cols-4 gap-10 text-slate-400 text-sm">
          <TrustBar icon="🚚" text="Free shipping on orders $35+" />
          <TrustBar icon="🔒" text="Secure checkout" />
          <TrustBar icon="↻" text="30-day satisfaction guarantee" />
          <TrustBar icon="◎" text="Veteran-owned business" />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Trust({ icon, label }) {
  return (
    <div className="text-center">
      <div className="flex justify-center text-[#c8a96a] text-2xl">
        {icon}
      </div>

      <p className="mt-4 uppercase tracking-[0.25em] text-[10px] text-slate-400">
        {label}
      </p>
    </div>
  );
}

function Meta({ title, label }) {
  return (
    <div>
      <p className="text-[#c8a96a] font-black text-3xl uppercase">
        {title}
      </p>

      <p className="mt-2 uppercase tracking-[0.25em] text-[10px] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function TrustBar({ icon, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-[#c8a96a] text-xl">{icon}</div>
      <p>{text}</p>
    </div>
  );
}

export default PreOrder;