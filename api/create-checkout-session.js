import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, price, image, slug, productId, size, color, printfulVariantId } =
      req.body;

    const baseUrl = "https://warrior-dad-stories-clean.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      phone_number_collection: {
        enabled: true,
      },

      metadata: {
        productId: productId || "",
        slug: slug || "",
        size: size || "",
        color: color || "",
        printfulVariantId: printfulVariantId || "",
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: size ? `${name} - ${size}` : name,
              images: image ? [image] : [],
            },
            unit_amount: Math.round(Number(price) * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${baseUrl}/thank-you`,
      cancel_url: `${baseUrl}/shop/${slug}`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to create checkout session.",
    });
  }
}