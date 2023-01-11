import { ViewPanel } from "@Components/Panel"
import { functionNivel, functionTipo } from "@lib/data/funcao"
import { HttpRequest } from "@lib/frontend"
import { ArrowBack, DeleteForever, Save } from "@mui/icons-material"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import {
  Autocomplete,
  Button,
  Checkbox,
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
import { ChangeEvent, useEffect, useState } from "react"

export default function FuncaoManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [errorList, setErrorList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false
  ])

  const [id, setId] = useState<string | undefined>(undefined)
  const [nome, setNome] = useState<string>("")
  const [root, setRoot] = useState<string>("")
  const [icone, setIcone] = useState<string>("")
  const [nivel, setNivel] = useState<string>("")
  const [tipo, setTipo] = useState<string>("")

  const [apiList, setApiList] = useState<any[]>([])
  const [apiOptions, setApiOptions] = useState<any[]>([])
  const [usuariosOptions, setUsuariosOptions] = useState<any[]>([])
  const [tipoUsuarioAutorizadoList, setTipoUsuarioAutorizadoList] = useState<
    any[]
  >([])
  const [textSearch, setTextSearch] = useState<string>("")

  const slug = router.query.slug

  const searchApi = async (text: string) => {
    const apiResponse = await HttpRequest.Post("/api/apis/search", {
      searchText: text,
      page: 0,
      rowsperpage: 1000
    })

    if (apiResponse.data.list.length > 0) {
      setApiOptions(apiResponse.data.list)
    }
  }

  const getThisFunction = async () => {
    try {
      const apiResponse = await HttpRequest.Get(`/api/funcoes/${id}`)

      if (apiResponse.success) {
        setId(apiResponse.data._id)
        setNome(apiResponse.data.nome)
        setRoot(apiResponse.data.root)
        setIcone(apiResponse.data.icone)
        setNivel(apiResponse.data.nivel)
        setTipo(apiResponse.data.tipo)
      } else throw new Error(apiResponse.message)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
      return
    }
  }

  const saveThisFuncao = async () => {
    try {
      if (!nome) {
        const temp = [...errorList]
        temp[0] = true
        setErrorList(temp)
        throw new Error("Url não pode estar vazio.")
      }
      if (!root) {
        const temp = [...errorList]
        temp[1] = true
        setErrorList(temp)
        throw new Error("Root não pode estar vazio.")
      }
      if (!icone) {
        const temp = [...errorList]
        temp[2] = true
        setErrorList(temp)
        throw new Error("Ícone não pode estar vazio.")
      }
      if (!nivel) {
        const temp = [...errorList]
        temp[3] = true
        setErrorList(temp)
        throw new Error("Nível não pode estar vazio.")
      }
      if (!tipo) {
        const temp = [...errorList]
        temp[4] = true
        setErrorList(temp)
        throw new Error("Tipo não pode estar vazio.")
      }
      if (tipoUsuarioAutorizadoList.length <= 0) {
        const temp = [...errorList]
        temp[5] = true
        setErrorList(temp)
        throw new Error("Tipo de Usuário autorizado não pode estar vazio.")
      }
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
      return
    }
  }

  const deleteFuncao = async () => {}

  useEffect(() => {
    const aa = async () => {
      await getThisFunction()
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

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={saveThisFuncao}
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
        router.push("/panel/funcao")
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

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  return (
    <ViewPanel
      title="Nova Função"
      location={[
        {
          text: "Home",
          iconName: "home",
          href: "/panel"
        },
        {
          text: "Função",
          iconName: "desktop_windows",
          href: "/panel/funcao"
        },
        {
          text: "Nova Função",
          iconName: "system_update_alt",
          href: "/panel/funcao/new"
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
        {JSON.stringify(apiList)}
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              disabled={loading}
              value={root}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setRoot(e.target.value)
              }}
              error={errorList[1]}
              label="Root"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              disabled={loading}
              value={icone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[2] = false
                setErrorList(tmp)
                setIcone(e.target.value)
              }}
              error={errorList[2]}
              label="Ícone"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
              <InputLabel id="nivelListaSelectLabel">Nível</InputLabel>
              <Select
                error={errorList[3]}
                labelId="nivelListaSelectLabel"
                label="Nível"
                value={nivel}
                onChange={(event: SelectChangeEvent<string>) => {
                  const tmp = [...errorList]
                  tmp[3] = false
                  setErrorList(tmp)
                  setNivel(event.target.value)
                }}
              >
                <MenuItem value={"undefined"}>{"SELECIONE UM NÍVEL"}</MenuItem>
                {functionNivel.map((nivel, index) => (
                  <MenuItem
                    key={`item-metodo-list-${nivel}-${index}`}
                    value={nivel}
                  >
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Autocomplete
              multiple
              limitTags={1}
              id="checkboxes-tags-demo"
              options={apiOptions}
              disableCloseOnSelect
              // ListboxProps={{
              //   onScroll: async params => {
              //     params.scrollHeight === params.scrollTop + params.clientHeight
              //   }
              // }}
              getOptionLabel={option => `${option.url} - ${option.method}`}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.url}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="APIs"
                  placeholder="APIs Relacionadas"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setApiOptions([])
                    searchApi(e.target.value)
                  }}
                />
              )}
              onChange={(e: any, newValue) => {
                setApiList(newValue)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
              <InputLabel id="tipoListaSelectLabel">Tipo</InputLabel>
              <Select
                error={errorList[4]}
                labelId="tipoListaSelectLabel"
                label="Nível"
                value={tipo}
                onChange={(event: SelectChangeEvent<string>) => {
                  const tmp = [...errorList]
                  tmp[4] = false
                  setErrorList(tmp)
                  setTipo(event.target.value)
                }}
              >
                <MenuItem value={"undefined"}>{"SELECIONE UM TIPO"}</MenuItem>
                {functionTipo.map((tipo, index) => (
                  <MenuItem
                    key={`item-metodo-list-${tipo}-${index}`}
                    value={tipo}
                  >
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <InputLabel id="tipoUsuarioSelectLabel">
                Usuários Autorizados
              </InputLabel>
              <Select
                error={errorList[3]}
                labelId="tipoUsuarioSelectLabel"
                label="Usuários Autorizados"
                value={nivel}
                onChange={(event: SelectChangeEvent<string>) => {
                  const tmp = [...errorList]
                  tmp[3] = false
                  setErrorList(tmp)
                  setNivel(event.target.value)
                }}
              >
                <MenuItem value={"undefined"}>{"SELECIONE UM NÍVEL"}</MenuItem>
                {functionNivel.map((nivel, index) => (
                  <MenuItem
                    key={`item-metodo-list-${nivel}-${index}`}
                    value={nivel}
                  >
                    {nivel}
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
