import { ViewPanel } from "@Components/Panel"
import { apiMethods, apiTypes } from "@lib/data/api"
import { HttpRequest } from "@lib/frontend"
import { ArrowBack, DeleteForever, Save } from "@mui/icons-material"
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
import { saveApiInput } from "@validation/Api/saveApi"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

export default function ApiManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState<string | undefined>(undefined)
  const [url, setUrl] = useState<string>("")
  const [metodo, setMetodo] = useState<string>("")
  const [tipo, setTipo] = useState<string>("")
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [errorList, setErrorList] = useState<boolean[]>([false, false, false])
  const slug = router.query.slug

  const getThisApi = async () => {
    try {
      const apiResponse = await HttpRequest.Get(`/api/apis/${id}`)

      if (apiResponse.success) {
        setId(apiResponse.data._id)
        setUrl(apiResponse.data.url)
        setMetodo(apiResponse.data.method)
        setTipo(apiResponse.data.type)
      } else throw new Error(apiResponse.message)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
      return
    }
  }

  useEffect(() => {
    const aa = async () => {
      await getThisApi()
    }
    if (id) {
      aa()
    }
  }, [id])

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        setId(undefined)
        setLoading(false)
      } else {
        setId(slug[0])
      }
    }
  }, [router.isReady])

  const saveThisApi = async () => {
    try {
      if (!url) {
        setErrorList([true, false, false])
        throw new Error("Url não pode estar vázia")
      }

      if (!metodo) {
        setErrorList([false, true, false])
        throw new Error("Seleciona um método")
      }

      if (!tipo) {
        setErrorList([false, false, true])
        throw new Error("Seleciona um tipo")
      }

      const body: saveApiInput = {
        metodo,
        tipo,
        url,
        _id: id
      }

      const apiResponse = await HttpRequest.Post("/api/apis/save", body)
      if (apiResponse.success) {
        setId(apiResponse.data._id)
        setUrl(apiResponse.data.url)
        setMetodo(apiResponse.data.metodo)
        setTipo(apiResponse.data.tipo)

        setDialogText(apiResponse.message ? apiResponse.message : "Sucesso!!!")
        setOpenDialog(true)

        setTimeout(() => {
          router.push("/panel/api")
        }, 2000)
      } else {
        throw new Error(apiResponse.message)
      }
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
      return
    }
  }

  const deleteApi = async () => {
    const apiResponse = await HttpRequest.Post(`/api/apis/${id}/delete`, id)

    if (apiResponse.success) {
      setDialogText(apiResponse.message ? apiResponse.message : "API excluída.")
      setOpenDialog(true)

      setTimeout(() => {
        router.push("/panel/api")
      }, 2000)
    } else {
      setDialogText(
        apiResponse.message ? apiResponse.message : "Erro ao excluir API."
      )
      setOpenDialog(true)
    }
  }

  const backButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<ArrowBack />}
      onClick={() => {
        router.push("/panel/api")
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
      onClick={saveThisApi}
    >
      Salvar
    </Button>
  )

  const deleteButton = (
    <Button
      sx={{ backgroundColor: "red" }}
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<DeleteForever />}
      onClick={deleteApi}
    >
      Excluir
    </Button>
  )
  return (
    <ViewPanel
      title={"Nova Api"}
      location={[
        {
          text: "Home",
          iconName: "home",
          href: "/panel"
        },
        {
          text: "Api",
          iconName: "desktop_windows",
          href: "/panel/api"
        },
        {
          text: "Nova api",
          iconName: "system_update_alt",
          href: "/panel/api/management"
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
      bottonButtons={
        id ? [backButton, saveButton, deleteButton] : [backButton, saveButton]
      }
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextField
              disabled={loading}
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setUrl(e.target.value)
              }}
              error={errorList[0]}
              label="Url"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="methodoListaSelectLabel">Método</InputLabel>
              <Select
                error={errorList[1]}
                labelId="methodoListaSelectLabel"
                label="Método"
                value={metodo}
                onChange={(event: SelectChangeEvent<string>) => {
                  const tmp = [...errorList]
                  tmp[1] = false
                  setErrorList(tmp)
                  setMetodo(event.target.value)
                }}
              >
                <MenuItem value={"undefined"}>{"SELECIONE UM MÉTODO"}</MenuItem>
                {apiMethods.map((apiMethod, index) => (
                  <MenuItem
                    key={`item-metodo-list-${apiMethod}-${index}`}
                    value={apiMethod}
                  >
                    {apiMethod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="tipoListaSelectLabel">Tipo</InputLabel>
              <Select
                error={errorList[2]}
                labelId="tipoListaSelectLabel"
                label="Tipo"
                value={tipo}
                onChange={(event: SelectChangeEvent<string>) => {
                  const tmp = [...errorList]
                  tmp[2] = false
                  setErrorList(tmp)
                  setTipo(event.target.value)
                }}
              >
                <MenuItem value={"undefined"}>{"SELECIONE UM TIPO"}</MenuItem>
                {apiTypes.map((apiType, index) => (
                  <MenuItem
                    key={`item-tipo-list-${apiType}-${index}`}
                    value={apiType}
                  >
                    {apiType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
