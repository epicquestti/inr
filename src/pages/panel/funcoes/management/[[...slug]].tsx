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
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material"
import { Box } from "@mui/system"
import { funcaoSaveInput } from "@validation/Funcoes/funcaoSave"
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
  const [tipoUsuariosSelected, setTipoUsuariosSelected] = useState<any[]>([])
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

  const getTiposUsuario = async () => {
    const apiResponse = await HttpRequest.Post("/api/tipoUsuario/search", {
      searchText: "",
      page: 0,
      rowsperpage: 999999
    })

    if (apiResponse.data.list.length > 0) {
      setTipoUsuarioAutorizadoList(apiResponse.data.list)
    }
  }

  const saveThisFuncao = async () => {
    try {
      if (!nome) {
        const temp = [...errorList]
        temp[0] = true
        setErrorList(temp)
        throw new Error("Nome não pode estar vazio.")
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
      if (tipoUsuariosSelected.length <= 0) {
        const temp = [...errorList]
        temp[5] = true
        setErrorList(temp)
        throw new Error("Tipo de Usuário autorizado não pode estar vazio.")
      }

      const acoesArray: string[] = []

      for (let i = 0; i < apiList.length; i++) {
        const a = acoesArray.find(item => {
          item === apiList[i].type
        })
        if (!a) {
          acoesArray.push(apiList[i].type)
        }
      }

      const filteredActions: string[] = []
      acoesArray.forEach(element => {
        if (!filteredActions.includes(element)) {
          filteredActions.push(element)
        }
      })

      const tipoUsuarioArray: string[] = []

      for (let i = 0; i < tipoUsuariosSelected.length; i++) {
        tipoUsuarioArray.push(tipoUsuariosSelected[i]._id)
      }

      const apisRelacionadasArray = apiList.map(api => api._id)

      const funcaoObj: funcaoSaveInput = {
        icone: icone,
        nivel: nivel,
        nome: nome,
        root: root,
        tipo: tipo,
        acoes: filteredActions,
        tipoUsuarioAutorizado: tipoUsuarioArray,
        _id: id,
        apisRelacionadas: apisRelacionadasArray
      }

      const apiResponse = await HttpRequest.Post("/api/funcoes/new", funcaoObj)

      console.log(apiResponse)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
      return
    }
  }

  const deleteFuncao = async () => {}

  useEffect(() => {
    const getOptions = async () => {
      await getThisFunction()
    }
    if (id) {
      getOptions()
    }
  }, [id])

  useEffect(() => {
    if (!router.isReady) return

    const getOptions = async () => {
      await getTiposUsuario()
    }

    getOptions()

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

  const handleTipoUsuarioChange = (
    event: SelectChangeEvent<typeof tipoUsuariosSelected>
  ) => {
    const {
      target: { value }
    } = event

    const temp = [...errorList]
    temp[5] = false
    setErrorList(temp)
    setTipoUsuariosSelected(
      typeof value === "string" ? value.split(",") : value
    )
  }

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
                label="Tipo"
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

          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">
                Tipo de Usuário
              </InputLabel>
              <Select
                label="Tipo de Usuário"
                labelId="demo-multiple-chip-label"
                multiple
                error={errorList[5]}
                value={tipoUsuariosSelected}
                onChange={handleTipoUsuarioChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={selected => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map(value => (
                      <Chip
                        key={value._id}
                        label={value.text}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              >
                {tipoUsuarioAutorizadoList.map(item => (
                  <MenuItem key={item._id} value={item}>
                    {item.text}
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
