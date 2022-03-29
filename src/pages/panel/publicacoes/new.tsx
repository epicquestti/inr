import { local, Location, ViewPanel } from "@Components/Panel"
import RequestApi from "@lib/RequestApi"
import { ArrowBack, Close, Delete, Edit, Save } from "@mui/icons-material"
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
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsResult } from "next"
import { useRouter } from "next/router"
import React, { ChangeEvent, useState } from "react"
const location: local[] = [
  {
    text: "Home",
    iconName: "home",
    href: "/panel/home"
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
]
type serverSideResponse = {
  tipoBoletimList: { id: number; text: string }[]
}
type content = {
  id?: string
  titulo?: string
  url: string
  tipo: string
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

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<serverSideResponse>
> => {
  const tipoBoletimList = [
    { id: 1, text: "Boletim eletrônico" },
    { id: 2, text: "Classificador" }
  ]
  return {
    props: {
      tipoBoletimList
    }
  }
}

export default function NovaPublicacao(props: serverSideResponse) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const [titulo, setTitulo] = useState<string>("")
  const [tipo, setTipo] = useState<number | undefined>(undefined)
  const [conteudoList, setConteudoList] = useState<content[]>([])

  const [tipoContentClassificador, setTipoContentClassificador] =
    useState<string>("")
  const [urlContentClassificador, setUrlContentClassificador] =
    useState<string>("")

  const [tipoContentBoletim, setTipoContentBoletim] = useState<string>("")
  const [tituloContentBoletim, setTituloContentBoletim] = useState<string>("")
  const [urlContentBoletim, setUrlContentBoletim] = useState<string>("")

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const SelectBoletimTipo = (e: SelectChangeEvent<number>) => {
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
      setTipoContentBoletim("")
      setUrlContentBoletim("")
    }

    if (tipo === 2) {
      if (tipoContentClassificador === "") {
        setDialogText("Selecione o tipo de classificador.")
        setOpenDialog(true)
        return
      }

      if (!urlContentClassificador) {
        setDialogText("insira o link do classificador.")
        setOpenDialog(true)
        return
      }

      const newClassificadoritem: content = {
        titulo: `${new Date().toLocaleDateString()} – Clique aqui e acesse o conteúdo desta edição.`,
        tipo: tipoContentClassificador,
        url: urlContentClassificador
      }

      const temp = [...conteudoList, newClassificadoritem]
      setConteudoList(temp)

      setTipoContentClassificador("")
      setUrlContentClassificador("")
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
        if (conteudoList[i].url === "") hasErrors = true
        if (conteudoList[i].tipo === "") hasErrors = true
      }
    }

    if (hasErrors) {
      setDialogText("Exitem conteúdos incorretos, favor verifiquem.")
      setOpenDialog(true)
      return
    }

    setLoading(true)

    const requestResponse = await RequestApi.Post("/api/publicacoes/new", {
      titulo,
      tipo,
      conteudoList
    })

    setDialogText(requestResponse.message || "")
    setOpenDialog(true)
    setLoading(false)

    if (requestResponse.success)
      router.push(`/panel/publicacoes/${requestResponse.data.id}`)
  }

  return (
    <ViewPanel>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Location location={location} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6">Nova publicação</Typography>
          </Grid>
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
                {props.tipoBoletimList.map(item => (
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
                      setTipoContentClassificador(e.target.value.toString())
                    }}
                  >
                    <MenuItem value={""}>
                      Selecione um tipo de Classificador
                    </MenuItem>
                    <MenuItem value={"SP"}>SP</MenuItem>
                    <MenuItem value={"PR"}>PR</MenuItem>
                    <MenuItem value={"RS"}>RS</MenuItem>
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
                  label="Insira o link do classificador"
                  value={urlContentClassificador}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setUrlContentClassificador(e.target.value)
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
                    Inserir Conteúdo ao classificador
                  </Button>
                </Box>
              </Grid>
            </>
          )}

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
                            background: "#B0BEC5",
                            border: "1.5px solid #424242",
                            borderRadius: 1,
                            marginLeft: 5
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="#424242"
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
                      <Box sx={{ width: "100%" }}>
                        <Typography variant="subtitle2">Link</Typography>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <a target="_blank" href={item.url} rel="noreferrer">
                          link do item
                        </a>
                      </Box>
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

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <Button
                disabled={loading}
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={() => {
                  router.push("/panel/publicacoes")
                }}
              >
                Voltar
              </Button>
              <Button
                disabled={loading}
                variant="contained"
                startIcon={<Save />}
                onClick={saveThisPublication}
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={openDialog}
          autoHideDuration={6000}
          onClose={handleCloseDialog}
          message={dialogText}
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseDialog}
              >
                Fechar
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseDialog}
              >
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Paper>
    </ViewPanel>
  )
}
