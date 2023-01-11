import { ViewPanel } from "@Components/Panel"
import RequestApi from "@lib/frontend/RequestApi"
import { ArrowBack, Delete, Edit, Save } from "@mui/icons-material"

import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useMediaQuery
} from "@mui/material"
import {
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker
} from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import ptBR from "date-fns/locale/pt-BR"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

type content = {
  id?: string
  titulo?: string
  url: string
  tipo: string
}
type boletimType = {
  id: number
  text: string
}
enum countSessions {
  MENSAGENSDOSEDITORES = "Mensagens dos Editores",
  OPNIAO = "Opnião",
  NOTICIAS = "Noticias",
  TVINR = "TV INR",
  JURISPRUDENCIA = "Jurisprudência",
  LEGISLACAO = "Legislação",
  PERGUNTAS = "Perguntas",
  SUPLEMENTOS = "Suplementos",
  PARECERESNAOPUBLICADOSPELACGJSP = "Pareceres",
  SP = "São Paulo",
  PR = "Paraná",
  RS = "Rio Grande do Sul",
  "SP-NHP" = "São Paulo - NHP",
  "SP-NHA" = "São Paulo - NHA",
  "SP-ACU" = "São Paulo - ACU",
  "PR-NHP" = "Paraná - NHP",
  "PR-NHA" = "Paraná - NHA",
  "RS-NHP" = "Rio Grande do Sul - NHP",
  "RS-NHA" = "Rio Grande do Sul - NHA"
}
enum typeColors {
  "Mensagens dos Editores" = "#FFCDD2",
  "Opnião" = "#F8BBD0",
  "Noticias" = "#E1BEE7",
  "TV INR" = "#D1C4E9",
  "Jurisprudência" = "#C5CAE9",
  "Legislação" = "#BBDEFB",
  "Perguntas" = "#B3E5FC",
  "Suplementos" = "#84FFFF",
  "Pareceres" = "#B2EBF2",
  "São Paulo" = "#B2DFDB",
  "Paraná" = "#DCEDC8",
  "Rio Grande do Sul" = "#FFF9C4",
  "São Paulo - NHP" = "#FFECB3",
  "São Paulo - NHA" = "#FFE0B2",
  "São Paulo - ACU" = "#D50000",
  "Paraná - NHP" = "#FFCCBC",
  "Paraná - NHA" = "#D7CCC8",
  "Rio Grande do Sul - NHP" = "#F5F5F5",
  "Rio Grande do Sul - NHA" = "#CFD8DC"
}
enum classTypes {
  SP = "Clique aqui e acesse o conteúdo desta edição.",
  "SP-NHP" = "Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de São Paulo na data de hoje.",
  "SP-NHA" = "Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado de São Paulo.",
  "SP-ACU" = "Clique aqui e acesse o conteúdo acumulado até o dia ",
  PR = "Clique aqui e acesse o conteúdo desta edição.",
  "PR-NHP" = "Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Paraná na data de hoje.",
  "PR-NHA" = "Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Paraná.",
  RS = "Clique aqui e acesse o conteúdo desta edição.",
  "RS-NHP" = "Não houve publicação do Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Rio Grande do Sul na data de hoje.",
  "RS-NHA" = "Não há atos de interesse no Diário da Justiça Eletrônico do Tribunal de Justiça do Estado do Rio Grande do Sul."
}
const beTypeList = (t: string) => {
  const arr = [
    "MENSAGENSDOSEDITORES",
    "Mensagens dos Editores",
    "OPNIAO",
    "Opnião",
    "NOTICIAS",
    "Noticias",
    "TVINR",
    "TV INR",
    "JURISPRUDENCIA",
    "Jurisprudência",
    "LEGISLACAO",
    "Legislação",
    "PERGUNTAS",
    "Perguntas",
    "SUPLEMENTOS",
    "Suplementos",
    "PARECERESNAOPUBLICADOSPELACGJSP",
    "Pareceres"
  ]
  const i = arr.indexOf(t)
  return arr[i + 1]
}
type resumoList = {
  type?: string
  total?: number
}

