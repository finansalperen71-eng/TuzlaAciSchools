import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/blog-detay/code-org-ile-yapay-zek%C3%A2-destekli-egitim",
        destination: "/blog/code-org-ile-yapay-zeka-destekli-egitim",
        permanent: true,
      },
      {
        source:
          "/blog-detay/dil-ogrenimi-icin-en-dogru-yas%3A-cocugunuza-nasil-destek-olabilirsiniz-",
        destination: "/blog/dil-ogreniminde-dogru-yas",
        permanent: true,
      },
      {
        source: "/blog-detay/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
