import { ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
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
import { FuncaoDocument } from "@schema/Funcao"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

export default function TipoUsuarioManagement() {
  const router = useRouter()

  const [id, setId] = useState<string | undefined>(undefined)
  const [nome, setNome] = useState<string>("")
  const [funcoesList, setFuncoesList] = useState<FuncaoDocument[]>([])
  const [funcoesOptions, setFuncoesOptions] = useState<FuncaoDocument[]>([])
  const [superUser, setSuperUser] = useState<boolean>(false)

  const [checked, setChecked] = useState<boolean[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<boolean[]>([false])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

  useEffect(() => {
    const funcoesGetList = async () => {
      const apiResponse = await HttpRequest.Post("/api/funcoes/search", {
        searchText: "",
        page: 0,
        rowsperpage: 999999
      })

      if (apiResponse && apiResponse.data.list.length > 0) {
        setFuncoesOptions(apiResponse.data.list)
      }
    }

    funcoesGetList()
  }, [])

  const handleChecked = async (index: number, item: FuncaoDocument) => {
    const result = funcoesList.indexOf(item)

    let temp = [...funcoesList]
    if (result >= 0) {
      temp.splice(index, 1)
    } else {
      temp[index] = item
    }
    setFuncoesList(temp)
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

    if (funcoesList.length <= 0) {
      setDialogText(
        "Escolha pelo menos 1 Função Associada a este Tipo de Usuário."
      )
      setOpenDialog(true)
      setLoading(false)
    }

    const funcoesArray = funcoesList.map(item => item._id)

    const apiResponse = await HttpRequest.Post("/api/tipoUsuario/new", {
      nome: nome,
      funcoes: funcoesArray,
      super: superUser
    })

    console.log(apiResponse)
    setLoading(false)
  }

  const deleteFuncao = async () => {}

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
      onClick={deleteFuncao}
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
      {JSON.stringify(superUser)}
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
              {funcoesOptions.map((item, index) => (
                <ListItem key={item._id.toString()}>
                  <ListItemButton dense disableRipple>
                    <ListItemIcon>
                      <Switch
                        disableRipple
                        checked={checked[index]}
                        onClick={() => {
                          handleChecked(index, item)
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
