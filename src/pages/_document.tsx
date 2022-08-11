import Document, { Head, Html, Main, NextScript } from "next/document"
import theme from "../styles/theme"

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta charSet="utf-8" />
          <meta name="author" content="Epic Quest, Epic Quest TI" />
          <meta name="copyright" content="INR Publicações (c) 2022" />
          <meta
            name="description"
            content="INR Publicações, Criação de conteúdo informatívo especializado para cartórios."
          />
          <meta
            name="keywords"
            content="inr, publicações, cartórios, cartório, cartorios, advogados, tabelião, cartorário"
          />
          <meta name="application-name" content="INR Publicações" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://object.epicquestti.com.br/inr/assets/favicon_16.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://object.epicquestti.com.br/inr/assets/favicon_32x32.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="https://object.epicquestti.com.br/inr/assets/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="https://object.epicquestti.com.br/inr/assets/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="https://object.epicquestti.com.br/inr/assets/apple-touch-icon-152x152.png"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
