import { ViewPanel } from "@Components/Panel"
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
import { cursoIdInput } from "@validation/Cursos/cursoId"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import HttpRequest from "../../../lib/frontend/HttpRequest"

export default function CursosUpdate() {
  // const [id, setId] = useState<string>("")
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
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    console.log("ID", id)

    if (!router.isReady) return

    if (id) getCursoById({ id: id.toString() })
  }, [router.isReady])

  const getCursoById = async (params: cursoIdInput) => {
    const apiResponse = await HttpRequest.Get(`/api/cursos/${params.id}`)
    console.log(apiResponse)

    if (apiResponse.success) {
      setNomeCurso(apiResponse.data.nome)
      setAtivo(apiResponse.data.ativo)
      setDestaque(apiResponse.data.destaque)
      setUrlCurso(apiResponse.data.url)
    } else {
      // throw new Error(apiResponse.message)
      console.log("Error")
    }
  }

  const handleAtivoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAtivo(event.target.checked)
  }

  const handleDestaqueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestaque(event.target.checked)
  }

  const salvarNovoCurso = async () => {
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

    console.log(apiResponse)
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
