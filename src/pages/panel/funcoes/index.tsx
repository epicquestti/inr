import { ViewPanel } from "@Components/Panel"
import { ArrowBack, PlusOne } from "@mui/icons-material"
import { Button, Paper } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

export default function FuncaoIndex() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

  const novaFuncao = async () => {}

  const saveButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<PlusOne />}
      onClick={novaFuncao}
    >
      Nova função
    </Button>
  )

  const backButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<ArrowBack />}
      onClick={() => {
        router.push("/panel")
      }}
    >
      Sair
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
