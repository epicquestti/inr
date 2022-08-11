import { ViewPanel } from "@Components/Panel"
import { ArrowBack, Close, Publish, Save } from "@mui/icons-material"
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import RequestApi from "../../../lib/frontend/RequestApi"

export default function GetAtualizacoesById() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [id, setId] = useState<string>("")
  const [version, setVersion] = useState<number>(0)
  const [major, setMajor] = useState<number>(0)
  const [minor, setMinor] = useState<number>(0)
  const [severity, setSeverity] = useState<string>("")
  const [vigente, setVigente] = useState<boolean>(false)
  const [link, setLink] = useState<string>("")
  const [showPublish, setShowPublish] = useState<boolean>(false)
  const [showSave, setShowSave] = useState<boolean>(false)
  const [blockFields, setBlockFields] = useState<boolean>(true)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [openBackDrop, setOpenBackDrop] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseBackDrop = () => {
    setOpenBackDrop(false)
  }

  useEffect(() => {
    if (!router.isReady) return

    const { id } = router.query
    if (id) getAtualizacaoById(id.toString())
  }, [router.isReady])

  async function getAtualizacaoById(id: string) {
    try {
      setLoading(true)
      setOpenBackDrop(true)

      const atualizacao = await RequestApi.Get(`/api/atualizacoes/${id}`)

      if (atualizacao.success) {
        if (id) setId(id.toString())

        setVersion(atualizacao.data.version)
        setMajor(atualizacao.data.major)
        setMinor(atualizacao.data.minor)
        setSeverity(atualizacao.data.severity)
        setLink(atualizacao.data.link)
        setVigente(atualizacao.data.vigent)

        if (atualizacao.data.vigent) {
          setShowPublish(false)
          setShowSave(false)
          setBlockFields(true)
        } else {
          setShowPublish(true)
          setShowSave(true)
          setBlockFields(false)
        }

        setLoading(false)
        setOpenBackDrop(false)
      } else throw new Error(atualizacao.message)
    } catch (error: any) {
      setLoading(false)
      setOpenBackDrop(false)
      setDialogText(error.message)
      setOpenDialog(true)
    }
  }

  const saveThisUpdate = async () => {
    try {
      if (!version) {
        const tmp = [...errorList]
        tmp[0] = true
        setErrorList(tmp)
        setDialogText("Vesão não pode ser nula.")
        setOpenDialog(true)
        return
      }

      if (!major) {
        const tmp = [...errorList]
        tmp[1] = true
        setErrorList(tmp)
        setDialogText("Major não pdoe ser nulo")
        setOpenDialog(true)
        return
      }

      if (!minor) {
        const tmp = [...errorList]
        tmp[2] = true
        setErrorList(tmp)
        setDialogText("Minor não pode ser nulo.")
        setOpenDialog(true)
        return
      }

      if (!severity && severity === "") {
        const tmp = [...errorList]
        tmp[3] = true
        setErrorList(tmp)
        setDialogText("Seleciona a severidade.")
        setOpenDialog(true)
        return
      }

      if (!link && link === "") {
        const tmp = [...errorList]
        tmp[4] = true
        setErrorList(tmp)
        setDialogText("Link não pode ser vazio.")
        setOpenDialog(true)
        return
      }

      setLoading(true)
      setOpenBackDrop(true)

      const body = {
        id,
        version,
        major,
        minor,
        severity,
        link
      }

      const newAtualizacao = await RequestApi.Post(
        "/api/atualizacoes/save",
        body
      )

      if (!newAtualizacao.success) throw new Error(newAtualizacao.message)

      if (newAtualizacao.data.vigent) {
        setShowPublish(false)
        setShowSave(false)
        setBlockFields(true)
      } else {
        setShowPublish(true)
        setShowSave(true)
        setBlockFields(false)
      }
      setDialogText("Versão editada com sucesso.")
      setOpenDialog(true)

      setLoading(false)
      setOpenBackDrop(false)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
      setOpenBackDrop(false)
    }
  }

  const publishThisUpdate = async () => {
    try {
      setLoading(true)
      setOpenBackDrop(true)
      const publish = await RequestApi.Get(`/api/atualizacoes/publish?id=${id}`)

      if (!publish.success) throw new Error(publish.message)

      setShowPublish(false)
      setShowSave(false)
      setBlockFields(true)
      setDialogText("Versão publicada com sucesso.")
      setOpenDialog(true)
      setLoading(false)
      setOpenBackDrop(false)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
      setOpenBackDrop(false)
    }
  }

  return (
    <ViewPanel
      title={
        loading
          ? "Aguarde..."
          : `Versão: ${version}.${major}.${minor} ${vigente ? "- VIGENTE" : ""}`
      }
      location={[
        {
          text: "Home",
          iconName: "home",
          href: "/panel"
        },
        {
          text: "INR Leitor",
          iconName: "desktop_windows",
          href: ""
        },
        {
          text: "Atualizações",
          iconName: "system_update_alt",
          href: "/panel/aplicativo"
        }
      ]}
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              disabled={blockFields || loading}
              value={version}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setVersion(parseInt(e.target.value))
              }}
              error={errorList[0]}
              label="Versão"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              disabled={blockFields || loading}
              value={major}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setMajor(parseInt(e.target.value))
              }}
              error={errorList[1]}
              label="Major"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              disabled={blockFields || loading}
              value={minor}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[2] = false
                setErrorList(tmp)
                setMinor(parseInt(e.target.value))
              }}
              error={errorList[2]}
              label="Minor"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <InputLabel id="severity">Severidade</InputLabel>
              <Select
                disabled={blockFields || loading}
                value={severity}
                onChange={(event: SelectChangeEvent<string>) => {
                  const tmp = [...errorList]
                  tmp[3] = false
                  setErrorList(tmp)
                  setSeverity(event.target.value)
                }}
                error={errorList[3]}
                fullWidth
                labelId="severity"
                label="Severidade"
              >
                <MenuItem disabled={blockFields || loading} value="">
                  Selecione
                </MenuItem>
                <MenuItem disabled={blockFields || loading} value={"normal"}>
                  Normal
                </MenuItem>
                <MenuItem disabled={blockFields || loading} value={"urgent"}>
                  Urgente
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              value={link}
              disabled={blockFields || loading}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[4] = false
                setErrorList(tmp)
                setLink(e.target.value)
              }}
              error={errorList[4]}
              label="Link do executável."
              fullWidth
            />
          </Grid>

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
                  router.push("/panel/atualizacoes")
                }}
              >
                Voltar
              </Button>

              {showSave && (
                <Button
                  disabled={loading}
                  variant="contained"
                  startIcon={<Save />}
                  onClick={saveThisUpdate}
                >
                  Salvar
                </Button>
              )}

              {showPublish && (
                <Button
                  disabled={loading}
                  variant="contained"
                  startIcon={<Publish />}
                  onClick={publishThisUpdate}
                >
                  Publicar
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
          onClick={handleCloseBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