export default function NovaPublicacao() {
  const router = useRouter()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
  const [loading, setLoading] = useState<boolean>(false)
  const [blockLink, setBlockLink] = useState<boolean>(false)
  const [showAcumuladoField, setShowAcumuladoField] = useState<boolean>(false)
  const [dataAcumulado, setDataAcumulado] = useState<Date | null>(null)

  const [titulo, setTitulo] = useState<string>("")
  const [tipoBoletim] = useState<boletimType[]>([
    { id: 1, text: "Boletim eletrônico" },
    { id: 2, text: "Classificador" }
  ])
  const [tipo, setTipo] = useState<number | undefined>(undefined)
  const [conteudoList, setConteudoList] = useState<content[]>([])

  const [tipoContentClassificador, setTipoContentClassificador] =
    useState<string>("")
  const [urlContentClassificador, setUrlContentClassificador] =
    useState<string>("")

  const [tipoContentBoletim, setTipoContentBoletim] = useState<string>("")
  const [tituloContentBoletim, setTituloContentBoletim] = useState<string>("")
  const [urlContentBoletim, setUrlContentBoletim] = useState<string>("")

  const [resumo, setResumo] = useState<resumoList[]>([])

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  useEffect(() => {
    if (conteudoList.length > 0) {
      const tmp = [...conteudoList]
      const typesArray = tmp.map(item => item.tipo)
      const arrayResponse: resumoList[] = []

      typesArray.sort()

      var current = ""
      var cnt = 0
      for (var i = 0; i < typesArray.length; i++) {
        if (typesArray[i] != current) {
          if (cnt > 0) {
            arrayResponse.push({
              type: countSessions[current as keyof typeof countSessions],
              total: cnt
            })
          }
          current = typesArray[i]
          cnt = 1
        } else {
          cnt++
        }
      }
      if (cnt > 0) {
        arrayResponse.push({
          type: countSessions[current as keyof typeof countSessions],
          total: cnt
        })
      }

      setResumo(arrayResponse)
    }
  }, [conteudoList])

  const SelectBoletimTipo = (e: SelectChangeEvent<number>) => {
    setConteudoList([])
    setConteudoList([])
    setTipo(parseInt(e.target.value.toString()))
  }

  const addContent = () => {
    if (!tipo) {
      setDialogText("Selecione o tipo de publicação que deseja criar.")
      setOpenDialog(true)
      return
    }

    if (tipo === 1) {
      if (tipoContentBoletim === "") {
        setDialogText("Selecione o tipo de conteúdo do Boletim")
        setOpenDialog(true)
        return
      }

      if (tituloContentBoletim === "") {
        setDialogText("Insira o título do Boletim")
        setOpenDialog(true)
        return
      }

      if (urlContentBoletim === "") {
        setDialogText("Insíra o link do conteúdo do Boletim")
        setOpenDialog(true)
        return
      }

      const newBoletimItem: content = {
        titulo: tituloContentBoletim,
        tipo: tipoContentBoletim,
        url: urlContentBoletim
      }

      const temp = [...conteudoList, newBoletimItem]
      setConteudoList(temp)

      setTituloContentBoletim("")
      setUrlContentBoletim("")
    }

    if (tipo === 2) {
      if (tipoContentClassificador === "") {
        setDialogText("Selecione o tipo de classificador.")
        setOpenDialog(true)
        return
      }

      if (
        (tipoContentClassificador === "" ||
          tipoContentClassificador === "SP" ||
          tipoContentClassificador === "PR" ||
          tipoContentClassificador === "RS") &&
        !urlContentClassificador
      ) {
        setDialogText("insira o link do classificador.")
        setOpenDialog(true)
        return
      }

      if (tipoContentClassificador === "SP-ACU" && !dataAcumulado) {
        setDialogText("insira a data do acumulado.")
        setOpenDialog(true)
        return
      }

      const finalTitle =
        tipoContentClassificador === "SP-ACU"
          ? `${
              classTypes[tipoContentClassificador as keyof typeof classTypes]
            }${dataAcumulado?.toLocaleDateString()}`
          : `${new Date().toLocaleDateString()} – ${
              classTypes[tipoContentClassificador as keyof typeof classTypes]
            }`

      const newClassificadoritem: content = {
        titulo: finalTitle,
        tipo: tipoContentClassificador,
        url: urlContentClassificador
      }

      const temp = [...conteudoList, newClassificadoritem]
      setConteudoList(temp)

      setTipoContentClassificador("")
      setUrlContentClassificador("")
      setBlockLink(false)
    }
  }

  const removeThisContent = (index: number) => {
    const tmp = [...conteudoList]
    tmp.splice(index, 1)
    setConteudoList(tmp)
  }

  const editThisContent = (index: number) => {
    const tmp = [...conteudoList]
    const removed = tmp.splice(index, 1)[0]
    const titleCast = removed.titulo ? removed.titulo : ""
    const tipoCast = removed.tipo
    const UrlCast = removed.url

    if (tipo === 1) {
      setTipoContentBoletim(tipoCast)
      setTituloContentBoletim(titleCast)
      setUrlContentBoletim(UrlCast)
    } else {
      setTipoContentClassificador(tipoCast)
      setUrlContentClassificador(UrlCast)
    }

    setConteudoList(tmp)
  }

  const saveThisPublication = async () => {
    if (!titulo) {
      setDialogText("Título da publicação não pode ser nulo.")
      setOpenDialog(true)
      return
    }

    if (!tipo) {
      setDialogText("Selecione o tipo de publicação")
      setOpenDialog(true)
      return
    }

    if (conteudoList.length <= 0) {
      setDialogText("Publicação sem conteúdo não são permitidos.")
      setOpenDialog(true)
      return
    }

    let hasErrors = false

    if (tipo == 1) {
      for (let i = 0; i < conteudoList.length; i++) {
        if (conteudoList[i].url === "") hasErrors = true
        if (conteudoList[i].tipo === "") hasErrors = true
        if (!conteudoList[i].titulo) hasErrors = true
      }
    }

    if (tipo == 2) {
      for (let i = 0; i < conteudoList.length; i++) {
        if (conteudoList[i].tipo === "") hasErrors = true

        if (
          conteudoList[i].tipo === "SP" &&
          conteudoList[i].tipo === "PR" &&
          conteudoList[i].tipo === "RS"
        ) {
          if (conteudoList[i].url === "") hasErrors = true
        }
      }
    }

    if (hasErrors) {
      setDialogText("Exitem conteúdos incorretos, favor verifiquem.")
      setOpenDialog(true)
      return
    }

    try {
      setLoading(true)

      const requestResponse = await RequestApi.Post("/api/publicacoes/new", {
        titulo,
        tipo,
        conteudoList
      })

      if (requestResponse.success) {
        setDialogText(requestResponse.message || "")
        setOpenDialog(true)
        router.push(`/panel/publicacoes/${requestResponse.data.id}`)
      } else throw new Error(requestResponse.message)
    } catch (error: any) {
      setDialogText(error.message || "Erro ao Salvar.")
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const backButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<ArrowBack />}
      onClick={() => {
        router.push("/panel/publicacoes")
      }}
    >
      Voltar
    </Button>
  )

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={saveThisPublication}
    >
      Salvar
    </Button>
  )

  return (
    <ViewPanel
      title="Nova publicação"
      location={[
        {
          text: "Home",
          iconName: "home",
          href: "/panel"
        },
        {
          text: "Boletim Eletrônico",
          iconName: "auto_stories",
          href: ""
        },
        {
          text: "Nova publicação",
          iconName: "forward_to_inbox",
          href: "/panel/publicacoes/new"
        }
      ]}
      loading={{
        isLoading: loading,
        onClose: () => {
          setLoading(false)
        }
      }}
      snack={{
        open: openDialog,
        message: dialogText,
        onClose: () => {
          setOpenDialog(false)
        }
      }}
      bottonButtons={[backButton, saveButton]}
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
            <TextField
              value={titulo}
              variant="outlined"
              label="Título"
              fullWidth
              disabled={loading}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitulo(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <FormControl fullWidth>
              <InputLabel id="tipo-boletim-label-id">
                Tipo de Boletim
              </InputLabel>
              <Select
                disabled={loading}
                labelId="tipo-boletim-label-id"
                label="Tipo de Boletim"
                onChange={SelectBoletimTipo}
              >
                <MenuItem value={0}>Selecione um tipo de Publicação</MenuItem>
                {tipoBoletim.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body1">
              Insira os conteúdos da publicação.
            </Typography>
          </Grid>
          {tipo === 1 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <InputLabel id="tipo-Item-label-classificador">
                    Tipo de Item do boletim
                  </InputLabel>
                  <Select
                    disabled={loading}
                    labelId="tipo-Item-label-classificador"
                    label="Tipo de Item do classificador"
                    onChange={(e: SelectChangeEvent<string>) => {
                      setTipoContentBoletim(e.target.value)
                    }}
                    value={tipoContentBoletim}
                  >
                    <MenuItem value={""}>
                      Selecione o tipo de conteudo que voce ira criar
                    </MenuItem>
                    <MenuItem value={"MENSAGENSDOSEDITORES"}>
                      Mensagens dos Editores
                    </MenuItem>
                    <MenuItem value={"OPNIAO"}>Opnião</MenuItem>
                    <MenuItem value={"NOTICIAS"}>Noticias</MenuItem>
                    <MenuItem value={"TVINR"}>TV INR</MenuItem>
                    <MenuItem value={"JURISPRUDENCIA"}>Jurisprudência</MenuItem>
                    <MenuItem value={"LEGISLACAO"}>Legislação</MenuItem>
                    <MenuItem value={"PERGUNTAS"}>Perguntas</MenuItem>
                    <MenuItem value={"SUPLEMENTOS"}>Suplementos</MenuItem>
                    <MenuItem value={"PARECERESNAOPUBLICADOSPELACGJSP"}>
                      Pareceres Não Publicados pela CGJ SP
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={3}
                  maxRows={3}
                  label="Título do item"
                  value={tituloContentBoletim}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setTituloContentBoletim(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  disabled={loading}
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={3}
                  maxRows={3}
                  label="Link do boletim"
                  value={urlContentBoletim}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUrlContentBoletim(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    width: "100%"
                  }}
                >
                  <Button
                    disabled={loading}
                    onClick={addContent}
                    variant="contained"
                  >
                    Inserir conteúdo ao boletim
                  </Button>
                </Box>
              </Grid>
            </>
          )}

          {tipo === 2 && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <InputLabel id="tipo-Item-label-classificador">
                    Tipo de Item do classificador
                  </InputLabel>
                  <Select
                    disabled={loading}
                    labelId="tipo-Item-label-classificador"
                    label="Tipo de Item do classificador"
                    value={tipoContentClassificador}
                    onChange={(e: SelectChangeEvent<string>) => {
                      const valueSelected = e.target.value.toString()

                      if (valueSelected === "SP-ACU") {
                        setShowAcumuladoField(true)
                      } else {
                        setShowAcumuladoField(false)
                      }

                      if (
                        valueSelected === "" ||
                        valueSelected === "SP" ||
                        valueSelected === "PR" ||
                        valueSelected === "RS" ||
                        valueSelected === "SP-ACU"
                      ) {
                        setBlockLink(false)
                      } else {
                        setUrlContentClassificador("")
                        setBlockLink(true)
                      }

                      setTipoContentClassificador(valueSelected)
                    }}
                  >
                    <MenuItem value={""}>
                      Selecione um tipo de Classificador
                    </MenuItem>
                    <MenuItem value={"SP"}>SP</MenuItem>
                    <MenuItem value={"SP-NHP"}>
                      SP - Não houve publicação...
                    </MenuItem>
                    <MenuItem value={"SP-NHA"}>
                      SP - Não há atos de interesse...
                    </MenuItem>
                    <MenuItem value={"SP-ACU"}>SP - ACUMULADO</MenuItem>
                    <MenuItem value={"PR"}>PR</MenuItem>
                    <MenuItem value={"PR-NHP"}>
                      PR - Não houve publicação...
                    </MenuItem>
                    <MenuItem value={"PR-NHA"}>
                      PR - Não há atos de interesse...
                    </MenuItem>
                    <MenuItem value={"RS"}>RS</MenuItem>
                    <MenuItem value={"RS-NHP"}>
                      RS - Não houve publicação...
                    </MenuItem>
                    <MenuItem value={"RS-NHA"}>
                      RS - Não há atos de interesse...
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  disabled={loading || blockLink ? true : false}
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={3}
                  maxRows={3}
                  label="Insira o link do classificador"
                  value={urlContentClassificador}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setUrlContentClassificador(e.target.value)
                  }}
                />
              </Grid>
              {showAcumuladoField && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={ptBR}
                  >
                    {isMobile ? (
                      <MobileDatePicker
                        label="Acumulado até a data de *"
                        value={dataAcumulado}
                        onChange={(newValue: any) => {
                          setDataAcumulado(newValue)
                        }}
                        renderInput={(params: any) => (
                          <TextField tabIndex={8} {...params} fullWidth />
                        )}
                      />
                    ) : (
                      <DesktopDatePicker
                        label="Acumulado até a data de *"
                        value={dataAcumulado}
                        minDate={new Date("2010-01-01")}
                        onChange={(newValue: any) => {
                          setDataAcumulado(newValue)
                        }}
                        renderInput={(params: any) => (
                          <TextField {...params} tabIndex={8} fullWidth />
                        )}
                      />
                    )}
                  </LocalizationProvider>
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    width: "100%"
                  }}
                >
                  <Button
                    disabled={loading}
                    onClick={addContent}
                    variant="contained"
                  >
                    Inserir Conteúdo ao classificador
                  </Button>
                </Box>
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body1">Resumo</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {resumo.length <= 0 ? (
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border: "1px solid #2196F3",
                  padding: 1,
                  textAlign: "center"
                }}
              >
                <Typography variant="caption" sx={{ color: "#78909C" }}>
                  Adicione algum conteúdo ao boletim...
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  border: "1px solid #2196F3",
                  padding: 1,
                  textAlign: "center"
                }}
              >
                <Grid container spacing={2}>
                  {resumo.map((item, index) => (
                    <Grid
                      key={`item-resumo-conteudo-${index}`}
                      item
                      xs={12}
                      sm={12}
                      md={2}
                      lg={2}
                      xl={2}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          borderRadius: 2,
                          padding: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background:
                            typeColors[item.type as keyof typeof typeColors],
                          textAlign: "center"
                        }}
                      >
                        <Typography variant="caption">
                          <strong>{item.type}</strong>
                        </Typography>
                        <Box
                          sx={{
                            width: "20px",
                            height: "20px",
                            background: "#37474F",
                            marginLeft: 0.5,
                            color: "white",
                            borderRadius: "100%",
                            fontSize: 10,
                            p: 0.3,
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center"
                          }}
                        >
                          {item.total}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body1">Conteúdo da publicação</Typography>
          </Grid>
          {conteudoList.length > 0 &&
            conteudoList.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    width: "100%",
                    border: "1px solid #616161",
                    borderRadius: "3px",
                    padding: 2
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "end"
                        }}
                      >
                        <Typography variant="subtitle2">titulo</Typography>
                        <Box
                          sx={{
                            padding: "0px 4px 0px 4px",
                            background:
                              typeColors[
                                beTypeList(
                                  item.tipo.toString()
                                ) as keyof typeof typeColors
                              ],
                            borderRadius: 1,
                            marginLeft: 5
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="#000000"
                            fontSize={11}
                          >
                            {tipo === 1
                              ? beTypeList(item.tipo.toString())
                              : item.tipo}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Typography variant="body1">{item.titulo}</Typography>
                      </Box>
                      {item.url && (
                        <>
                          <Box sx={{ width: "100%" }}>
                            <Typography variant="subtitle2">Link</Typography>
                          </Box>
                          <Box sx={{ width: "100%" }}>
                            <a target="_blank" href={item.url} rel="noreferrer">
                              link do item
                            </a>
                          </Box>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <IconButton
                          disabled={loading}
                          onClick={() => {
                            removeThisContent(index)
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <IconButton
                          disabled={loading}
                          onClick={() => {
                            editThisContent(index)
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
