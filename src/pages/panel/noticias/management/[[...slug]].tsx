import { ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import {
  ArrowBack,
  DeleteForever,
  PhotoCamera,
  Save
} from "@mui/icons-material"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@mui/material"
import Stack from "@mui/material/Stack"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import { noticiaSaveInput } from "@validation/Noticia/noticiaSave"
import { salaTematicaSaveInput } from "@validation/SalaTematica/salaTematicaSave"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import "suneditor/dist/css/suneditor.min.css" // Import Sun Editor's CSS File
import SunEditorCore from "suneditor/src/lib/core"

const SunEditor = dynamic(() => import("../../../../components/SunEditor"), {
  ssr: false
})

export default function NoticiasManagement() {
  const [noticia, setNoticia] = useState<
    noticiaSaveInput & { _id: string | undefined }
  >({
    _id: "",
    conteudoHtml: "",
    conteudoTexto: "",
    dataPublicacaoFonte: new Date(),
    fonte: "",
    titulo: "",
    tituloSecundario: "",
    imagemDestaque: "",
    salasTematicas: []
  })

  const [salasTematicasList, setSalasTematicasList] = useState<
    (salaTematicaSaveInput & { checked: boolean })[]
  >([])
  const [salasTematicasSelected, setSalasTematicasSelected] = useState<
    (salaTematicaSaveInput & { checked: boolean })[]
  >([])

  const router = useRouter()
  const slug = router.query.slug
  const [loading, setLoading] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [errorList, setErrorList] = useState<boolean[]>([false])

  const getSalasTematicasList = async () => {
    const apiResponse = await HttpRequest.Post("/api/salasTematicas/search", {
      searchText: "",
      page: 0,
      rowsPerpage: 99999
    })

    const checkedArray: (salaTematicaSaveInput & { checked: boolean })[] = []

    if (apiResponse.success) {
      for (let i = 0; i < apiResponse.data.list.length; i++) {
        checkedArray.push({
          _id: apiResponse.data.list[i]._id,
          checked: false,
          nome: apiResponse.data.list[i].nome
        })
      }
      setSalasTematicasList(checkedArray)
    }
  }

  const noticiaGetById = async (id: string) => {}

  const salvarNoticia = async () => {
    const salasArray: (string | undefined)[] = salasTematicasSelected.map(
      item => item._id
    )

    const noticiaObj: noticiaSaveInput = {
      ...noticia,
      salasTematicas: salasArray
    }

    const apiResponse = await HttpRequest.Post("/api/noticias/save")

    console.log(apiResponse)
  }

  const deleteNoticia = async () => {}

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        getSalasTematicasList()
        setLoading(false)
      } else {
        setNoticia({
          ...noticia,
          _id: slug[0]
        })
        noticiaGetById(slug[0])
      }
    }
  }, [router.isReady, noticia, slug])

  const editor = useRef<SunEditorCore>()
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor
  }

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={salvarNoticia}
    >
      Salvar
    </Button>
  )
  const backButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<ArrowBack />}
      onClick={() => {
        router.push("/panel/salasTematicas")
      }}
    >
      Voltar
    </Button>
  )

  const deleteButton = (
    <Button
      sx={{ backgroundColor: "red" }}
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<DeleteForever />}
      onClick={deleteNoticia}
    >
      Excluir
    </Button>
  )

  const handleDataPublicacaoFonteChange = (newValue: Date | null) => {
    setNoticia({
      ...noticia,
      dataPublicacaoFonte: newValue
    })
  }

  const handleImagemDestaqueChange = ({ target }: any) => {
    setNoticia({ ...noticia, imagemDestaque: target.files[0] })
  }

  const updateSalasTematicas = (
    item: salaTematicaSaveInput & { checked: boolean }
  ) => {
    const findSala = salasTematicasSelected.find(
      element => element._id.toString() === item._id.toString()
    )
    if (!findSala) {
      salasTematicasSelected.push(item)
    } else {
      const salaIndex = salasTematicasSelected.findIndex(
        element => element._id === item._id
      )
      console.log(salaIndex)
    }
  }

  return (
    <ViewPanel
      title="Notícias"
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
      bottonButtons={
        noticia._id
          ? [backButton, saveButton, deleteButton]
          : [backButton, saveButton]
      }
    >
      <Paper sx={{ padding: 3 }}>
        {JSON.stringify(salasTematicasSelected)}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              disabled={loading}
              value={noticia.titulo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setNoticia({
                  ...noticia,
                  titulo: e.target.value
                })
              }}
              error={errorList[0]}
              label="Título"
              fullWidth
              InputLabelProps={{ shrink: noticia.titulo !== "" ? true : false }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              disabled={loading}
              value={noticia.tituloSecundario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setNoticia({
                  ...noticia,
                  tituloSecundario: e.target.value
                })
              }}
              error={errorList[1]}
              label="Título Secundário"
              fullWidth
              InputLabelProps={{
                shrink: noticia.tituloSecundario !== "" ? true : false
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <TextField
              disabled={loading}
              value={noticia.fonte}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[2] = false
                setErrorList(tmp)
                setNoticia({
                  ...noticia,
                  fonte: e.target.value
                })
              }}
              error={errorList[2]}
              label="Fonte"
              fullWidth
              InputLabelProps={{
                shrink: noticia.fonte !== "" ? true : false
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Data de Publicação na Fonte"
                  inputFormat="MM/DD/YYYY"
                  value={noticia.dataPublicacaoFonte}
                  onChange={handleDataPublicacaoFonteChange}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <input
              accept="image/jpeg"
              id="imagemDestaque"
              type="file"
              onChange={handleImagemDestaqueChange}
              hidden
            />
            <Tooltip title="Imagem de Destaque">
              <label htmlFor="imagemDestaque">
                <Button
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  startIcon={<PhotoCamera />}
                  component="span"
                >
                  Imagem (439x227 pixels)
                </Button>
              </label>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography fontWeight="bold">Conteúdo da Notícia:</Typography>
            <SunEditor
              getSunEditorInstance={getSunEditorInstance}
              name="content"
              width="100%"
              height="300"
              setOptions={{
                height: "100"
              }}
              onChange={(content: string) => {
                console.log("content", content)
                const text = editor.current?.getText()
                console.log("text", text)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography fontWeight="bold">Nota da Redação INR:</Typography>
            <SunEditor
              getSunEditorInstance={getSunEditorInstance}
              name="editorsNote"
              width="100%"
              height="100"
              setOptions={{
                height: "100"
              }}
              onChange={(content: any) => {
                console.log("content", content)
                const text = editor.current?.getText()
                console.log("text", text)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography fontWeight="bold">Salas Temáticas:</Typography>
          </Grid>
          {salasTematicasList &&
            salasTematicasList.map(item => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={item._id}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          item.checked = event.target.checked

                          updateSalasTematicas(item)
                        }}
                        checked={item.checked}
                      />
                    }
                    label={item.nome}
                  />
                </FormGroup>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
