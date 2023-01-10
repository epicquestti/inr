import { ViewPanel } from "@Components/Panel"
import { ArrowBack, Save } from "@mui/icons-material"
import { Button, Paper } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

export default function FuncaoManagement() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

  const saveThisFuncao = async () => {}
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
  return (
    <ViewPanel
      title="Nova função"
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
          text: "Nova função",
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
      bottonButtons={[backButton]}
    >
      <Paper sx={{ padding: 3 }}></Paper>
    </ViewPanel>
  )
}
