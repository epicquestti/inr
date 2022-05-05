import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ObjectId } from "bson"
import { AppProps } from "next/app"
import Head from "next/head"
import React, { FC } from "react"
import { CookiesProvider } from "react-cookie"
import SuperJSON from "superjson"
import theme from "../styles/theme"
const clientSideEmotionCache = createCache({ key: "css" })
SuperJSON.registerCustom<ObjectId, string>(
  {
    isApplicable: (v): v is ObjectId => v instanceof ObjectId,
    serialize: v => v.toString(),
    deserialize: v => new ObjectId(v)
  },
  "objectid"
)

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { emotionCache = clientSideEmotionCache } = pageProps
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>INR Publicações</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon-76x76.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
