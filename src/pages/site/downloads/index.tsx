/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  Icon,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect, useState } from "react"

export const getServerSideProps: GetServerSideProps<{
  versions: {
    icone?: string
    downloadSpecification: string
    version: string
    buttonText?: string
    hasExe?: boolean
    endereco: string
    type: "W" | "WS" | "L" | "MC"
  }[]
}> = async context => {
  return {
    props: {
      versions: [
        {
          downloadSpecification: "WINDOWS",
          version: "0.2.72",
          buttonText: "DOWNLOAD",
          hasExe: true,
          icone: "desktop_windows",
          endereco:
            "https://object.epicquestti.com.br/inr/leitorinr/releases/Instalador_Leitor_INR_0.2.72.exe",
          type: "W"
        }
        // {
        //   downloadSpecification: "WIN STORE",
        //   version: "0.2.72",
        //   buttonText: "ACESSAR",
        //   icone: "desktop_windows",
        //   hasExe: false,
        //   endereco: "ms-windows-store://navigatetopage/?Id=Gaming",
        //   type: "WS"
        // }
      ]
    }
  }
}

const DownloadPage = ({
  versions
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [op, setOp] = useState<{ texto: string; type: string; link: string }>({
    texto: "Download",
    type: "W",
    link: ""
  })
  const [downloadAreaShow, setDownloadAreaShow] = useState<boolean>(false)
  const [loadingAreaShow, setLoadingAreaShow] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("sm"))

  useEffect(() => {
    if (!router.isReady) return

    setLoading(true)
    const finded = versions.find(v => v.type === "W")

    if (
      window.navigator.platform === "Win32" ||
      window.navigator.platform === "Windows"
    ) {
      setOp({
        texto: "Download Windows",
        type: "W",
        link: finded?.endereco || ""
      })
    }

    if (
      window.navigator.platform === "Linux" ||
      window.navigator.platform === "Linux x86_64" ||
      window.navigator.platform === "Linux i686 X11" ||
      window.navigator.platform === "Linux x86_64 X11"
    ) {
      setOp({
        texto: "Download Linux",
        type: "L",
        link: finded?.endereco || ""
      })
    }

    if (
      window.navigator.platform === "iPhone " ||
      window.navigator.platform === "iPod" ||
      window.navigator.platform === "iPad" ||
      window.navigator.platform === "Macintosh" ||
      window.navigator.platform === "MacIntel" ||
      window.navigator.platform === "MacPPC"
    ) {
      setOp({
        texto: "Download MAC",
        type: "MC",
        link: finded?.endereco || ""
      })
    }

    setTimeout(() => {
      setLoadingAreaShow(false)
      setTimeout(() => {
        setDownloadAreaShow(true)
        setLoading(false)
      }, 500)
    }, 2000)
  }, [router.isReady])

  return (
    <DBox>
      {/*TOPO - Linha 1 */}
      <Box
        sx={{
          background: "#fff",
          width: "100%",
          display: "flex",
          height: 100,
          alignItems: "center"
        }}
      >
        <Container>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: 1
            }}
          >
            <a href="https://inrpublicacoes.com.br/site/inicio">
              <Image
                alt="INR Publicações"
                width={140}
                height={80}
                src="https://inrpublicacoes.com.br/site/img/topo/logo_inr.svg"
              />
            </a>

            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <Box sx={{ m: 1 }}>
                <Typography variant="body2">Download Leitor INR</Typography>
              </Box>
              <Icon>desktop_windows</Icon>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Linha 2 */}
      <Box
        sx={{
          width: "100%",
          display: "inline-block",
          height: 180,
          alignItems: "center"
        }}
      >
        <Container>
          <Box
            sx={{
              width: "60%",
              display: "inline-flex",
              height: 180,
              alignItems: "center"
            }}
          >
            {matches ? (
              <Typography variant="h4" color="GrayText">
                VERSÃO RECOMENDADA PARA O SEU SISTEMA OPERACIONAL
              </Typography>
            ) : (
              <Typography variant="body2" color="GrayText">
                VERSÃO RECOMENDADA PARA O SEU SISTEMA OPERACIONAL
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              width: "40%",
              display: "inline-flex",
              height: 180,
              alignItems: "center"
            }}
          >
            <Button
              disabled={loading}
              fullWidth
              variant="contained"
              size="large"
              onClick={async () => {
                router.push(op.link)
              }}
            >
              {loading ? "Aguarde." : op.texto}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Linha 3 */}
      <Box
        sx={{
          background: "#fff",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          pb: 2
        }}
      >
        <Container>
          <Collapse in={loadingAreaShow} timeout="auto" unmountOnExit>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "220px",
                    display: "inline-block",
                    paddingTop: 5
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      mb: 3
                    }}
                  >
                    <CircularProgress color="primary" />
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Typography variant="body1">
                      carregando versões disponíveis, aguarde...
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Collapse>
          <Collapse in={downloadAreaShow} timeout="auto" unmountOnExit>
            <Grid container spacing={3} justifyContent="center">
              {versions.length > 0 &&
                versions.map((item, index) => (
                  <Grid
                    key={`index-version-${index}`}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <div
                        style={{
                          width: "230px",
                          height: "230px",
                          background: "#000000",
                          borderRadius: "8px",
                          padding: "4px",
                          boxSizing: "border-box"
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "30%",
                            background: "#000000",
                            borderRadius: "8px 8px 0px 0px",
                            textAlign: "center",
                            color: "#EBEBEB",
                            fontSize: 18,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Icon sx={{ mr: 1 }} fontSize="small">
                            {item.icone ? item.icone : "desktop_windows"}
                          </Icon>
                          {item.downloadSpecification}
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "70%",
                            background: "#EBEBEB",
                            borderRadius: "0px 0px 8px 8px",
                            paddingTop: 40,
                            paddingLeft: 8,
                            paddingRight: 8,
                            display: "inline-block"
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 8
                            }}
                          >
                            <Button
                              fullWidth
                              variant="contained"
                              color="success"
                              size="large"
                              onClick={() => {
                                router.push(item.endereco)
                              }}
                            >
                              {item.buttonText ? item.buttonText : "DOWNLOAD"}
                            </Button>
                          </div>

                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Typography variant="caption">
                              {item.hasExe && ".EXE"} <strong>versão:</strong>{" "}
                              {item.version}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Collapse>
        </Container>
      </Box>

      {/* NOTAS - Linha 4 */}
      <Box
        sx={{
          width: "100%",
          display: "inline-flex",

          background: "#EBEBEB",
          pt: 3,
          pb: 3
        }}
      >
        <Container>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" color="GrayText">
                  Leitor INR
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="caption" color="black">
                  <p>
                    <strong>Leitor INR</strong>
                  </p>
                  <p>Versão atual: 0.2.72</p>
                  <p>
                    O <strong>Leitor INR</strong> é um aplicativo para
                    distribuição livre e gratuita destinada a{" "}
                    <strong>Assinantes INR.</strong>
                  </p>
                  <p>
                    O <strong>Leitor INR</strong> não coleta quaisquer dados
                    pessoais do seu usuário.
                  </p>
                  <p>
                    O <strong>Leitor INR</strong> é livre de vírus e ou
                    dispositivos maliciosos.
                  </p>
                  <p>
                    Após a instalação do <strong>Leitor INR</strong> no
                    computador com sistema Windows © (marca registrada Microsoft
                    Corporation), o usuário será notificado a cada nova
                    publicação dos <strong>Boletins Eletrônicos INR</strong> e{" "}
                    <strong>Classificadores INR</strong>.
                  </p>
                  <p>
                    O <strong>Leitor INR</strong>, nesta versão, destina-se,
                    exclusivamente, à notificação dos boletins distribuídos pelo{" "}
                    <strong>INR</strong>, revelando ao seu usuário a respectiva
                    publicação no <strong>Portal INR</strong>
                    (https://inrpublicacoes.com.br/site/inicio).
                  </p>
                  <p>
                    A leitura integral do conteúdo dos boletins se dará pelo
                    acesso ao <strong>Portal INR</strong>, onde serão
                    solicitados login e senha exclusivos do
                    <strong>Assinante INR</strong> (os mesmos já utilizados para
                    a obtenção de todo o conteúdo do portal).
                  </p>
                  <p>
                    Ao acessar o <strong>Portal INR</strong>, o{" "}
                    <strong>Assinante INR</strong> concorda com os termos de uso
                    vigentes no site.
                  </p>
                  <p>
                    O aplicativo <strong>Leitor INR</strong> é propriedade
                    intelectual da Boletins Informativos Ltda., editora das{" "}
                    <strong>Publicações INR</strong>.
                  </p>
                  <p>
                    Em caso de dúvidas, favor enviar e-mail para
                    faleconosco@inr.com.br.
                  </p>
                  <p>
                    <strong>Publicações INR</strong> © 2023. Todos os direitos
                    reservados.
                  </p>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "inline-flex",
          background: "#1A1A4E",
          pt: 3,
          pb: 3
        }}
      >
        <Container>
          <Grid container spacing={2} alignContent={"center"}>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <img
                src="https://inrpublicacoes.com.br/site/img/rodape/logo_inr_branco.svg"
                alt="inr logo"
                title="INR"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <p style={{ color: "white", fontSize: 15 }}>
                Central do Assinante: (11) 2959-0220
                faleconosco@inrpublicacoes.com.br
              </p>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <p style={{ color: "white", fontSize: 15 }}>
                Localização:
                <span>Rua Voluntários da Pátria, 2.468 - 23º andar</span>
                <span>Santana - São Paulo/SP - CEP.02402-000</span>
              </p>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DBox>
  )
}

export default DownloadPage

const DBox: FC<{ children?: ReactNode }> = ({ ...props }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "block",
        backgroundColor: "#EBEBEB",
        height: "100Vh"
      }}
    >
      {props.children}
    </Box>
  )
}
