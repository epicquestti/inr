import { ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import { ArrowBack, DeleteForever, Save } from "@mui/icons-material"
import {
  Button,
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
import { salaTematicaSaveInput } from "@validation/SalaTematica/salaTematicaSave"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

type subSalaBooleanType = {
  _id: string
  nome: string
  checked: boolean
}

export default function SalasTematicasManagement() {
  const [id, setId] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [subSalasList, setSubSalasList] = useState<any[]>([])
  const [subSalasOptions, setSubSalasOptions] = useState<subSalaBooleanType[]>(
    []
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<boolean[]>([false])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const router = useRouter()
  const slug = router.query.slug

  const salvarSalaTematica = async () => {
    setLoading(true)

    if (!nome) {
      const temp = [...errorList]
      temp[0] = true
      setErrorList(temp)
      setDialogText(
        "Por favor, insira o nome da Sala Temática antes de salvar."
      )
      setOpenDialog(true)
      return
    }

    const subSalalasFiltered: any[] = subSalasList.filter(
      item => item.checked === true
    )
    const subSalalasIdArray: string[] = subSalalasFiltered.map(item => item._id)

    const salaTematicaObj: salaTematicaSaveInput = {
      _id: id ? id : undefined,
      nome: nome,
      subSalasTematicas: subSalalasIdArray.length > 0 ? subSalalasIdArray : []
    }

    const apiResponse = await HttpRequest.Post(
      "/api/salasTematicas/save",
      salaTematicaObj
    )

    if (apiResponse.success) {
      setDialogText(apiResponse.message ? apiResponse.message : "Sucesso!!!")
      setOpenDialog(true)
      setLoading(false)

      setTimeout(() => {
        router.push("/panel/salasTematicas")
      }, 2000)
    } else {
      setDialogText(apiResponse.message ? apiResponse.message : "Erro!!!")
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const deleteSalaTematica = async () => {}

  const salaTematicaGetById = async (id: string) => {
    const apiResponse = await HttpRequest.Get(`/api/salasTematicas/${id}`)

    console.log("apiResponse", apiResponse)

    if (apiResponse.success) {
      setNome(apiResponse.data.data.nome)
      setSubSalasList(apiResponse.data.data.subSalas)
      setSubSalasOptions(apiResponse.data.data.subSalas)
    } else {
      await router.push("/panel/salasTematicas")
    }
  }

  const subSalasTematicasGetList = async () => {
    const apiResponse = await HttpRequest.Post(
      "/api/subSalasTematicas/search",
      {
        searchText: "",
        page: 0,
        rowsperpage: 9999999
      }
    )

    if (apiResponse && apiResponse.data.list.length > 0) {
      setSubSalasOptions(apiResponse.data.list)
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        setId("")
        subSalasTematicasGetList()
        setLoading(false)
      } else {
        setId(slug[0])
        salaTematicaGetById(slug[0])
      }
    }
  }, [router.isReady, slug])

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={salvarSalaTematica}
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
      onClick={deleteSalaTematica}
    >
      Excluir
    </Button>
  )

  const handleChecked = async (item: any) => {
    const index = subSalasOptions.findIndex(element => element._id === item._id)
    const temp = [...subSalasList]
    item.checked = !item.checked
    temp[index] = item
    setSubSalasList(temp)
  }

  return (
    <ViewPanel
      title="Salas Temáticas"
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
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
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <List>
              <ListItem>
                <Typography fontWeight="bold">Subsalas Temáticas</Typography>
              </ListItem>
              {subSalasOptions.map(item => (
                <ListItem key={item._id.toString()}>
                  <ListItemButton dense disableRipple>
                    <ListItemIcon>
                      <Switch
                        disabled={loading}
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
