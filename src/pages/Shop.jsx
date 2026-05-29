import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Shop() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  };

  fetchProducts();
}, []);

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#171c25] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
              Warrior Dad Store
            </p>

            <h1 className="uppercase font-black text-6xl md:text-8xl leading-[0.92]">
              Carry The <br />
              Story <br />
              Forward.
            </h1>

            <p className="mt-8 max-w-xl text-slate-300 italic font-serif text-xl leading-9">
              Books, guides, shirts, event exclusives, and future projects
              created to carry service, fatherhood, resilience, and legacy
              beyond the page.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            <Trust icon="◇" label="Veteran Owned" />
            <Trust icon="▣" label="Book Launch May 23" />
            <Trust icon="★" label="Early Acclaim" />
          </div>
        </div>
      </section>

      {/* LEGACY DIVIDER */}
      <section
        className="relative px-8 md:px-20 py-40 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(10,12,16,0.78),
              rgba(10,12,16,0.88)
            ),
            url('/carry-the-story-forward.webp')
          `,
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-8">
            More Than Merchandise
          </p>

          <h2 className="uppercase font-black text-5xl md:text-7xl leading-[0.95]">
            This Was Never Meant <br />
            To Be A Product.
          </h2>

          <h3 className="mt-8 text-[#c8a96a] uppercase font-black text-4xl md:text-5xl">
            It Was Meant To Be A Legacy.
          </h3>

          <p className="mt-10 max-w-4xl mx-auto text-slate-300 italic font-serif text-xl leading-10">
            Every book, coin, guide, and future project exists for one purpose:
            carrying stories, lessons, and moments forward to the people who
            need them.
          </p>
        </div>
      </section>

      {/* FEATURED BOOK */}
      <section className="bg-[#11141b] px-8 md:px-20 py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[360px_1fr] gap-24 items-center">
          <div className="text-center">
            <img
              src="/book-cover.png"
              alt="Warrior Dad Book"
              className="w-72 mx-auto rounded-sm border border-white/10 shadow-2xl"
            />

            <p className="mt-6 text-[#c8a96a]">★★★★★</p>

            <p className="text-xs text-slate-500">
              100 pages of poetry and illustrations
            </p>
          </div>

          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-5">
              Featured Project
            </p>

            <h2 className="uppercase font-black text-5xl md:text-6xl">
              Warrior Dad
            </h2>

            <h3 className="mt-3 uppercase text-slate-500 font-black text-2xl">
              A Collection Of Odes
            </h3>

            <p className="mt-8 text-slate-300 font-serif text-lg leading-9 max-w-3xl">
              A book of poetry, illustration, memory, sacrifice, humor, and
              legacy — written between service, fatherhood, reflection, and the
              quiet moments that changed everything.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-8">
              <Meta value="$29.97" label="Hardcover" />
              <Meta value="$2.99" label="Ebook Preorder" />
              <Meta value="Free" label="Kindle Unlimited May 23" />
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition">
                View Book Details
              </button>

              <button className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 uppercase tracking-[0.18em] text-[11px] hover:bg-[#c8a96a] hover:text-black transition">
                Download Companion Guide
              </button>
            </div>

            <p className="mt-5 text-xs text-slate-600">
              Coins are event-exclusive. Additional products are planned for
              future releases.
            </p>
          </div>
        </div>
      </section>

<section
  className="relative py-40 bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(10,12,16,0.70),
        rgba(10,12,16,0.88)
      ),
      url('/service-family-legacy.webp')
    `,
  }}
>
  <div className="max-w-5xl mx-auto text-center px-8">
    <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
      Service • Family • Legacy
    </p>

    <h2 className="uppercase font-black text-5xl md:text-7xl leading-[0.95]">
      Some Stories <br />
      Are Carried.
    </h2>

    <p className="mt-8 max-w-3xl mx-auto text-slate-300 italic font-serif text-xl leading-10">
      Not in books. Not on shelves. But in the values,
      commitments, and people we choose to carry forward.
    </p>
  </div>
