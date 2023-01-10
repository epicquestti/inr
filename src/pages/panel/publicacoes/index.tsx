import { DataGridV2, ViewPanel } from "@Components/Panel"
import HttpRequest from "@lib/frontend/HttpRequest"
import { ArrowBack, PlusOne, Visibility } from "@mui/icons-material"
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

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

export default function SearchPublicacao() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const [type, setType] = useState<string>("Boletim")
  const [publicacaoList, setPublicacaoList] = useState<
    publicacao[] | undefined
  >([])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")

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

  const newPublication = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      onClick={() => {
        setLoading(true)
        router.push("/panel/publicacoes/new")
      }}
      startIcon={<PlusOne />}
    >
      Novo
    </Button>
  )

  const voltarBotton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      startIcon={<ArrowBack />}
      onClick={() => {
        router.push("/panel")
      }}
    >
      Voltar
    </Button>
  )

  const actionExecution = (id: string, actionName: string) => {
    try {
      switch (actionName) {
        case "getById":
          setLoading(true)
          router.push(`/panel/publicacoes/${id}`)
          break
        case "deleteById":
          break
      }
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
    }
  }

  return (
    <ViewPanel
      title="Publicações"
      location={[
        {
          text: "Home",
          iconName: "home",
          href: "/panel"
        },
        {
          text: "Boletim Eletrônico",
          iconName: "auto_stories",
          href: ""
        },
        {
          text: "Publicações",
          iconName: "forward_to_inbox",
          href: "/panel/publicacoes"
        }
      ]}
      snack={{
        message: dialogText,
        onClose: () => {
          setOpenDialog(false)
        },
        open: openDialog
      }}
      bottonButtons={[voltarBotton, newPublication]}
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
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
            <DataGridV2
              loading={loading}
              // selectable
              hasActions
              actionTrigger={actionExecution}
              // groupActions={[
              //   {
              //     text: "Excluir",
              //     name: "groupDelete",
              //     icon: "delete"
              //   }
              // ]}
              actions={[
                {
                  text: "Vizualizar",
                  name: "getById",
                  icon: <Visibility />
                }
              ]}
              pagination={{
                count: count,
                page: page,
                rowsPerPage: rowsperpage,
                onPageChange: changePage,
                onRowsPerPageChange: changeRowsPerPage,
                rowsPerPageOptions: [5, 10, 20, 30, 40, 50, 100]
              }}
              data={publicacaoList}
              headers={[
                {
                  text: "Título",
                  attrName: "title"
                },
                {
                  text: "Tipo",
                  attrName: "type"
                },
                {
                  text: "Aprovação",
                  attrName: "aproved"
                },
                {
                  text: "Publicação",
                  attrName: "published"
                }
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
