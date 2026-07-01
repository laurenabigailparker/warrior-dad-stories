import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [openSection, setOpenSection] = useState("product_details");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProduct(data);
    };

    fetchProduct();
  }, [slug]);

if (!product) {
  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      <section className="px-8 py-32 text-center">
        <p className="text-slate-400 italic font-serif">
          Loading product...
        </p>
      </section>

      <Footer />
    </main>
  );
}

  const colors = product.colors
    ? product.colors.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  const sizes = product.sizes
    ? product.sizes.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

const handleCheckout = async () => {
  try {
    const finalColor = selectedColor || colors[0] || "";
    const finalSize = selectedSize || sizes[0] || "";

    const variantKey = `${finalColor}_${finalSize}`;

    const printfulVariants =
      typeof product.printful_variants === "string"
        ? JSON.parse(product.printful_variants)
        : product.printful_variants || {};

    const printfulVariantId = printfulVariants[variantKey] || "";

    if (!printfulVariantId) {
      alert(`This variant is not mapped yet: ${variantKey}`);
      return;
    }

console.log("Checkout product:", product);
console.log("Final size:", finalSize);
console.log("Final color:", finalColor);
console.log("Printful Variant ID:", printfulVariantId);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        productId: product.id,
        color: finalColor,
        size: finalSize,
        printfulVariantId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to create checkout session.");
    }

    if (!data.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    window.location.assign(data.url);
  } catch (error) {
    console.error("Checkout error:", error);
    alert(error.message || "Unable to start checkout.");
  }
};

  


  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      <section className="px-6 md:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/shop"
            className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px]"
          >
            ← Back To Shop
          </Link>

          <div className="grid lg:grid-cols-[1fr_520px] gap-16 mt-12 items-start">
            <div className="bg-[#202632] rounded-2xl overflow-hidden border border-white/10">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[620px] object-cover"
                />
              ) : (
                <div className="h-[620px] flex items-center justify-center text-slate-600">
                  No Image
                </div>
              )}
            </div>

            <div>
              <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                {product.category || "Product"}
              </p>

              <h1 className="mt-4 uppercase font-black text-5xl leading-tight">
                {product.name}
              </h1>

              <p className="mt-6 text-[#c8a96a] text-4xl font-black">
                ${Number(product.price || 0).toFixed(2)}
              </p>

              <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
                {product.description}
              </p>

              {colors.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between gap-4">
                    <p className="uppercase text-[10px] tracking-[0.25em] text-slate-500">
                      Color
                    </p>

                    <p className="text-sm text-slate-400">{selectedColor || colors[0]}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-3 border uppercase text-[11px] tracking-[0.15em] transition ${
                          (selectedColor || colors[0]) === color
                            ? "border-[#c8a96a] text-[#c8a96a] bg-[#c8a96a]/10"
                            : "border-white/10 text-slate-400 hover:border-[#c8a96a]/60"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sizes.length > 0 && (
                <div className="mt-8">
                  <p className="uppercase text-[10px] tracking-[0.25em] text-slate-500">
                    Size
                  </p>

                  <select
                    value={selectedSize || sizes[0] || ""}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="mt-4 bg-[#202632] border border-white/10 px-5 py-4 w-full outline-none focus:border-[#c8a96a]"
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

             <div className="mt-10 flex flex-col sm:flex-row gap-4">
 {product.in_stock ? (
  <button
    type="button"
    onClick={handleCheckout}
    className="bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-white transition"
  >
    Secure Checkout
  </button>
) : (
  <button
    type="button"
    disabled
    className="bg-slate-700 text-slate-400 px-10 py-4 uppercase tracking-[0.2em] text-[11px] font-bold cursor-not-allowed"
  >
    {product.button_label || "Coming Soon"}
  </button>
)}

  <Link
    to="/contact"
    className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 uppercase tracking-[0.2em] text-[11px] text-center hover:bg-[#c8a96a] hover:text-black transition"
  >
    Ask A Question
  </Link>
</div>

              {product.featured && (
                <div className="mt-6">
                  <span className="bg-[#c8a96a]/15 text-[#c8a96a] px-4 py-2 uppercase tracking-[0.2em] text-[10px]">
                    Featured Product
                  </span>
                </div>
              )}

              <div className="mt-12 border-t border-white/10">
                <AccordionSection
                  id="why_warrior_dad"
                  title="Why Warrior Dad"
                  content={product.why_warrior_dad}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />

                <AccordionSection
                  id="product_details"
                  title="Product Details"
                  content={product.product_details}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />

                <AccordionSection
                  id="fit_sizing"
                  title="Fit & Sizing"
                  content={product.fit_sizing}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />

                <AccordionSection
                  id="material_quality"
                  title="Material & Quality"
                  content={product.material_quality}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />

                <AccordionSection
                  id="care_instructions"
                  title="Care Instructions"
                  content={product.care_instructions}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />

                <AccordionSection
                  id="shipping_fulfillment"
                  title="Shipping & Fulfillment"
                  content={product.shipping_fulfillment}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />

                <AccordionSection
                  id="returns_exchanges"
                  title="Returns & Exchanges"
                  content={product.returns_exchanges}
                  openSection={openSection}
                  setOpenSection={setOpenSection}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}



function AccordionSection({
  id,
  title,
  content,
  openSection,
  setOpenSection,
}) {
  if (!content) return null;

  const isOpen = openSection === id;

  return (
    <div className="border-b border-white/10 py-6">
      <button
        type="button"
        onClick={() => setOpenSection(isOpen ? null : id)}
        className="w-full flex justify-between items-center gap-6 text-left"
      >
        <span className="uppercase tracking-[0.2em] font-bold text-sm">
          {title}
        </span>

        <span className="text-[#c8a96a] text-2xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="mt-5 text-slate-300 italic font-serif whitespace-pre-line leading-8">
          {content}
        </div>
      )}
    </div>
  );
}


export default ProductDetail;