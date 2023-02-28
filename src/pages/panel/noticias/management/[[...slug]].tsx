import { ViewPanel } from "@Components/Panel"
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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import type {} from "@mui/x-date-pickers-pro/themeAugmentation"
import { HttpRequest } from "@lib/frontend"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import { Dayjs } from "dayjs"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { buttonList } from "suneditor-react"
import "suneditor/dist/css/suneditor.min.css" // Import Sun Editor's CSS File
import SunEditorCore from "suneditor/src/lib/core"

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
})

export default function NoticiasManagement() {
  const [id, setId] = useState<string>("")
  const [titulo, setTitulo] = useState<string>("")
  const [tituloSecundario, setTituloSecundario] = useState<string>("")
  const [fonte, setFonte] = useState<string>("")
  const [dataPublicacaoFonte, setDataPublicacaoFonte] = useState<Dayjs | null>(
    null
  )
  const [imagemDestaque, setImagemDestaque] = useState<any>(null)

  const [salasTematicasList, setSalasTematicasList] = useState<
    {
      nome: string
      _id: string
      checked: boolean
    }[]
  >([])
  const [salasTematicasSelected, setSalasTematicasSelected] = useState<
    {
      nome: string
      _id: string
      checked: boolean
    }[]
  >([])

  const router = useRouter()
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

    if (apiResponse.success) {
      setSalasTematicasList(apiResponse.data.list)
    }

    console.log(apiResponse)
  }

  useEffect(() => {
    getSalasTematicasList()
  }, [])

  const editor = useRef<SunEditorCore>()
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor
  }

  const salvarNoticia = async () => {}
  const deleteNoticia = async () => {}

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

  const handleDataPublicacaoFonteChange = (newValue: Dayjs | null) => {
    setDataPublicacaoFonte(newValue)
  }

  const handleImagemDestaqueChange = ({ target }: any) => {
    setImagemDestaque(target.files[0])
  }

  const updateSalasTematicas = (item: any) => {
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
        id ? [backButton, saveButton, deleteButton] : [backButton, saveButton]
      }
    >
      <Paper sx={{ padding: 3 }}>
        {JSON.stringify(salasTematicasSelected)}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              disabled={loading}
              value={titulo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setTitulo(e.target.value)
              }}
              error={errorList[0]}
              label="Título"
              fullWidth
              InputLabelProps={{ shrink: titulo !== "" ? true : false }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              disabled={loading}
              value={tituloSecundario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setTituloSecundario(e.target.value)
              }}
              error={errorList[1]}
              label="Título Secundário"
              fullWidth
              InputLabelProps={{
                shrink: tituloSecundario !== "" ? true : false
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <TextField
              disabled={loading}
              value={fonte}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[2] = false
                setErrorList(tmp)
                setFonte(e.target.value)
              }}
              error={errorList[2]}
              label="Fonte"
              fullWidth
              InputLabelProps={{
                shrink: tituloSecundario !== "" ? true : false
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Data de Publicação na Fonte"
                  inputFormat="MM/DD/YYYY"
                  value={dataPublicacaoFonte}
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
              lang="pt_br"
              name="my-editor"
              width="100%"
              height="300"
              setOptions={{
                height: "100",
                buttonList: buttonList.complex
              }}
              onChange={content => {
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
              lang="pt_br"
              name="editorsNote"
              width="100%"
              height="100"
              setOptions={{
                height: "100",
                buttonList: buttonList.complex
              }}
              onChange={content => {
                console.log("content", content)
                const text = editor.current?.getText()
                console.log("text", text)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography fontWeight="bold">Salas Temáticas:</Typography>
            {salasTematicasList &&
              salasTematicasList.map(item => (
                <FormGroup key={item.id}>
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
              ))}
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
