import { DataGrid, local, Location, ViewPanel } from "@Components/Panel"
import HttpRequest from "@lib/RequestApi"
import { ArrowBack, Close, PlusOne } from "@mui/icons-material"
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import React, { ChangeEvent, useState } from "react"
const location: local[] = [
  {
    text: "Home",
    iconName: "home",
    href: "/"
  },
  {
    text: "Boletim Eletrônico",
    iconName: "auto_stories",
    href: "/panel/publicacoes"
  },
  {
    text: "Publicações",
    iconName: "forward_to_inbox",
    href: "/panel/publicacoes"
  }
]
type publicacao = {
  id: any
  title: string
  type: string
  createdAt: string
  aproved: "APROVADO" | "Ñ APROVADO"
  published: "PUBLICADO" | "Ñ PUBLICADO"
  updatedAt: Date | undefined
  aprovedAt: Date | undefined
  publishedAt: Date | undefined
}
type serverSideResponse = {
  publicacaoList?: publicacao[]
  count: number
}

export default function SearchPublicacao(props: serverSideResponse) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>()
  const [searchText, setSearchText] = useState<string>("")
  const [type, setType] = useState<string>("Boletim")

  const [publicacaoList, setPublicacaoList] = useState<
    publicacao[] | undefined
  >([])
  const [count, setCount] = useState<number>(props.count)
  const [page, setPage] = useState<number | undefined>(0)
  const [rowsperpage, setRowsperpage] = useState<number>(5)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const onSelect = (id: string) => {
    setLoading(true)
    router.push(`/panel/publicacoes/${id}`)
  }

  const changeRowsPerPage = async (rpp: number) => {
    setRowsperpage(rpp)

    try {
      setLoading(true)

      const res = await HttpRequest.Get(
        `/api/publicacoes?text=${searchText}&tipo=${type}&rowsPerPage=${rpp}&page=${page}`
      )

      if (res.success) setPublicacaoList(res.data.publicacoes)
      else setDialogText(res.message || "")
    } catch (error) {
      setDialogText(JSON.stringify(error))
      return
    } finally {
      setLoading(false)
      return
    }
  }

  const changePage = async (page: number) => {
    setPage(page)

    try {
      setLoading(true)

      const res = await HttpRequest.Get(
        `/api/publicacoes?text=${searchText}&tipo=${type}&rowsPerPage=${rowsperpage}&page=${page}`
      )

      if (res.success) setPublicacaoList(res.data.publicacoes)
      else setDialogText(res.message || "")
    } catch (error) {
      setDialogText(JSON.stringify(error))
      return
    } finally {
      setLoading(false)
      return
    }
  }

  const makeSearch = async () => {
    try {
      setLoading(true)

      const res = await HttpRequest.Get(
        `/api/publicacoes?text=${searchText}&tipo=${type}&rowsPerPage=${rowsperpage}&page=${page}`
      )

      if (res.success) {
        setPublicacaoList(res.data.publicacoes)
        setCount(res.data.count)
        setPage(0)
      } else setDialogText(res.message || "")
    } catch (error) {
      setDialogText(JSON.stringify(error))
      return
    } finally {
      setLoading(false)
      return
    }
  }

  const selectType = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }

  const searchByEnterKeyPress = async (e: any) => {
    if (e.key === "Enter") await makeSearch()
  }
  return (
    <ViewPanel>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Location location={location} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6">Publicações</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <TextField
              value={searchText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchText(e.target.value)
              }}
              onKeyPress={searchByEnterKeyPress}
              disabled={loading}
              label="Buscar publicação."
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <RadioGroup row value={type} onChange={selectType}>
              <FormControlLabel
                value="Boletim"
                control={<Radio disabled={loading} />}
                label="Boletim"
              />
              <FormControlLabel
                value="Classificador"
                control={<Radio disabled={loading} />}
                label="Classificador"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button
              onClick={makeSearch}
              disabled={loading}
              variant="contained"
              fullWidth
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGrid
              onPageChange={changePage}
              onRowsPerPageChange={changeRowsPerPage}
              loading={loading}
              rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100]}
              rowsPerPage={rowsperpage}
              page={page}
              count={count}
              onSelectedRow={(id: string | number) => {
                onSelect(id.toString())
              }}
              gridData={publicacaoList}
              gridHeaders={[
                {
                  headerName: "Título",
                  field: "title",
                  align: "left"
                },
                {
                  headerName: "Tipo",
                  field: "type",
                  align: "center"
                },
                {
                  headerName: "Aprovação",
                  field: "aproved",
                  align: "center"
                },
                {
                  headerName: "Publicação",
                  field: "published",
                  align: "center"
                }
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <Button
                disabled={loading}
                variant="contained"
                startIcon={<ArrowBack />}
              >
                Voltar
              </Button>

              <Button
                disabled={loading}
                variant="contained"
                onClick={() => {
                  router.push("/panel/publicacoes/new")
                }}
                startIcon={<PlusOne />}
              >
                Novo
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={openDialog}
          autoHideDuration={6000}
          onClose={handleCloseDialog}
          message={dialogText}
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseDialog}
              >
                Fechar
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseDialog}
              >
                <Close fontSize="small" />
              </IconButton>
            </>
          }
        />
      </Paper>
    </ViewPanel>
  )
}
