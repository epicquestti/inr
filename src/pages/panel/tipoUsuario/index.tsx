import { DataGridV2, ViewPanel } from "@Components/Panel"
import { Add, Search, Visibility } from "@mui/icons-material"
import { Button, Grid, Paper, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

export default function TipoUsuario() {
  const [searchText, setSearchText] = useState<string>("")
  const [tipoUsuarioList, setTipoUsuarioList] = useState<any[]>([])

  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const searchByEnterKeyPress = async (e: any) => {
    if (e.key === "Enter") await makeSearch()
  }

  const novoTipoUsuario = () => {
    router.push("/panel/tipoUsuario/management/new")
  }

  const changePage = async (page: number) => {
    setPage(page)
    await makeSearch()
  }

  const changeRowsPerPage = async (rowsPerPage: number) => {
    setRowsperpage(rowsPerPage)
  }

  const actionDecision = async (id: string, actionName: string) => {
    try {
      switch (actionName) {
        case "getById":
          await visualizarTipoUsuario(id)
          break
      }
    } catch (error: any) {
      setMessageText(error.message)
      setOpenMessage(true)
      setLoading(false)
    }
  }

  const visualizarTipoUsuario = (id: string) => {
    try {
      setLoading(true)
      router.push(`/panel/tipoUsuario/management/${id}`)
    } catch (error: any) {
      setMessageText(error.message)
      setOpenMessage(true)
      setLoading(false)
    }
  }

  const makeSearch = async () => {}

  return (
    <ViewPanel>
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
              label="Buscar Função"
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
                  text: "Super",
                  attrName: "super"
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
