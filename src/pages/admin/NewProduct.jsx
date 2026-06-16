import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";

function NewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    price: "",
    image: "",
    gallery_images: [],
    description: "",
    colors: "",
    sizes: "",
    why_warrior_dad: "",
    product_details: "",
    fit_sizing: "",
    material_quality: "",
    care_instructions: "",
    shipping_fulfillment: "",
    returns_exchanges: "",
    button_label: "Coming Soon",
    in_stock: true,
    featured: false,
  });

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setMessageType("error");
        setMessage("Could not load product.");
        return;
      }

      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        category: data.category || "",
        price: data.price || "",
        image: data.image || "",
        gallery_images: data.gallery_images || [],
        description: data.description || "",
        colors: data.colors || "",
        sizes: data.sizes || "",
        why_warrior_dad: data.why_warrior_dad || "",
        product_details: data.product_details || "",
        fit_sizing: data.fit_sizing || "",
        material_quality: data.material_quality || "",
        care_instructions: data.care_instructions || "",
        shipping_fulfillment: data.shipping_fulfillment || "",
        returns_exchanges: data.returns_exchanges || "",
        button_label: data.button_label || "Coming Soon",
        in_stock: data.in_stock ?? true,
        featured: data.featured ?? false,
      });
    };

    loadProduct();
  }, [id]);

  const showTimedMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const uploadProductImage = async (file, folder = "products") => {
    const cleanFileName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filePath = `${folder}/${Date.now()}-${cleanFileName}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const publicUrl = await uploadProductImage(file, "products");

      setFormData((prev) => ({
        ...prev,
        image: publicUrl,
      }));

      showTimedMessage("success", "Main product image uploaded.");
    } catch (error) {
      console.error(error);
      showTimedMessage("error", "Image upload failed.");
    }
  };

  const handleGalleryUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const publicUrl = await uploadProductImage(file, "gallery");
        uploadedUrls.push(publicUrl);
      }

      setFormData((prev) => ({
        ...prev,
        gallery_images: [...(prev.gallery_images || []), ...uploadedUrls],
      }));

      showTimedMessage("success", "Gallery images uploaded.");
    } catch (error) {
      console.error(error);
      showTimedMessage("error", "One or more gallery images failed to upload.");
    }
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: (prev.gallery_images || []).filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      price: Number(formData.price || 0),
      image: formData.image,
      gallery_images: formData.gallery_images || [],
      description: formData.description,
      colors: formData.colors,
      sizes: formData.sizes,
      why_warrior_dad: formData.why_warrior_dad,
      product_details: formData.product_details,
      fit_sizing: formData.fit_sizing,
      material_quality: formData.material_quality,
      care_instructions: formData.care_instructions,
      shipping_fulfillment: formData.shipping_fulfillment,
      returns_exchanges: formData.returns_exchanges,
      button_label: formData.button_label,
      in_stock: formData.in_stock,
      featured: formData.featured,
    };

    const { error } = isEditing
      ? await supabase.from("products").update(payload).eq("id", id)
      : await supabase.from("products").insert([payload]);

    if (error) {
      console.error(error);
      showTimedMessage("error", "Failed to save product.");
      return;
    }

    showTimedMessage(
      "success",
      isEditing ? "Product updated successfully." : "Product saved successfully."
    );

    setTimeout(() => {
      navigate("/admin/products");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop
          title={isEditing ? "Edit Product" : "Create New Product"}
          back="/admin/products"
        />

        <section className="p-8 grid lg:grid-cols-[1fr_340px] gap-8">
          <div className="lg:col-span-2">
            <StatusMessage message={message} type={messageType} />
          </div>

          <div className="bg-[#202632] rounded-lg p-8 grid md:grid-cols-2 gap-7">
            <Field
              label="Product Name"
              placeholder="Warrior Dad"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <Field
              label="Slug"
              placeholder="warrior-dad-hardcover"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />

            <Field
              label="Category"
              placeholder="Book / Merch / Guide"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />

            <Field
              label="Price"
              placeholder="29.97"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <Field
              label="Button Label"
              placeholder="Coming Soon"
              value={formData.button_label}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  button_label: e.target.value,
                })
              }
            />

            <div>
              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Product Image
              </label>

              <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-white/10 bg-[#101118] text-center hover:border-[#c8a96a] transition">
                <span className="text-[#c8a96a] uppercase tracking-[0.2em] text-[11px] font-bold">
                  Upload Product Image
                </span>

                <span className="mt-3 text-slate-500 italic font-serif text-sm">
                  Drag or choose file
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Status
              </label>

              <select
                value={formData.in_stock ? "active" : "draft"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    in_stock: e.target.value === "active",
                  })
                }
                className="w-full bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Product Gallery
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                className="w-full bg-[#101118] border border-white/5 px-5 py-4"
              />

              {(formData.gallery_images || []).length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {formData.gallery_images.map((url, index) => (
                    <div key={`${url}-${index}`} className="relative">
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="h-32 w-full object-cover rounded border border-white/10"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="absolute top-2 right-2 bg-black/80 text-white h-8 w-8 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
                Description
              </label>

              <textarea
                placeholder="Product description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full h-48 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
              />
            </div>

            <ProductTextArea
              label="Colors"
              field="colors"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Sizes"
              field="sizes"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Why Warrior Dad"
              field="why_warrior_dad"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Product Details"
              field="product_details"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Fit & Sizing"
              field="fit_sizing"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Material & Quality"
              field="material_quality"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Care Instructions"
              field="care_instructions"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Shipping & Fulfillment"
              field="shipping_fulfillment"
              formData={formData}
              setFormData={setFormData}
            />

            <ProductTextArea
              label="Returns & Exchanges"
              field="returns_exchanges"
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <aside className="space-y-6">
            <Panel title="Product Status">
              <label className="flex items-center gap-3 text-slate-400">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: e.target.checked,
                    })
                  }
                />
                Featured Product
              </label>

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-[#c8a96a] text-black py-4 uppercase tracking-[0.2em] text-[11px] font-bold"
              >
                {isEditing ? "Update Product" : "Save Product"}
              </button>
            </Panel>

            <Panel title="Product Image">
              <div className="h-64 bg-[#101118] border border-dashed border-white/10 rounded flex items-center justify-center text-slate-600 text-sm overflow-hidden">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Image Preview"
                )}
              </div>
            </Panel>

            <Panel title="Gallery Count">
              <p className="text-4xl font-black text-[#c8a96a]">
                {(formData.gallery_images || []).length}
              </p>
              <p className="mt-2 text-slate-500 italic font-serif text-sm">
                Gallery images uploaded
              </p>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function ProductTextArea({ label, field, formData, setFormData }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <textarea
        value={formData[field]}
        onChange={(e) =>
          setFormData({
            ...formData,
            [field]: e.target.value,
          })
        }
        className="w-full h-32 bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a] resize-none"
      />
    </div>
  );
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
        {label}
      </label>

      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#101118] border border-white/5 px-5 py-4 outline-none focus:border-[#c8a96a]"
      />
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-[#202632] rounded-lg p-6">
      <h3 className="uppercase tracking-[0.25em] text-[11px] text-[#c8a96a] mb-5">
        {title}
      </h3>

      {children}
    </div>
  );
}

function AdminSubTop({ title, back }) {
  return (
    <header className="h-20 bg-[#202632] px-8 grid grid-cols-3 items-center">
      <Link
        to={back}
        className="uppercase tracking-[0.2em] text-[11px] text-slate-400"
      >
        ← Back
      </Link>

      <h1 className="uppercase tracking-[0.25em] font-black text-center">
        {title}
      </h1>

      <div />
    </header>
  );
}

export default NewProduct;