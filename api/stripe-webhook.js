import Stripe from "stripe";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const PRINTFUL_PRODUCT_IDS = {
  "warrior-husband-tee": 440244509,
  "warrior-son-tee": 440244515,
  "warrior-brother-tee": 440244513,
  "warrior-dad-tee": 440244506,
  "warrior-wife-tee": 440244499,
  "warrior-mom-tee": 440244492,
  "warrior-sister-tee": 440244484,
  "warrior-daughter-tee": 440244482,
  "warrior-dad-polo-leadership-series": 440244474,
};

async function getSyncVariantId({ slug, color, size }) {
  const productId = PRINTFUL_PRODUCT_IDS[slug];

  if (!productId) {
    throw new Error(`Missing Printful product ID for slug: ${slug}`);
  }

  const response = await fetch(
    `https://api.printful.com/sync/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Printful product lookup failed:", data);
    throw new Error("Printful product lookup failed");
  }

  const variant = data.result.sync_variants.find(
    (item) =>
      item.size?.toLowerCase() === size?.toLowerCase() &&
      item.color?.toLowerCase() === color?.toLowerCase()
  );

  if (!variant) {
    throw new Error(`No Printful variant found for ${slug} / ${color} / ${size}`);
  }

  return variant.id;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const sig = req.headers["stripe-signature"];
  const rawBody = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const shipping = session.collected_information?.shipping_details;
    const customer = session.customer_details;
    const metadata = session.metadata || {};

    if (!shipping?.address) {
      console.error("Missing shipping address", session);
      return res.status(200).json({ received: true });
    }

    if (!metadata.slug || !metadata.color || !metadata.size) {
      console.error("Missing product metadata", metadata);
      return res.status(200).json({ received: true });
    }

    try {
      const syncVariantId = await getSyncVariantId({
        slug: metadata.slug,
        color: metadata.color,
        size: metadata.size,
      });

      const printfulOrder = {
        confirm: true,
        recipient: {
          name: shipping.name || customer?.name || "Customer",
          email: customer?.email || "",
          phone: customer?.phone || "",
          address1: shipping.address.line1,
          address2: shipping.address.line2 || "",
          city: shipping.address.city,
          state_code: shipping.address.state,
          country_code: shipping.address.country,
          zip: shipping.address.postal_code,
        },
        items: [
          {
            sync_variant_id: syncVariantId,
            quantity: 1,
          },
        ],
      };

      const printfulResponse = await fetch("https://api.printful.com/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(printfulOrder),
      });

      const printfulData = await printfulResponse.json();

      if (!printfulResponse.ok) {
        console.error("Printful order failed:", printfulData);
      } else {
        console.log("Printful order created:", printfulData);
      }
    } catch (error) {
      console.error("Printful fulfillment error:", error.message);
    }
  }

  return res.status(200).json({ received: true });
}