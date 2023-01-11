import { DataGridV2, ViewPanel } from "@Components/Panel"
import { ArrowBack, PlusOne, Visibility } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import HttpRequest from "../../../lib/frontend/HttpRequest"

type atualizacaoList = {
  version: number
  major: number
  minor: number
  severity: string
}

export default function SearchAtualizacoes() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [version, setversion] = useState<string>("")
  const [major, setMajor] = useState<string>("")
  const [minor, setMinor] = useState<string>("")
  const [severity, setSeverity] = useState<string>("")
  const [atualizacaoList, setAtualizacaoList] = useState<atualizacaoList[]>([])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState<number | undefined>(0)
  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const changePage = async (page: number) => {}
  const changeRowsPerPage = async (rpp: number) => {}
  const makeSearch = async () => {
    try {
      setLoading(true)

      const res = await HttpRequest.Get(
        `/api/atualizacoes?version=${version}&major=${major}&minor=${minor}&severity=${severity}&limit=${rowsperpage}&page=${page}`
      )

      if (res.success) {
        setAtualizacaoList(res.data.atualizacoes)
        setCount(res.data.count)
        setPage(0)
      } else {
        setDialogText(res.message || "")
        setOpenDialog(true)
      }

      return
    } catch (error) {
      setDialogText(JSON.stringify(error))
      setOpenDialog(true)
      return
    } finally {
      setLoading(false)
      return
    }
  }
  const searchByEnterKeyPress = async (e: any) => {
    if (e.key === "Enter") await makeSearch()
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
      Voltar
    </Button>
  )
  const newButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      onClick={() => {
        setLoading(true)
        router.push("/panel/atualizacoes/new")
      }}
      startIcon={<PlusOne />}
    >
      Novo
    </Button>
  )
  const actionExecution = (id: string, actionName: string) => {
    try {
      switch (actionName) {
        case "getById":
          setLoading(true)
          router.push(`/panel/atualizacoes/${id}`)
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
      title="Atualizações"
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
          text: "Atualizações",
          iconName: "system_update_alt",
          href: "/panel/atualizacoes"
        }
      ]}
      bottonButtons={[backButton, newButton]}
      loading={{
        isLoading: loading,
        onClose: () => {
          setLoading(false)
        }
      }}
      snack={{
        open: openDialog,
        onClose: () => {
          setOpenDialog(false)
        },
        message: dialogText
      }}
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              value={version}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setversion(e.target.value)
              }}
              onKeyPress={searchByEnterKeyPress}
              disabled={loading}
              label="Versão"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              value={major}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMajor(e.target.value)
              }}
              onKeyPress={searchByEnterKeyPress}
              disabled={loading}
              label="Major"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              value={minor}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMinor(e.target.value)
              }}
              onKeyPress={searchByEnterKeyPress}
              disabled={loading}
              label="Minor"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FormControl fullWidth>
              <InputLabel id="severity">Severidade</InputLabel>
              <Select
                value={severity}
                onChange={(event: SelectChangeEvent<string>) => {
                  setSeverity(event.target.value)
                }}
                fullWidth
                disabled={loading}
                labelId="severity"
                label="Severidade"
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value={"normal"}>Normal</MenuItem>
                <MenuItem value={"urgent"}>Urgente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <LoadingButton onClick={makeSearch} fullWidth variant="contained">
              Buscar
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGridV2
              // onPageChange={changePage}
              // onRowsPerPageChange={changeRowsPerPage}
              loading={loading}
              // rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100]}
              // rowsPerPage={rowsperpage}
              // page={page}
              // count={count}
              // onSelectedRow={(id: string | number) => {
              //   onSelect(id.toString())
              // }}
              actionTrigger={actionExecution}
              hasActions
              actions={[
                {
                  text: "Vizualizar",
                  name: "getById",
                  icon: <Visibility />
                }
              ]}
              data={atualizacaoList}
              headers={[
                {
                  text: "Versão",
                  attrName: "version"
                },
                {
                  text: "Major",
                  attrName: "major"
                },
                {
                  text: "Minor",
                  attrName: "minor"
                },
                {
                  text: "Severidade",
                  attrName: "severity"
                }
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
