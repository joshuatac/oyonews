"use client";

export default function BannerHeader() {
  const banner = {
    banner_image: "https://api.oyonews.com.ng/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-06-at-12.53.40_8aaa7433.jpg",
    banner_link: "https://oyonews.com.ng",
  };

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