</section>


      {/* CHALLENGE COINS */}
      <section className="bg-[#171c25] px-8 md:px-20 py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
              Event Exclusive
            </p>

            <h2 className="uppercase font-black text-5xl md:text-6xl leading-tight">
              Warrior Dad <br />
              Challenge Coins
            </h2>

            <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
              Created as a symbol of remembrance, resilience, and shared
              experience. These coins are available exclusively at Warrior Dad
              speaking events, book signings, and special appearances.
            </p>

            <p className="mt-8 text-slate-400 leading-8">
              More than merchandise, these coins are intended to be carried,
              collected, and passed forward as reminders of service, sacrifice,
              family, and purpose.
            </p>

            <div className="mt-10">
              <span className="bg-[#c8a96a]/15 text-[#c8a96a] px-5 py-3 uppercase tracking-[0.25em] text-[10px]">
                Event Exclusive
              </span>
            </div>
          </div>

          <div>
            <img
              src="/warrior-dad-coin.png"
              alt="Warrior Dad Challenge Coin"
              className="rounded-2xl border border-white/10 shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section className="bg-[#1a1f27] px-8 md:px-20 py-28">
        <p className="text-center text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
          Product Collection
        </p>

        <h2 className="text-center uppercase font-black text-5xl mb-16">
          Built To Grow With The Story
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          
        {products.length === 0 ? (
  <div className="col-span-full text-center py-20 text-slate-500">
    No products available yet.
  </div>
) : (
  products.map((product) => (
           <Link
  to={`/shop/${product.slug}`}
  key={product.name}
  className="bg-[#202632] border border-white/5 rounded-xl overflow-hidden hover:border-[#c8a96a]/50 hover:-translate-y-2 transition duration-500 block"
>
              <div className="h-64 bg-[#151922] flex items-center justify-center overflow-hidden">
              {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    className="h-full w-full object-cover"
  />
                ) : (
                  <div className="text-center px-8">
                    <p className="text-[#c8a96a] text-4xl font-black">
  ${Number(product.price).toFixed(2)}
</p>
                    <p className="text-slate-600 uppercase tracking-[0.25em] text-xs">
                      Image Coming Soon
                    </p>
                  </div>
                )}
              </div>

              <div className="p-8">
                <p className="text-slate-500 uppercase tracking-[0.25em] text-[10px]">
                  {product.category}
                </p>

                <h3 className="mt-3 uppercase font-black text-2xl">
                  {product.name}
                </h3>

                <p className="line-clamp-3 mt-6 text-slate-400 italic font-serif text-xl">
  {product.description}
</p>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center gap-6">
                  <span className="text-[#c8a96a] text-2xl font-black">
                    ${product.price}
                  </span>

                  <span className="text-slate-400 uppercase tracking-[0.2em] text-[10px] text-right">
                    {product.featured ? "Featured" : "Available"}
                  </span>
                </div>
              </div>
            </Link>
                    ))
)}
        </div>


        <p className="max-w-4xl mx-auto mt-12 text-center text-slate-500 text-sm leading-7">
          Product images and purchase links will be finalized once current store
          assets are received. Coins are event-exclusive. Shipping terms,
          fulfillment details, and product availability may vary by item.
        </p>
      </section>


      {/* THE ROAD CONTINUES */}
<section
  className="relative py-40 bg-cover bg-center overflow-hidden"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(10,12,16,0.55),
        rgba(10,12,16,0.85)
      ),
      url('/the-road-continues.webp')
    `,
  }}
>
  <div className="max-w-5xl mx-auto text-center px-8">
    <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px] mb-6">
      The Journey Continues
    </p>

    <h2 className="uppercase font-black text-5xl md:text-7xl leading-[0.95]">
      Your Story. <br />
      Their Future.
    </h2>

    <p className="mt-8 max-w-3xl mx-auto text-slate-300 italic font-serif text-xl leading-10">
      Every lesson shared, every story told, and every life impacted
      becomes part of something larger than ourselves.
    </p>
  </div>
</section>

      {/* FUTURE PRODUCTS */}
      <section className="bg-[#202632] px-8 md:px-20 py-28 text-center">
        <span className="bg-[#c8a96a] text-black px-5 py-2 uppercase tracking-[0.25em] text-[10px] font-bold">
          Future Products
        </span>

        <p className="mt-8 text-slate-500 italic font-serif text-lg">
          The story does not end with one book.
        </p>

        <h2 className="mt-6 uppercase font-black text-5xl">
          More Stories Are Coming
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-slate-400 italic font-serif text-xl leading-9">
          Warrior Dad Stories is built to grow — future books, speaking tools,
          storytelling resources, merchandise, canvas art collaborations, and
          creative projects are already part of the long-term vision.
        </p>

        <Link
          to="/contact"
          className="inline-block mt-10 bg-[#c8a96a] text-black px-12 py-5 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
        >
          Start A Conversation
        </Link>
      </section>

      {/* TRUST BAR */}
      <section className="bg-[#11141b] px-8 md:px-20 py-10 grid md:grid-cols-4 gap-8 text-slate-400 text-sm">
        <TrustBar icon="▣" text="Veteran-owned business" />
        <TrustBar icon="★" text="Early reader acclaim" />
        <TrustBar icon="◇" text="Story-first products" />
        <TrustBar icon="↻" text="Built to grow long term" />
      </section>

      <Footer />
    </main>
  );
}

function Trust({ icon, label }) {
  return (
    <div>
      <div className="text-[#c8a96a] text-3xl">{icon}</div>

      <p className="mt-4 uppercase tracking-[0.25em] text-[10px] text-slate-400">
        {label}
      </p>
    </div>
  );
}

function Meta({ value, label }) {
  return (
    <div>
      <h4 className="text-[#c8a96a] uppercase text-3xl font-black">
        {value}
      </h4>

      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mt-2">
        {label}
      </p>
    </div>
  );
}

function TrustBar({ icon, text }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-[#c8a96a]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default Shop;