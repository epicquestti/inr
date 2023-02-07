import { ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import { funcaoBooleanType } from "@lib/types/tipoUsuario"
import { ArrowBack, DeleteForever, Save } from "@mui/icons-material"
import {
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

export default function TipoUsuarioManagement() {
  const router = useRouter()

  const [id, setId] = useState<string | undefined>(undefined)
  const [nome, setNome] = useState<string>("")
  const [funcoesList, setFuncoesList] = useState<any[]>([])
  const [funcoesOptions, setFuncoesOptions] = useState<funcaoBooleanType[]>([])
  const [superUser, setSuperUser] = useState<boolean>(false)

  const slug = router.query.slug

  const [checked, setChecked] = useState<boolean[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<boolean[]>([false])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

  const funcoesGetList = async () => {
    const apiResponse = await HttpRequest.Post("/api/funcoes/search", {
      searchText: "",
      page: 0,
      rowsperpage: 999999
    })

    if (apiResponse && apiResponse.data.list.length > 0) {
      setFuncoesOptions(apiResponse.data.list)
    } else {
      setFuncoesOptions([])
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        setId("")
        setLoading(false)
        funcoesGetList()
      } else {
        setId(slug[0])
        tipoUsuarioGetById(slug[0])
      }
    }
  }, [router.isReady])

  const handleChecked = async (item: any) => {
    const index = funcoesOptions.findIndex(element => element._id === item._id)
    const temp = [...funcoesOptions]
    item.checked = !item.checked
    temp[index] = item
    setFuncoesOptions(temp)
  }

  const salvarTipoUsuario = async () => {
    setLoading(true)
    if (!nome) {
      const temp = [...errorList]
      temp[0] = true
      setErrorList(temp)

      setDialogText("Por favor, insira um Nome antes de salvar.")
      setOpenDialog(true)
      setLoading(false)
    }

    const funcoesArray = funcoesOptions
      .filter(item => item.checked)
      .map(item => item._id)

    if (id) {
      const apiResponse = await HttpRequest.Post(
        `/api/tipoUsuario/${id}/update`,
        {
          nome: nome,
          funcoes: superUser ? [] : funcoesArray,
          super: superUser,
          _id: id
        }
      )

      if (apiResponse.success) {
        setDialogText("Tipo de Usuário editado com sucesso.")
        setOpenDialog(true)
        setLoading(false)
        setTimeout(() => {
          router.push("/panel/tipoUsuario")
        }, 2000)
      }

      setLoading(false)
    } else {
      const apiResponse = await HttpRequest.Post("/api/tipoUsuario/new", {
        nome: nome,
        funcoes: funcoesArray,
        super: superUser
      })

      if (apiResponse.success) {
        setDialogText("Tipo de Usuário criado com sucesso.")
        setOpenDialog(true)
        setLoading(false)
        setTimeout(() => {
          router.push("/panel/tipoUsuario")
        }, 2000)
      }

      setLoading(false)
    }
  }

  const deleteTipoUsuario = async () => {
    setLoading(true)
    const apiResponse = await HttpRequest.Delete(
      `/api/tipoUsuario/${id}/delete`
    )
    console.log(apiResponse)

    if (apiResponse.success) {
      setDialogText("Tipo de Usuário excluído com sucesso.")
      setOpenDialog(true)
      setLoading(false)
    } else {
      setDialogText("Erro ao excluir Tipo de Usuário.")
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const tipoUsuarioGetById = async (id: string) => {
    const apiResponse = await HttpRequest.Get(`/api/tipoUsuario/${id}`)
    console.log(apiResponse)

    if (apiResponse.success) {
      setNome(apiResponse.data.data.tipoUsuario.nome)
      setSuperUser(apiResponse.data.data.tipoUsuario.super)
      setFuncoesOptions(apiResponse.data.data.funcoes)
      setFuncoesList(apiResponse.data.data.funcoes)
    } else {
      await router.push("/panel/tipoUsuario")
    }
  }

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={salvarTipoUsuario}
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
        router.push("/panel/tipoUsuario")
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
      onClick={deleteTipoUsuario}
    >
      Excluir
    </Button>
  )

  return (
    <ViewPanel
      title="Tipo de Usuário"
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
      {JSON.stringify(id)}
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Checkbox
              checked={superUser}
              onClick={() => {
                setSuperUser(!superUser)
              }}
            />
            <Typography>Super User</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <List>
              <ListItem>
                <Typography fontWeight="bold">Funções Associadas</Typography>
              </ListItem>
              {funcoesOptions.map(item => (
                <ListItem key={item._id.toString()}>
                  <ListItemButton dense disableRipple>
                    <ListItemIcon>
                      <Switch
                        disabled={superUser}
                        disableRipple
                        checked={item.checked}
                        onClick={() => {
                          handleChecked(item)
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText>{item.nome}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
