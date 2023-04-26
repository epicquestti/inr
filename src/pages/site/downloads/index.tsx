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
  Typography
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
  }[]
}> = async context => {
  return {
    props: {
      versions: [
        {
          downloadSpecification: "WINDOWS",
          version: "0.2.99",
          buttonText: "DOWNLOAD",
          hasExe: true,
          icone: "desktop_windows",
          endereco:
            "https://object.epicquestti.com.br/inr/leitorinr/releases/Instalador_Leitor_INR_0.2.72.exe"
        },
        {
          downloadSpecification: "WIN STORE",
          version: "0.2.99",
          buttonText: "ACESSAR",
          icone: "desktop_windows",
          endereco: "ms-windows-store://navigatetopage/?Id=Gaming"
        }
      ]
    }
  }
}

const DownloadPage = ({
  versions
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [downloadAreaShow, setDownloadAreaShow] = useState<boolean>(false)
  const [loadingAreaShow, setLoadingAreaShow] = useState<boolean>(true)

  useEffect(() => {
    if (!router.isReady) return

    setTimeout(() => {
      setLoadingAreaShow(false)
      setTimeout(() => {
        setDownloadAreaShow(true)
      }, 500)
    }, 3000)
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
            <Image
              alt="INR Publicações"
              width={140}
              height={80}
              src="https://inrpublicacoes.com.br/site/img/topo/logo_inr.svg"
            />

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
            <Typography variant="h4" color="GrayText">
              VERSÃO RECOMENDADA PARA O SEU SISTEMA OPERACIONAL
            </Typography>
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
              fullWidth
              variant="contained"
              size="large"
              onClick={async () => {}}
            >
              Plataforma
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
                  NOTA: Título
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="caption" color="black">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Elit ut aliquam purus sit amet. Nulla pellentesque
                    dignissim enim sit amet. Accumsan tortor posuere ac ut
                    consequat semper viverra nam libero. Id diam maecenas
                    ultricies mi eget mauris pharetra et. Vitae nunc sed velit
                    dignissim sodales ut eu sem. Quam viverra orci sagittis eu
                    volutpat odio facilisis mauris. Scelerisque viverra mauris
                    in aliquam sem fringilla ut. Pharetra diam sit amet nisl
                    suscipit. Ornare lectus sit amet est placerat in egestas
                    erat. Vel eros donec ac odio tempor. Pellentesque massa
                    placerat duis ultricies lacus. Malesuada pellentesque elit
                    eget gravida. Rhoncus aenean vel elit scelerisque mauris
                    pellentesque pulvinar pellentesque habitant. Tincidunt augue
                    interdum velit euismod in. Sagittis orci a scelerisque purus
                    semper eget duis at tellus.
                  </p>

                  <p>
                    Pellentesque adipiscing commodo elit at imperdiet dui
                    accumsan sit. Ultrices dui sapien eget mi proin sed libero
                    enim sed. Cursus euismod quis viverra nibh cras pulvinar
                    mattis nunc sed. Cursus metus aliquam eleifend mi in nulla
                    posuere. Diam ut venenatis tellus in metus vulputate. Sit
                    amet volutpat consequat mauris. Quis enim lobortis
                    scelerisque fermentum dui. Nisl rhoncus mattis rhoncus urna
                    neque viverra. Consequat ac felis donec et odio
                    pellentesque. Ornare arcu odio ut sem nulla pharetra diam
                    sit amet. Arcu felis bibendum ut tristique et. Felis
                    bibendum ut tristique et egestas quis ipsum suspendisse
                    ultrices.
                  </p>

                  <p>
                    Lectus sit amet est placerat in. Cras fermentum odio eu
                    feugiat pretium nibh. Gravida in fermentum et sollicitudin
                    ac. Lectus arcu bibendum at varius vel. Blandit massa enim
                    nec dui nunc mattis. Habitant morbi tristique senectus et
                    netus et malesuada. Pellentesque habitant morbi tristique
                    senectus. At imperdiet dui accumsan sit. Odio ut sem nulla
                    pharetra diam sit amet nisl. Euismod lacinia at quis risus
                    sed. Tortor at auctor urna nunc id cursus metus aliquam
                    eleifend. Vitae congue eu consequat ac felis donec. Mi
                    tempus imperdiet nulla malesuada pellentesque elit eget
                    gravida cum.
                  </p>

                  <p>
                    Eget aliquet nibh praesent tristique magna. Id aliquet risus
                    feugiat in ante metus dictum. Pellentesque dignissim enim
                    sit amet venenatis urna cursus eget nunc. Eget arcu dictum
                    varius duis. Ultrices dui sapien eget mi proin. Id semper
                    risus in hendrerit gravida rutrum quisque non tellus.
                    Viverra aliquet eget sit amet tellus cras adipiscing.
                    Consequat ac felis donec et odio pellentesque diam volutpat
                    commodo. Vulputate odio ut enim blandit volutpat maecenas.
                    Et ligula ullamcorper malesuada proin libero nunc. Tellus
                    pellentesque eu tincidunt tortor aliquam nulla facilisi.
                    Blandit aliquam etiam erat velit scelerisque in dictum.
                    Tincidunt dui ut ornare lectus. Massa vitae tortor
                    condimentum lacinia quis vel eros. Mauris nunc congue nisi
                    vitae suscipit tellus. Mattis ullamcorper velit sed
                    ullamcorper morbi tincidunt. Et malesuada fames ac turpis
                    egestas maecenas pharetra convallis. Velit laoreet id donec
                    ultrices tincidunt arcu non sodales. Consectetur libero id
                    faucibus nisl tincidunt.
                  </p>

                  <p>
                    Est placerat in egestas erat imperdiet sed euismod nisi.
                    Pulvinar neque laoreet suspendisse interdum. Urna id
                    volutpat lacus laoreet non curabitur gravida. Odio aenean
                    sed adipiscing diam donec adipiscing tristique. Etiam sit
                    amet nisl purus in mollis nunc sed id. In nibh mauris cursus
                    mattis molestie a iaculis. Eu ultrices vitae auctor eu augue
                    ut lectus. Sollicitudin nibh sit amet commodo nulla
                    facilisi. Morbi tincidunt augue interdum velit euismod in
                    pellentesque massa placerat. Sit amet aliquam id diam
                    maecenas ultricies. Feugiat in fermentum posuere urna nec
                    tincidunt praesent semper feugiat. Amet massa vitae tortor
                    condimentum lacinia quis. Viverra tellus in hac habitasse
                    platea dictumst vestibulum. Ac feugiat sed lectus vestibulum
                    mattis ullamcorper. Eleifend quam adipiscing vitae proin.
                    Magna fringilla urna porttitor rhoncus dolor purus. Sed
                    euismod nisi porta lorem.
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
