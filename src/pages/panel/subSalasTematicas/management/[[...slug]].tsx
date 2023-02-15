import { ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import { ArrowBack, DeleteForever, Save } from "@mui/icons-material"
import { Button, Grid, Paper, TextField } from "@mui/material"
import { subSalaTematicaSaveInput } from "@validation/SubSalaTematica/subSalaTematicaSave"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"

export default function SubSalasTematicasManagement() {
  const [id, setId] = useState<string>("")
  const [nome, setNome] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<boolean[]>([false])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const router = useRouter()
  const slug = router.query.slug

  const subSalaTematicaGetById = async (id: string) => {
    const apiResponse = await HttpRequest.Get(`/api/subSalasTematicas/${id}`)

    console.log(apiResponse)

    if (apiResponse.success) {
      setNome(apiResponse.data.data.nome)
    }
  }

  useEffect(() => {
    if (!router.isReady) return

    if (slug) {
      if (slug[0] === "new") {
        setId("")
        setLoading(false)
      } else {
        setId(slug[0])
        subSalaTematicaGetById(slug[0])
      }
    }
  }, [router.isReady, slug])

  const salvarSubSalaTematica = async () => {
    setLoading(true)

    if (!nome) {
      const temp = [...errorList]
      temp[0] = true
      setErrorList(temp)
      setDialogText("Por favor, insira o nome da Sub Sala Temática.")
      setOpenDialog(true)
      setLoading(false)
      return
    }

    const subSalaTematicaObj: subSalaTematicaSaveInput = {
      _id: id ? id : undefined,
      nome: nome
    }

    const apiResponse = await HttpRequest.Post(
      `/api/subSalasTematicas/save`,
      subSalaTematicaObj
    )

    if (apiResponse.success) {
      setDialogText(apiResponse.message ? apiResponse.message : "Sucesso!!!")
      setOpenDialog(true)
      setLoading(false)

      if (!id) {
        setTimeout(() => {
          router.push("/panel/subSalasTematicas")
        }, 2000)
      }
    } else {
      setDialogText(apiResponse.message ? apiResponse.message : "Erro!!!")
      setOpenDialog(true)

      setLoading(false)
      return
    }
  }

  const deleteSubSalaTematica = async () => {
    setLoading(true)
    const apiResponse = await HttpRequest.Delete(
      `/api/subSalasTematicas/${id}/delete`
    )

    if (apiResponse.success) {
      setDialogText("Sub Sala Temática excluída com sucesso.")
      setOpenDialog(true)
      setLoading(false)

      setTimeout(() => {
        router.push("/panel/subSalasTematicas")
      }, 2000)
    } else {
      setDialogText("Erro ao excluir Sub Sala Temática.")
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<Save />}
      onClick={salvarSubSalaTematica}
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
        router.push("/panel/subSalasTematicas")
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
      onClick={deleteSubSalaTematica}
    >
      Excluir
    </Button>
  )

  return (
    <ViewPanel
      title="Sub Salas Temáticas"
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
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
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
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
