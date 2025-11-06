import { useEffect, useState } from "react";

interface BannerData {
  banner_image: string;
  banner_link: string;
}

export default function BannerHeader() {
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await fetch(
        "https://api.oyonews.com.ng/wp-json/wp/v2/pages?slug=site-settings&acf_format=standard"
      );
      const data = await res.json();
      const acf = data[0]?.acf as BannerData; 
      if (acf?.banner_image) setBanner(acf);
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <a href={banner.banner_link} target="_blank" rel="noopener noreferrer">
      <img
        src={banner.banner_image}
        alt="Banner"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
          maxWidth: "1200px",
        }}
        loading="lazy"
      />
    </a>
  );
}
