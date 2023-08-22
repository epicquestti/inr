/* eslint-disable @next/next/no-img-element */
import { connect } from "@lib/backend"
import { HttpRequest } from "@lib/frontend"
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
import updatesModel from "@schema/Updates"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect, useState } from "react"
import Outras1 from "../../../public/pageassets/Outras01.png"
import Outras2 from "../../../public/pageassets/Outras02.png"
import Outras3 from "../../../public/pageassets/Outras03.png"
import Outras4 from "../../../public/pageassets/Outras04.png"
import Outras5 from "../../../public/pageassets/Outras05.png"
import Outras6 from "../../../public/pageassets/Outras06.png"
import Outras7 from "../../../public/pageassets/Outras07.png"
import Outras8 from "../../../public/pageassets/Outras08.png"
import Outras9 from "../../../public/pageassets/Outras09.png"
import Outras10 from "../../../public/pageassets/Outras10.png"
import Outras11 from "../../../public/pageassets/Outras11.png"
import Outras12 from "../../../public/pageassets/Outras12.png"
import Outras13 from "../../../public/pageassets/Outras13.png"
import Outras14 from "../../../public/pageassets/Outras14.png"
import Outras15 from "../../../public/pageassets/Outras15.png"
import img0 from "../../../public/pageassets/img00.png"
import img1 from "../../../public/pageassets/img01.png"
import img2 from "../../../public/pageassets/img02.png"
import img3 from "../../../public/pageassets/img03.png"
import img4 from "../../../public/pageassets/img04.png"
import img5 from "../../../public/pageassets/img05.png"
import img6 from "../../../public/pageassets/img06.png"
import img7 from "../../../public/pageassets/img07.png"
import img8 from "../../../public/pageassets/img08.png"
import img9 from "../../../public/pageassets/img09.png"
import img10 from "../../../public/pageassets/img10.png"
import img11 from "../../../public/pageassets/img11.png"
import img12 from "../../../public/pageassets/img12.png"
import img13 from "../../../public/pageassets/img13.png"
// import img13 from "../../../public/pageassets/img13.png"
export const getServerSideProps: GetServerSideProps<{
  versions: {
    _id: string
    icone?: string
    downloadSpecification: string
    version: string
    buttonText?: string
    hasExe?: boolean
    endereco: string
    type: "W" | "WS" | "L" | "MC"
  }[]
}> = async context => {
  await connect()
  const res = await updatesModel.findOne({
    vigent: true
  })

  if (!res) return { props: { versions: [] } }

  return {
    props: {
      versions: [
        {
          _id: res._id.toString(),
          downloadSpecification: "WINDOWS",
          version: `${res.version}.${res.major}.${res.minor}`,
          buttonText: "DOWNLOAD",
          hasExe: true,
          icone: "desktop_windows",
          endereco: res.link,
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
  const [op, setOp] = useState<{
    texto: string
    type: string
    link: string
    _id: string
  }>({
    texto: "Download",
    type: "W",
    link: "",
    _id: ""
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
        link: finded?.endereco || "",
        _id: finded?._id || ""
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
        link: finded?.endereco || "",
        _id: finded?._id || ""
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
        link: finded?.endereco || "",
        _id: finded?._id || ""
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
                await HttpRequest.Get(`/api/v1/atualizacoes/${op._id}/register`)
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
                              onClick={async () => {
                                await HttpRequest.Get(
                                  `/api/v1/atualizacoes/${item._id}/register`
                                )
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
            <Grid
              container
              spacing={3}
              justifyContent="center"
              justifyItems="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img0.src}
                  alt="Bem vindo ao aplicativo Inr"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras1.src}
                  alt="O aplicativo Leitor INR foi criado para facilitar a leitura de todos os textos
                  divulgados pelo INR por meio dos Classificadores INR e Boletins Eletrônicos INR,
                  sendo, assim, substituto ideal ao e-mail, evitando a instabilidade e o acúmulo
                  de mensagens, além de agilizar a leitura com notificações em tempo real de
                  divulgação"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras2.src}
                  alt="Download e instalação"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  <strong>Veja como é simples, rápido e seguro.</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Para fazer o download do <strong>Leitor INR</strong> sugerimos
                  que siga as instruções (o passo a passo) que indicamos a
                  seguir:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras3.src}
                  alt="Primeiros passos"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Acesse{" "}
                  <a href="https://production.publicacoesinr.com.br/site/downloads">
                    https://production.publicacoesinr.com.br/site/downloads
                  </a>
                  .
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Na tela apresentada, selecione “DOWNLOAD WINDOWS” ou
                  “DOWNLOAD”
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img1.src}
                  alt="Tela de Download"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras4.src}
                  alt="Segundo Passo"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Encerrado o download, basta localizar o arquivo
                  “Instalador_Leitor_Inr...” (geralmente na pasta “Downloads”) e
                  executá-lo.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img2.src}
                  alt="indicador de download realizado."
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "50%"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras5.src}
                  alt="Terceiro Passo"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Leia os termos de licença e selecione “Eu Concordo”.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img3.src}
                  alt="Tela 'Eu Concordo' da instalação."
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras6.src}
                  alt="Quarto passo"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Selecione quem utilizará o aplicativo, e vá à tela seguinte.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img4.src}
                  alt="Tela de seleção de quem ultilizará o aplicativo."
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras7.src}
                  alt="Tela 'Quinto Passo"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Em seguida, opte por instalar. Em segundos a instalação estará
                  finalizada. Clique em “Concluir”!
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img5.src}
                  alt="Tela Instalação completa"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Pronto! Você já tem este ícone em sua barra de tarefas e
                  receberá notificações automaticamente quando houver novas
                  publicações.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img6.src}
                  alt="Logo Inr"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "10%"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras8.src}
                  alt="Depois da instalação"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Após baixar e fazer a instalação, um ícone estará sempre
                  disponível em sua barra de tarefas.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img7.src}
                  alt="Notificações"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "30%"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras9.src}
                  alt="Fique sempre de olho nas novidades, acessando as notificações"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img8.src}
                  alt="Notificações"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "25%"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras10.src}
                  alt="Funcionalidades"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Com a tela do Leitor INR aberta, é possível pesquisar um
                  Boletim ou Classificador por data, ou apenas selecionar na
                  parte superior a opção desejada e ver a lista completa de
                  itens acumulados.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras11.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img9.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras12.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">
                  Nesta aba, além de selecionar um Boletim ou Classificador para
                  leitura, é possível “favoritar” determinada(s) edição(ões)
                  para leitura posterior, e ela(s) ficará(ão) disponível(eis) na
                  lista de “Favoritos”.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img10.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras13.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img11.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras14.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img12.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={Outras15.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <img
                  src={img13.src}
                  alt="Página Principal"
                  style={{ width: "100%" }}
                />
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
          <Grid
            container
            spacing={1}
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
              <img
                src="https://inrpublicacoes.com.br/site/img/rodape/logo_inr_branco.svg"
                alt="inr logo"
                title="INR"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <p style={{ color: "white", fontSize: 17, lineHeight: 0.5 }}>
                <p>Central do Assinante:</p>
                <p>(11) 2959-0220</p>
                <p>faleconosco@inrpublicacoes.com.br</p>
              </p>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <p style={{ color: "white", fontSize: 17, lineHeight: 0.5 }}>
                <p>Localização:</p>
                <p>
                  <span>Rua Voluntários da Pátria, 2.468 - 23º andar</span>
                </p>
                <p>
                  <span>Santana - São Paulo/SP - CEP.02402-000</span>
                </p>
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
