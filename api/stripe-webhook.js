import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
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

    console.log("Shipping:", shipping);
    console.log("Customer:", customer);
    console.log("Metadata:", metadata);

    // TEMP DEBUG
console.log("Shipping object:", JSON.stringify(shipping, null, 2));
console.log("Metadata object:", JSON.stringify(metadata, null, 2));

// Temporarily disable these checks
// if (!shipping?.address) {
//   console.error("Missing shipping address", session);
//   return res.status(200).json({ received: true });
// }

// if (!metadata.printfulVariantId) {
//   console.error("Missing printfulVariantId", metadata);
//   return res.status(200).json({ received: true });
// }

const printfulOrder = {
  confirm: false,
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
    sync_variant_id: 5358583058,
    quantity: 1,
  },
],
};

    console.log("Printful order payload:", printfulOrder);

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
      console.log("Printful draft order created:", printfulData);
    }
  }

  return res.status(200).json({ received: true });
}