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

const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
  expand: ["line_items", "customer"],
});

console.log("Full Stripe session:", JSON.stringify(fullSession, null, 2));

const shipping =
  fullSession.shipping_details ||
  fullSession.collected_information?.shipping_details ||
  session.shipping_details ||
  session.collected_information?.shipping_details;

const customer = fullSession.customer_details;
const metadata = fullSession.metadata || {};

console.log("Shipping details:", shipping);
console.log("Customer details:", customer);
console.log("Stripe webhook metadata:", metadata);

    if (!shipping?.address) {
      console.error("Missing shipping address");
      return res.status(200).json({ received: true });
    }

    if (!metadata.printfulVariantId) {
      console.error("Missing printfulVariantId in Stripe metadata");
      return res.status(200).json({ received: true });
    }

    const variantValue = metadata.printfulVariantId;
    const isNumericVariant = /^\d+$/.test(variantValue);

    const item = isNumericVariant
      ? {
          sync_variant_id: Number(variantValue),
          quantity: 1,
        }
      : {
          external_variant_id: variantValue,
          quantity: 1,
        };


    const printfulOrder = {
      external_id: fullSession.id,
      confirm: false,
      recipient: {
        name: shipping.name || customer?.name || "Customer",
        email: customer?.email,
        phone: customer?.phone || "",
        address1: shipping.address.line1,
        address2: shipping.address.line2 || "",
        city: shipping.address.city,
        state_code: shipping.address.state,
        country_code: shipping.address.country,
        zip: shipping.address.postal_code,
      },
      items: [item],
    };

console.log("Stripe webhook metadata:", metadata);
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