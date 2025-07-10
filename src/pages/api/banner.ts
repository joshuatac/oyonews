// pages/api/banner.ts

export const config = {
  runtime: 'edge', // 👈 Enable Edge Runtime
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(_: Request): Promise<Response> {
  try {
    const response = await fetch("https://api.oyonews.com.ng/wp-json/wp/v2/pages?slug=site-settings&acf_format=standard");

    if (!response.ok) {
      return new Response(JSON.stringify({ message: "Failed to fetch banner" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching banner:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
