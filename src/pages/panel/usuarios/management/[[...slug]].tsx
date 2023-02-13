import { ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import {
  ArrowBack,
  DeleteForever,
  Save,
  Visibility,
  VisibilityOff
} from "@mui/icons-material"
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip
} from "@mui/material"
import { usuarioSaveInput } from "@validation/Usuario/usuarioSave"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

export default function UsuarioManagement() {
  const [id, setId] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")
  const [tipoUsuario, setTipoUsuario] = useState<any | undefined>(undefined)

  const [tipoUsuarioList, setTipoUsuarioList] = useState<any[]>([])

  const router = useRouter()
  const slug = router.query.slug

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<boolean[]>([false, false, false])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

  const getTipoUsuarioList = async () => {
    const list = await HttpRequest.Post("/api/tipoUsuario/search", {
      searchText: "",
      page: 0,
      rowsperpage: 999999
    })

    if (list && list.data.list.length > 0) {
      setTipoUsuarioList(list.data.list)
    }
  }

  const usuarioGetById = async (id: string) => {
    const apiResponse = await HttpRequest.Get(`/api/usuarios/${id}`)

    if (apiResponse.success) {
      setEmail(apiResponse.data.usuario.email)
      setSenha(apiResponse.data.usuario.senha)
      setTipoUsuario(apiResponse.data.tipoUsuario)
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        setId("")
        setLoading(false)
        getTipoUsuarioList()
      } else {
        setId(slug[0])
        usuarioGetById(slug[0])
        getTipoUsuarioList()
      }
    }
  }, [router.isReady, slug])

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const deleteUsuario = async () => {
    setLoading(true)
    const apiResponse = await HttpRequest.Delete(`/api/usuarios/${id}/delete`)

    if (apiResponse.success) {
      setDialogText("Usuário excluído com sucesso.")
      setOpenDialog(true)
      setLoading(false)
      setTimeout(() => {
        router.push("/panel/usuarios")
      }, 2000)
    } else {
      setDialogText("Erro ao excluir Usuário.")
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const salvarUsuario = async () => {
    setLoading(true)

    if (!email) {
      const temp = [...errorList]
      temp[0] = true
      setErrorList(temp)
      setDialogText("Por favor, insira o e-mail do usuário.")
      setOpenDialog(true)
      setLoading(false)
      return
    }

    if (!senha) {
      const temp = [...errorList]
      temp[1] = true
      setErrorList(temp)
      setDialogText("Por favor, insira a senha do usuário.")
      setOpenDialog(true)
      setLoading(false)
      return
    }

    if (!tipoUsuario) {
      const temp = [...errorList]
      temp[2] = true
      setErrorList(temp)
      setDialogText("Por favor, escolha o Tipo de Usuário.")
      setOpenDialog(true)
      setLoading(false)
      return
    }

    const tempPassword = Math.random().toString(36).slice(2, 7)

    // const s = await genSaltSync(10)
    // const hash = await hashSync(tempPassword, s)

    const usuarioObj: usuarioSaveInput = {
      _id: id ? id : undefined,
      email: email,
      senha: tempPassword,
      tipoUsuario: tipoUsuario._id
    }

    const apiResponse = await HttpRequest.Post("/api/usuarios/save", usuarioObj)

    if (apiResponse.success) {
      setDialogText(apiResponse.message ? apiResponse.message : "Sucesso!!!")
      setOpenDialog(true)
      setLoading(false)

      setTimeout(() => {
        router.push("/panel/usuarios")
      }, 2000)
    } else {
      setDialogText(
        apiResponse.message ? apiResponse.message : "Erro ao criar Usuário."
      )
      setOpenDialog(true)

      setLoading(false)
      return
    }
  }

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={salvarUsuario}
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
        router.push("/panel/usuarios")
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
      onClick={deleteUsuario}
    >
      Excluir
    </Button>
  )

  return (
    <ViewPanel
      title="Usuários"
      bottonButtons={
        id ? [backButton, saveButton, deleteButton] : [backButton, saveButton]
      }
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
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              disabled={loading}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setEmail(e.target.value)
              }}
              error={errorList[0]}
              label="E-mail"
              fullWidth
              InputLabelProps={{ shrink: email !== "" ? true : false }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const tmp = [...errorList]
                  tmp[1] = false
                  setErrorList(tmp)
                  setSenha(e.target.value)
                }}
                value={senha}
                error={errorList[1]}
                endAdornment={
                  <InputAdornment position="end">
                    <Tooltip title={showPassword ? "Esconder" : "Mostrar"}>
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? (
                          <VisibilityOff color="primary" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
                label="Senha"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
              <InputLabel id="tipoListaSelectLabel">Tipo de Usuário</InputLabel>
              <Select
                error={errorList[2]}
                labelId="tipoUsuarioLabelId"
                label="Tipo de Usuário"
                value={tipoUsuario}
                onChange={(event: SelectChangeEvent<string>) => {
                  const tmp = [...errorList]
                  tmp[2] = false
                  setErrorList(tmp)
                  setTipoUsuario(event.target.value)
                }}
              >
                <MenuItem value={"undefined"}>{"SELECIONE UM TIPO"}</MenuItem>
                {tipoUsuarioList.map((tipo, index) => (
                  <MenuItem
                    key={`item-metodo-list-${tipo}-${index}`}
                    value={tipo}
                  >
                    {tipo.nome}
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
