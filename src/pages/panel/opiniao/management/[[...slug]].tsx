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
import Stack from "@mui/material/Stack"
import { Box } from "@mui/system"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

export default function OpiniaoManagement() {
  const [id, setId] = useState<string>("")
  const [opiniao, setOpiniao] = useState<any>({})
  const [autoresList, setAutoresList] = useState<any[]>([])

  const router = useRouter()
  const slug = router.query.slug
  const [loading, setLoading] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [errorList, setErrorList] = useState<boolean[]>([false])

  const autorGetAll = async () => {
    const apiResponse = await HttpRequest.Post("/api/autores/search", {
      searchText: "",
      page: 0,
      rowsperpage: 9999999
    })

    setAutoresList(apiResponse.data.list)
    if (apiResponse.data.list.length > 0) {
      console.log(apiResponse.data.list)
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        setId("")
        setLoading(false)
        autorGetAll()
      } else {
        setId(slug[0])
        // funcaoGetById(slug[0])
        autorGetAll()
      }
    }
  }, [])

  const salvarOpiniao = async () => {}
  const deleteOpiniao = async () => {}

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={salvarOpiniao}
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
        router.push("/panel/opiniao")
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
      onClick={deleteOpiniao}
    >
      Excluir
    </Button>
  )

  const handleDataPublicacaoChange = () => {}
  const handleImagemDestaqueChange = () => {}

  return (
    <ViewPanel
      title="Opinião"
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
        opiniao._id
          ? [backButton, saveButton, deleteButton]
          : [backButton, saveButton]
      }
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              disabled={loading}
              value={opiniao.titulo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setOpiniao({
                  ...opiniao,
                  titulo: e.target.value
                })
              }}
              error={errorList[0]}
              label="Título"
              fullWidth
              InputLabelProps={{ shrink: opiniao.titulo !== "" ? true : false }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              disabled={loading}
              value={opiniao.tituloSecundario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setOpiniao({
                  ...opiniao,
                  tituloSecundario: e.target.value
                })
              }}
              error={errorList[1]}
              label="Título Secundário"
              fullWidth
              InputLabelProps={{
                shrink: opiniao.tituloSecundario !== "" ? true : false
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Data de Publicação"
                    inputFormat="MM/DD/YYYY"
                    value={opiniao.dataPublicacaoFonte}
                    onChange={handleDataPublicacaoChange}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography sx={{ fontWeight: "bold" }}>Autor(a)</Typography>
            {autoresList.map(item => (
              <Typography key={item._id}>{item.nome}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Typography sx={{ fontWeight: "bold" }}>
              Imagem para Destaque
            </Typography>
            <Box sx={{ border: 1, height: 200 }}></Box>
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
                  Escolher Arquivo (439x227 pixels)
                </Button>
              </label>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}></Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
