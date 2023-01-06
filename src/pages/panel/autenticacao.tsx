import { HttpRequest } from "@lib/frontend"
import {
  AccountCircle,
  Bookmark,
  BookmarkBorder,
  Close,
  Lock,
  Login,
  Visibility,
  VisibilityOff
} from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useCookies } from "react-cookie"

const Autenticacao: NextPage = () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(["inrpanel"])
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [senha, setSenha] = useState<string>("")
  const [keepConnected, setKeepConnected] = useState(false)
  const [erro, setErro] = useState<boolean[]>([false, false])

  const changePassVisibility = () => {
    const tmp = showPass
    setShowPass(!tmp)
  }

  const makeLogin = async () => {
    try {
      if (!email) {
        setErro([true, false])
        throw new Error("Email não pode ser vazio.")
      }

      if (!senha) {
        setErro([false, true])
        throw new Error("Senha não pode ser vazio.")
      }

      const apiResponse = await HttpRequest.Post("/api/auth/panelLogin", {
        email,
        senha,
        keepConnected: `${keepConnected}`
      })

      if (apiResponse.success) {
        console.log(apiResponse)

        setCookie("inrpanel", apiResponse.data.credential, {
          path: "/"
        })
        return
      } else throw new Error(apiResponse.message)
    } catch (error: any) {
      setLoading(false)
      setMessage(error.message)
      setAlert(true)
      return
    }
  }

  const LoginOnKeyPress = async (e: any) => {
    if (e.key === "Enter") await makeLogin()
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex"
      }}
    >
      <Box
        sx={{
          width: "25%",
          height: "100vh",
          background: theme => theme.palette.primary.light,
          display: "inherit",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            width: "90%",
            display: "inherit",
            p: 3
          }}
        >
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h5">INR</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              Painel de gerenciamento INR
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                type="text"
                fullWidth
                id="email"
                label="email"
                disabled={loading}
                onKeyPress={LoginOnKeyPress}
                variant="standard"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (erro[0]) setErro(arrayErro => [false, false])
                  setEmail(e.target.value)
                }}
                value={email}
                error={erro[0]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                type={showPass ? "text" : "password"}
                fullWidth
                id="pass"
                label="senha"
                variant="standard"
                disabled={loading}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (erro[1]) setErro(arrayErro => [false, false])
                  setSenha(e.target.value)
                }}
                onKeyPress={LoginOnKeyPress}
                error={erro[1]}
                value={senha}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={changePassVisibility}
                      >
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={loading}
                        icon={<BookmarkBorder />}
                        checkedIcon={<Bookmark />}
                        onKeyPress={LoginOnKeyPress}
                        onChange={(
                          _: ChangeEvent<HTMLInputElement>,
                          checked: boolean
                        ) => {
                          setKeepConnected(checked)
                        }}
                        checked={keepConnected}
                      />
                    }
                    label="Manter conectado"
                  />
                </FormGroup>
                <Button variant="text">Recuperar senha</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <LoadingButton
                loading={loading}
                variant="contained"
                fullWidth
                endIcon={<Login />}
                onClick={makeLogin}
                onKeyPress={LoginOnKeyPress}
              >
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          width: "75%",
          height: "100vh",
          background: theme => theme.palette.primary.contrastText,
          display: "inherit",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        inr img
        {/* <Image
          width={320}
          height={120}
          src="https://store.invia.app.br/assets/invia-logo-dark.png"
          alt="Invia Logo"
        /> */}
      </Box>

      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => {
          setAlert(false)
        }}
        message={message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setAlert(false)
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Box>
  )
}

export default Autenticacao
