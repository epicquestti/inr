import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { connect } from "@lib/backend"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ObjectId } from "bson"
import { AppProps } from "next/app"
import Head from "next/head"
import { FC, useEffect } from "react"
import { CookiesProvider } from "react-cookie"
import SuperJSON from "superjson"
import theme from "../styles/theme"
const clientSideEmotionCache = createCache({ key: "css" })
var a
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

  useEffect(() => {
    async function bla() {
      await connect()
    }

    bla()
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>INR Publicações</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
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
