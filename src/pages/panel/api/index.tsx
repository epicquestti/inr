import { DataGridV2, ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import { Add, ArrowBack, Search, Visibility } from "@mui/icons-material"
import { Button, Grid, Paper, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

export default function ApiIndex() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

  const [searchText, setSearchText] = useState<string>("")
  const [apiList, setApiList] = useState<any[]>([])

  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")

  const searchByEnterKeyPress = async (e: any) => {
    if (e.key === "Enter") await makeSearch()
  }

  const changePage = async (page: number) => {
    setPage(page)
  }

  const changeRowsPerPage = async (rowsPerPage: number) => {
    setRowsperpage(rowsPerPage)
  }

  const makeSearch = async () => {
    setLoading(true)

    try {
      const apiResponse = await HttpRequest.Post("/api/apis/search", {
        searchText,
        page,
        rowsperpage
      })

      if (apiResponse.success) {
        setApiList(apiResponse.data.list)
        setCount(apiResponse.data.count)
        setLoading(false)
      } else throw new Error(apiResponse.message)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const visualizarApi = (id: string) => {
    try {
      setLoading(true)
      router.push(`/panel/api/management/${id}`)
    } catch (error: any) {
      setMessageText(error.message)
      setOpenMessage(true)
      setLoading(false)
    }
  }

  const actionDecision = async (id: string, actionName: string) => {
    try {
      switch (actionName) {
        case "getById":
          await visualizarApi(id)
          break
      }
    } catch (error: any) {
      setMessageText(error.message)
      setOpenMessage(true)
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
        router.push("/panel")
      }}
    >
      Sair
    </Button>
  )
  return (
    <ViewPanel
      title="API"
      location={[
        {
          text: "Home",
          iconName: "home",
          href: "/panel"
        },
        {
          text: "API",
          iconName: "desktop_windows",
          href: "/panel/api"
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
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextField
              value={searchText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchText(e.target.value)
              }}
              onKeyPress={searchByEnterKeyPress}
              disabled={loading}
              label="Buscar API"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button
              variant="contained"
              disabled={loading}
              onKeyPress={searchByEnterKeyPress}
              fullWidth
              endIcon={<Search />}
              onClick={makeSearch}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button
              variant="contained"
              disabled={loading}
              fullWidth
              startIcon={<Add />}
              onClick={() => {
                router.push("/panel/api/management")
              }}
            >
              Novo
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGridV2
              loading={loading}
              data={apiList}
              headers={[
                {
                  text: "URL",
                  attrName: "url"
                },
                {
                  text: "Método",
                  attrName: "method"
                },
                {
                  text: "Tipo",
                  attrName: "type"
                }
              ]}
              pagination={{
                onPageChange: changePage,
                count: count,
                page: page,
                rowsPerPage: rowsperpage,
                onRowsPerPageChange: changeRowsPerPage,
                rowsPerPageOptions: [5, 10, 20, 30, 40, 50, 100]
              }}
              hasActions
              actionTrigger={actionDecision}
              actions={[
                {
                  text: "Vizualizar",
                  icon: <Visibility />,
                  name: "getById"
                }
              ]}
            ></DataGridV2>
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
