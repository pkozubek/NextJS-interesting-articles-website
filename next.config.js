const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  async redirects() {
    return [
      {
        source: "/articles",
        destination: "/articles/1",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "octodex.github.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
  },
});
