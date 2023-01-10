import { ViewPanel } from "@Components/Panel"
import { onlyNumbers } from "@lib/frontend/masks"
import { ArrowBack, Save } from "@mui/icons-material"
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import RequestApi from "../../../lib/frontend/HttpRequest"

export default function CreateAtualizacoes() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const [version, setVersion] = useState<string>("")
  const [major, setMajor] = useState<string>("")
  const [minor, setMinor] = useState<string>("")
  const [severity, setSeverity] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [errorList, setErrorList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])

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

      const body = {
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

      console.log(newAtualizacao)

      if (!newAtualizacao.success) throw new Error(newAtualizacao.message)

      setDialogText("Versão salva com sucesso. direcionando.")
      setOpenDialog(true)

      setTimeout(() => {
        router.push(`/panel/atualizacoes/${newAtualizacao.data._id}`)
      }, 2000)
    } catch (error: any) {
      setDialogText(error.message)
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
        router.push("/panel/atualizacoes")
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
      onClick={saveThisUpdate}
    >
      Salvar
    </Button>
  )

  return (
    <ViewPanel
      title="Nova Atualização"
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              disabled={loading}
              value={version}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setVersion(onlyNumbers(e.target.value))
              }}
              error={errorList[0]}
              label="Versão"
              fullWidth
              inputProps={{
                maxLength: 2
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              disabled={loading}
              value={major}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setMajor(onlyNumbers(e.target.value))
              }}
              error={errorList[1]}
              label="Major"
              fullWidth
              inputProps={{
                maxLength: 3
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              disabled={loading}
              value={minor}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[2] = false
                setErrorList(tmp)
                setMinor(onlyNumbers(e.target.value))
              }}
              error={errorList[2]}
              label="Minor"
              fullWidth
              inputProps={{
                maxLength: 3
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <InputLabel id="severity">Severidade</InputLabel>
              <Select
                disabled={loading}
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
                <MenuItem disabled={loading} value="">
                  Selecione
                </MenuItem>
                <MenuItem disabled={loading} value={"normal"}>
                  Normal
                </MenuItem>
                <MenuItem disabled={loading} value={"urgent"}>
                  Urgente
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              value={link}
              disabled={loading}
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
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
