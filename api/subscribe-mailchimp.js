import crypto from "crypto";

const MAILCHIMP_SERVER = "us8";
const MAILCHIMP_AUDIENCE_ID = "2fb024ada1";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { firstName, lastName, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const cleanEmail = email.toLowerCase().trim();

    const subscriberHash = crypto
      .createHash("md5")
      .update(cleanEmail)
      .digest("hex");

    const response = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}`,
      {
        method: "PUT",
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: cleanEmail,
          status_if_new: "subscribed",
          status: "subscribed",
          merge_fields: {
            FNAME: firstName || "",
            LNAME: lastName || "",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Mailchimp error:", data);
      return res.status(500).json({ error: "Mailchimp subscription failed" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Mailchimp route error:", error);
    return res.status(500).json({ error: "Unable to subscribe" });
  }
}