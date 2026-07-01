export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const url = id
      ? `https://api.printful.com/sync/products/${id}`
      : "https://api.printful.com/sync/products";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}