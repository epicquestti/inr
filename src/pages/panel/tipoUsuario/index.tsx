import { DataGridV2, ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import { Add, ArrowBack, Search, Visibility } from "@mui/icons-material"
import { Button, Grid, Paper, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

export default function TipoUsuario() {
  const [searchText, setSearchText] = useState<string>("")
  const [tipoUsuarioList, setTipoUsuarioList] = useState<any[]>([])

  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const searchByEnterKeyPress = async (e: any) => {
    if (e.key === "Enter") await makeSearch()
  }

  const novoTipoUsuario = () => {
    router.push("/panel/tipoUsuario/management/new")
  }

  const changePage = async (value: number) => {
    setPage(value)

    const apiResponse = await HttpRequest.Post("/api/tipoUsuario/search", {
      searchText,
      page: value,
      rowsperpage
    })

    if (apiResponse.success) {
      setTipoUsuarioList(apiResponse.data.list)
      setCount(apiResponse.data.count)
      setLoading(false)
    } else throw new Error(apiResponse.message)
  }

  const changeRowsPerPage = async (value: number) => {
    setRowsperpage(value)

    const apiResponse = await HttpRequest.Post("/api/tipoUsuario/search", {
      searchText,
      page: 0,
      rowsperpage: value
    })

    if (apiResponse.success) {
      setTipoUsuarioList(apiResponse.data.list)
      setCount(apiResponse.data.count)
      setLoading(false)
    } else throw new Error(apiResponse.message)
  }

  const actionDecision = async (id: string, actionName: string) => {
    try {
      switch (actionName) {
        case "getById":
          await visualizarTipoUsuario(id)
          break
      }
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const visualizarTipoUsuario = (id: string) => {
    try {
      setLoading(true)
      router.push(`/panel/tipoUsuario/management/${id}`)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
      setLoading(false)
    }
  }

  const makeSearch = async () => {
    try {
      setLoading(true)

      const apiResponse = await HttpRequest.Post("/api/tipoUsuario/search", {
        searchText,
        page: 0,
        rowsperpage
      })

      if (apiResponse.success) {
        setTipoUsuarioList(apiResponse.data.list)
        setPage(0)
        setCount(apiResponse.data.count)
        setLoading(false)
      } else throw new Error(apiResponse.message)

      setLoading(false)
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
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
      title="Tipo de Usuário"
      location={[
        {
          text: "Home",
          iconName: "home",
          href: "/panel"
        },
        {
          text: "Tipo de Usuário",
          iconName: "person",
          href: "/panel/tipoUsuario"
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
              label="Buscar Tipo de usuário"
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
              onClick={novoTipoUsuario}
            >
              Novo
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGridV2
              loading={loading}
              data={tipoUsuarioList}
              headers={[
                {
                  text: "Nome",
                  attrName: "nome"
                },
                {
                  text: "",
                  attrName: ""
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
