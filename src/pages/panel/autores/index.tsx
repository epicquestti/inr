import { DataGridV2, ViewPanel } from "@Components/Panel"
import { HttpRequest } from "@lib/frontend"
import { Add, Search, Visibility } from "@mui/icons-material"
import { Button, Grid, Paper, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

export default function Autores() {
  const [searchText, setSearchText] = useState<string>("")
  const [autoresList, setAutoresList] = useState<any[]>([])

  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const makeSearch = async () => {
    try {
      setLoading(true)

      const apiResponse = await HttpRequest.Post("/api/autores/search", {
        searchText,
        page,
        rowsperpage
      })
      if (apiResponse.success) {
        setAutoresList(apiResponse.data.list)
        setCount(apiResponse.data.count)
        setLoading(false)
      } else throw new Error(apiResponse.message)
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
          await visualizarAutor(id)
          break
      }
    } catch (error: any) {
      setMessageText(error.message)
      setOpenMessage(true)
      setLoading(false)
    }
  }

  const visualizarAutor = (id: string) => {
    try {
      setLoading(true)
      router.push(`/panel/autores/management/${id}`)
    } catch (error: any) {
      setMessageText(error.message)
      setOpenMessage(true)
      setLoading(false)
    }
  }

  const searchByEnterKeyPress = async (e: any) => {
    if (e.key === "Enter") await makeSearch()
  }

  const novoAutor = () => {
    router.push("/panel/autores/management/new")
  }

  const changePage = async (page: number) => {
    setPage(page)
    await makeSearch()
  }

  const changeRowsPerPage = async (rowsPerPage: number) => {
    setRowsperpage(rowsPerPage)
  }

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
              label="Buscar Autor"
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
              onClick={novoAutor}
            >
              Novo
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGridV2
              loading={loading}
              data={autoresList}
              headers={[
                {
                  text: "Nome",
                  attrName: "nome"
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
