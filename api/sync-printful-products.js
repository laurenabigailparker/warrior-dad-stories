
/* global process */

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    if (!process.env.PRINTFUL_API_KEY) {
      return res.status(500).json({ error: "Missing PRINTFUL_API_KEY" });
    }

    const response = await fetch("https://api.printful.com/store/products", {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(result);
    }

    const products = result.result || [];

    const syncedProducts = [];

    for (const item of products) {
      const productPayload = {
        name: item.name,
        slug: slugify(item.name),
        description: item.name,
        image: item.thumbnail_url || null,
        price: 0,
        category: "Merch",
        in_stock: true,
        featured: false,
        printful_product_id: String(item.id),
      };

      const { data, error } = await supabaseAdmin
        .from("products")
        .upsert(productPayload, {
          onConflict: "printful_product_id",
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        syncedProducts.push({
          name: item.name,
          status: "failed",
          error: error.message,
        });
        continue;
      }

      syncedProducts.push({
        id: data.id,
        name: data.name,
        printful_product_id: data.printful_product_id,
        status: "synced",
      });
    }

    return res.status(200).json({
      message: "Printful products synced.",
      count: syncedProducts.length,
      products: syncedProducts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong syncing Printful products.",
      details: error.message,
    });
  }
}