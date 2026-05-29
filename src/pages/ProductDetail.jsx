import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

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
        <div className="py-40 text-center text-slate-500">
          Loading product...
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#11141b] text-white">
      <Navbar />

      <section className="px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/shop"
            className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px]"
          >
            ← Back To Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-20 mt-12">
            <div>
              <div className="bg-[#202632] rounded-xl overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[600px] object-cover"
                  />
                ) : (
                  <div className="h-[600px] flex items-center justify-center text-slate-600">
                    No Image
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                {product.category}
              </p>

              <h1 className="mt-4 uppercase font-black text-5xl">
                {product.name}
              </h1>

              <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
                {product.description}
              </p>

              <div className="mt-10">
                <span className="text-[#c8a96a] text-5xl font-black">
                  ${product.price}
                </span>
              </div>

              {product.featured && (
                <div className="mt-6">
                  <span className="bg-[#c8a96a]/15 text-[#c8a96a] px-4 py-2 uppercase tracking-[0.2em] text-[10px]">
                    Featured Product
                  </span>
                </div>
              )}

              <div className="mt-12 flex gap-4">
                <button className="bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.2em] text-[11px] font-bold">
                  Purchase Coming Soon
                </button>

                <Link
                  to="/contact"
                  className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 uppercase tracking-[0.2em] text-[11px]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default ProductDetail;