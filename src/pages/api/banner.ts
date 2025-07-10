import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://api.oyonews.com.ng/wp-json/wp/v2/pages?slug=site-settings&acf_format=standard"
    );

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to fetch banner" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching banner:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
