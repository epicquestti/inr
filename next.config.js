module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    host: process.env.HOST,
    env: process.env.NODE_ENV,
    accessRegion: process.env.ACCESS_REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  images: {
    domains: ["object.epicquestti.com.br", "inrpublicacoes.com.br"]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, amz-sdk-request, amz-sdk-invocation-id, authorization, x-amz-content-sha256, x-amz-date, x-amz-user-agent"
          }
        ]
      }
    ]
  }
}
