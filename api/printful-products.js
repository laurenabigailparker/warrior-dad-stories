export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.printful.com/stores", {
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