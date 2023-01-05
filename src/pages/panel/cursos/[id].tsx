import { ViewPanel } from "@Components/Panel"
import { ArrowBack, DeleteForever, Save } from "@mui/icons-material"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField
} from "@mui/material"
import { cursoIdInput } from "@validation/Cursos/cursoId"
import { cursoUpdateInput } from "@validation/Cursos/cursoUpdate"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import HttpRequest from "../../../lib/frontend/HttpRequest"

export default function CursosUpdate() {
  // const [id, setId] = useState<string>("")
  const [cursoId, setCursoId] = useState<string>("")
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
  useEffect(() => {
    const { id } = router.query
    if (id) setCursoId(id ? id.toString() : "")
    if (!router.isReady) return

    if (id) getCursoById({ id: id.toString() })
  }, [router.isReady])

  const getCursoById = async (params: cursoIdInput) => {
    const apiResponse = await HttpRequest.Get(`/api/cursos/${params.id}`)
    if (apiResponse.success) {
      setNomeCurso(apiResponse.data.nome)
      setAtivo(apiResponse.data.ativo ? apiResponse.data.ativo : false)
      setDestaque(apiResponse.data.destaque ? apiResponse.data.destaque : false)
      setUrlCurso(apiResponse.data.url)
    } else {
      console.log(apiResponse.message)
    }
  }

  const handleAtivoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAtivo(event.target.checked)
  }

  const handleDestaqueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestaque(event.target.checked)
  }

  const editarCurso = async () => {
    setLoading(true)
    if (!nomeCurso) {
      const temp = [...errorList]
      temp[0] = true
      setErrorList(temp)
      return
    }
    if (!urlCurso) {
      const temp = [...errorList]
      temp[1] = true
      setErrorList(temp)
      return
    }

    const cursoObj: cursoUpdateInput = {
      id: cursoId,
      active: ativo,
      nome: nomeCurso,
      url: urlCurso,
      destaque: destaque
    }

    const apiResponse = await HttpRequest.Post(
      `/api/cursos/${cursoId}/update`,
      cursoObj
    )

    if (apiResponse.success) {
      setShowDialog(true)
      setTextDialog("Curso editado com sucesso.")
      setLoading(false)
    } else {
      setShowDialog(true)
      setTextDialog(
        apiResponse.message ? apiResponse.message : "Erro ao editar Curso"
      )
      setLoading(false)
    }
  }

  const excluirCurso = async () => {
    setLoading(true)
    const apiResponse = await HttpRequest.Post(
      `/api/cursos/${cursoId}/delete`,
      { id: cursoId }
    )

    if (apiResponse.success) {
      setShowDialog(true)
      setTextDialog("Curso excluído com sucesso.")
      setLoading(false)

      setNomeCurso("")
      setUrlCurso("")
      setAtivo(false)
      setDestaque(false)
    } else {
      setShowDialog(true)
      setTextDialog(
        apiResponse.message ? apiResponse.message : "Erro ao excluir Curso."
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
      onClick={editarCurso}
    >
      Salvar
    </Button>
  )

  const deleteButton = (
    <Button
      fullWidth
      sx={{ backgroundColor: "red" }}
      disabled={loading}
      variant="contained"
      startIcon={<DeleteForever />}
      onClick={excluirCurso}
    >
      Excluir
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
      bottonButtons={[backButton, saveButton, deleteButton]}
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
