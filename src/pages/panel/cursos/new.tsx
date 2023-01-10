import { ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import { ArrowBack, Save } from "@mui/icons-material"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField
} from "@mui/material"
import { cursoCreateInput } from "@validation/Cursos/cursoCreate"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

export default function CursosCreate() {
  const [nomeCurso, setNomeCurso] = useState<string>("")
  const [urlCurso, setUrlCurso] = useState<string>("")
  const [ativo, setAtivo] = useState<boolean>(false)
  const [destaque, setDestaque] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<boolean[]>([
    false,
    false,
    false,
    false
  ])
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [textDialog, setTextDialog] = useState<string>("")

  const router = useRouter()

  const handleAtivoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAtivo(event.target.checked)
  }

  const handleDestaqueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestaque(event.target.checked)
  }

  const salvarNovoCurso = async () => {
    setLoading(true)
    if (!nomeCurso) {
      const temp = [...errorList]
      temp[0] = true
      setErrorList(temp)
    }
    if (!urlCurso) {
      const temp = [...errorList]
      temp[1] = true
      setErrorList(temp)
    }

    const cursoObj: cursoCreateInput = {
      active: ativo,
      nome: nomeCurso,
      url: urlCurso,
      destaque: destaque
    }

    const apiResponse = await HttpRequest.Post("/api/cursos/new", cursoObj)

    if (apiResponse.success) {
      setShowDialog(true)
      setTextDialog("Curso inserido com sucesso.")
      setLoading(false)

      setNomeCurso("")
      setUrlCurso("")
      setAtivo(false)
      setDestaque(false)
    } else {
      setShowDialog(true)
      setTextDialog(
        apiResponse.message
          ? apiResponse.message
          : "Erro ao inserir Novo Curso."
      )
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
        router.push("/panel/cursos")
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
      onClick={salvarNovoCurso}
    >
      Salvar
    </Button>
  )

  return (
    <ViewPanel
      title="Novo Curso"
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
          text: "Cursos",
          iconName: "auto_stories",
          href: "/panel/cursos"
        }
      ]}
      loading={{
        isLoading: loading,
        onClose: () => {
          setLoading(false)
        }
      }}
      bottonButtons={[backButton, saveButton]}
      snack={{
        open: showDialog,
        message: textDialog,
        onClose: () => {
          setShowDialog(false)
        }
      }}
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              disabled={loading}
              value={nomeCurso}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setNomeCurso(e.target.value)
              }}
              error={errorList[0]}
              label="Nome do Curso"
              fullWidth
              inputProps={{
                maxLength: 1000
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              disabled={loading}
              value={urlCurso}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setUrlCurso(e.target.value)
              }}
              error={errorList[1]}
              label="URL do Curso"
              fullWidth
              inputProps={{
                maxLength: 1000
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormGroup>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="medium"
                        checked={ativo}
                        onChange={handleAtivoChange}
                      />
                    }
                    label="Ativo"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="medium"
                        checked={destaque}
                        onChange={handleDestaqueChange}
                      />
                    }
                    label="Destaque"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
