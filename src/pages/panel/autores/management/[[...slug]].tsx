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
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@mui/material"
import { autorSaveInput } from "@validation/Autor/autorSave"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import "suneditor/dist/css/suneditor.min.css" // Import Sun Editor's CSS File
import SunEditorCore from "suneditor/src/lib/core"

const SunEditor = dynamic(() => import("../../../../components/SunEditor"), {
  ssr: false
})

export default function AutoresManagement() {
  const [id, setId] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [foto, setFoto] = useState<string>("")
  const [curriculo, setCurriculo] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [errorList, setErrorList] = useState<boolean[]>([false])

  const router = useRouter()
  const slug = router.query.slug

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        setId("")
        setLoading(false)
      } else {
        setId(slug[0])
        autorGetById(slug[0])
      }
    }
  }, [router.isReady])

  const autorGetById = async (id: string) => {
    const apiResponse = await HttpRequest.Get(`/api/autores/${id}`)

    if (apiResponse.success) {
      setNome(apiResponse.data.data.nome)
      setCurriculo(apiResponse.data.data.curriculo)
      setId(apiResponse.data.data._id)
    }

    console.log(apiResponse)
  }

  const salvarAutor = async () => {
    if (!nome) {
      const temp = [...errorList]
      temp[0] = true
      setErrorList(temp)
      setDialogText("Por favor, preencha o campo nome.")
      setOpenDialog(true)
      return
    }
    if (!curriculo) {
      const temp = [...errorList]
      temp[1] = true
      setErrorList(temp)
      setDialogText("Por favor, preencha o currículo do autor.")
      setOpenDialog(true)
      return
    }

    const autorObj: autorSaveInput = {
      _id: id ? id.toString() : undefined,
      nome: nome,
      foto: foto,
      curriculo: curriculo
    }

    const apiResponse = await HttpRequest.Post("/api/autores/save", autorObj)
    console.log(apiResponse)

    if (apiResponse.success) {
      setDialogText(
        apiResponse.message
          ? apiResponse.message
          : "Autor criado/editado com sucesso."
      )
      setOpenDialog(true)
      // setTimeout(() => {
      //   router.push("/panel/autores")
      // }, 2000)
    } else {
      setDialogText(
        apiResponse.message
          ? apiResponse.message
          : "Erro ao criar/editar Autor."
      )
      setOpenDialog(true)
      return
    }
  }

  const deleteAutor = async () => {
    const apiResponse = await HttpRequest.Delete(`/api/autores/${id}/delete`)

    console.log(apiResponse)
  }

  const handleFotoChange = ({ target }: any) => {
    console.log(target.files[0])

    setFoto(target.files[0].nome)
  }

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
      onClick={salvarAutor}
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
      onClick={deleteAutor}
    >
      Excluir
    </Button>
  )

  return (
    <ViewPanel
      title="Autores"
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextField
              disabled={loading}
              value={nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setNome(e.target.value)
              }}
              error={errorList[0]}
              label="Nome"
              fullWidth
              InputLabelProps={{ shrink: nome !== "" ? true : false }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <input
              accept="image/jpeg"
              id="imagemDestaque"
              type="file"
              onChange={handleFotoChange}
              hidden
            />
            <Tooltip title="Foto">
              <label htmlFor="imagemDestaque">
                <Button
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  startIcon={<PhotoCamera />}
                  component="span"
                >
                  Foto (364 x 180 pixels)
                </Button>
              </label>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography sx={{ fontWeight: "bold" }}>Currículo:</Typography>
            <SunEditor
              getSunEditorInstance={getSunEditorInstance}
              name="curriculo"
              width="100%"
              content={curriculo}
              onChange={(content: string) => {
                setCurriculo(content)
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
