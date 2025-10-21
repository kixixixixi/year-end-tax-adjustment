/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/year-end-tax-adjustment" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
