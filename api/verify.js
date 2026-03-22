export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { licenseKey, productUrl } = req.body;

  if (!licenseKey || !productUrl) {
    return res.status(400).json({ error: "Missing licenseKey or productUrl" });
  }

  try {
    const response = await fetch(
      `https://payhip.com/api/v1/license/verify?product_link=${encodeURIComponent(productUrl)}&license_key=${encodeURIComponent(licenseKey)}`,
      {
        headers: {
          Authorization: process.env.PAYHIP_API_KEY,
        },
      }
    );

    const data = await response.json();

    if (data?.data?.status === "active") {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification failed" });
  }
}
