import { DataGridV2, ViewPanel } from "@Components/Panel"
import { RequestApi } from "@lib/frontend"
import {
  Add,
  ArrowBack,
  Delete,
  Info,
  MarkEmailRead,
  Search
} from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
export default function SearchReportes() {
  const router = useRouter()
  const [destinatarios, setDestinatarios] = useState<
    { nome: string; email: string }[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const [openBackDrop, setOpenBackDrop] = useState<boolean>(false)
  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [reporteList, setReporteList] = useState<any[]>([])
  const [openMessage, setOpenMessage] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>("")
  const [nomeDestinatario, setNomeDestinatario] = useState<string>("")
  const [nomeDestinatarioError, setNomeDestinatarioError] =
    useState<boolean>(false)
  const [emailDestinatario, setEmailDestinatario] = useState<string>("")
  const [emailDestinatarioError, setEmailDestinatarioError] =
    useState<boolean>(false)

  const [openBackDropDestinatarios, setOpenBackDropDestinatarios] =
    useState<boolean>(false)

  const handleCloseBackDropDestinatarios = () => {
    setOpenBackDropDestinatarios(false)
  }
  const addNewDestinatario = async () => {
    try {
      if (!nomeDestinatario) {
        setNomeDestinatarioError(true)
        throw new Error("Insira o nome do Destinatário.")
      }

      if (!emailDestinatario) {
        setEmailDestinatarioError(true)
        throw new Error("Insira o email do destinatário")
      }

      const justAdded = destinatarios.findIndex(
        filtered => filtered.email === emailDestinatario
      )

      if (justAdded >= 0) throw new Error("Email ja esta presente na lista")

      const tmp = [...destinatarios]

      tmp.push({
        nome: nomeDestinatario,
        email: emailDestinatario
      })

      setDestinatarios(tmp)
      setNomeDestinatario("")
      setEmailDestinatario("")
    } catch (error: any) {
      setMessageText(error.message)
      setOpenMessage(true)
    }
  }
  const changePage = async (page: number) => {}
  const changeRowsPerPage = async (rowsPerPage: number) => {}

  const destinatariosButton = (
    <Button
      fullWidth
      disabled={loading}
      variant="contained"
      onClick={async () => {
        const list = await RequestApi.Get("/api/suporte/getListaDestinatarios")

        if (list.success) {
          setDestinatarios(list.data.list)
          setOpenBackDropDestinatarios(true)
        } else {
          setMessageText("Erro ao buscar lista de destinatários.")
          setOpenMessage(true)
        }
      }}
      startIcon={<MarkEmailRead />}
    >
      Destinatários
    </Button>
  )

  const voltarButton = (
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

  return (
    <ViewPanel
      title="Reportes dos usuários"
      loading={{
        isLoading: openBackDrop,
        onClose: () => {
          setOpenBackDrop(false)
        }
      }}
      snack={{
        open: openMessage,
        message: messageText,
        onClose: () => {
          setOpenMessage(false)
        }
      }}
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
          text: "Reportes",
          iconName: "report_problem",
          href: "/panel/repostes"
        }
      ]}
      bottonButtons={[voltarButton, destinatariosButton]}
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <TextField
              // value={searchText}
              // onChange={(e: ChangeEvent<HTMLInputElement>) => {
              //   setSearchText(e.target.value)
              // }}
              // onKeyPress={searchByEnterKeyPress}
              // disabled={loading}
              label="Buscar o reporte"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button variant="contained" fullWidth endIcon={<Search />}>
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DataGridV2
              pagination={{
                onPageChange: changePage,
                count: count,
                page: page,
                rowsPerPage: rowsperpage,
                onRowsPerPageChange: changeRowsPerPage,
                rowsPerPageOptions: [5, 10, 20, 30, 40, 50, 100]
              }}
              loading={loading}
              data={reporteList}
              headers={[
                {
                  text: "Nome",
                  attrName: "nome"
                },
                {
                  text: "Email",
                  attrName: "email"
                },
                {
                  text: "Ddd",
                  attrName: "ddd"
                },
                {
                  text: "Fone",
                  attrName: "fone"
                },
                {
                  text: "Status",
                  attrName: "status"
                }
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={openBackDropDestinatarios}
        onClose={() => {
          handleCloseBackDropDestinatarios()
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Destinatarios.</DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Paper
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    background: "#FFF59D"
                  }}
                >
                  <Box
                    sx={{
                      width: "10%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Info />
                  </Box>
                  <Box sx={{ width: "90%", display: "flex" }}>
                    <Typography variant="caption">
                      <strong>Atenção: </strong>Os emails inseridos aqui serão
                      notificados{" "}
                      <u>
                        todas as vezes que um novo Bug for reportado ou que o
                        estatus de um reporte existente sofrer alteração.
                      </u>
                      .
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                    <TextField
                      value={nomeDestinatario}
                      error={nomeDestinatarioError}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setNomeDestinatarioError(false)
                        setNomeDestinatario(e.target.value)
                      }}
                      // onKeyPress={searchByEnterKeyPress}
                      disabled={loading}
                      label="nome"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                    <TextField
                      error={emailDestinatarioError}
                      value={emailDestinatario}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmailDestinatarioError(false)
                        setEmailDestinatario(e.target.value)
                      }}
                      // onKeyPress={searchByEnterKeyPress}
                      disabled={loading}
                      label="Email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <IconButton disabled={loading} onClick={addNewDestinatario}>
                      <Add />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {destinatarios.length ? (
                      destinatarios.map((destinatario, index) => (
                        <Box
                          key={`id-destinatarios-item-${index}`}
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            // justifyContent: "space-between",
                            p: 1,
                            borderBottom: "1px solid #9999",
                            "&:hover": {
                              background: "#ECEFF1"
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: "45%"
                            }}
                          >
                            <Typography variant="subtitle1">
                              {destinatario.nome}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "45%"
                            }}
                          >
                            <Typography variant="subtitle1">
                              {destinatario.email}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "10%"
                            }}
                          >
                            <IconButton
                              disabled={loading}
                              onClick={() => {
                                const tmp = [...destinatarios]
                                tmp.splice(index, 1)
                                setDestinatarios(tmp)
                              }}
                              size="small"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#ECEFF1",
                          p: 1
                        }}
                      >
                        <Typography variant="subtitle1">
                          Nenhum destinatário cadastrado.
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              if (destinatarios.length > 0) {
                setMessageText("Salvando... Aguarde.")
                setOpenMessage(true)
                const responseApi = await RequestApi.Post(
                  "/api/suporte/saveListaDestinatarios",
                  { destinatarios }
                )
                setOpenMessage(false)
                if (responseApi.success) {
                  setMessageText("Lista salva com sucesso.")
                  setOpenBackDropDestinatarios(false)
                } else {
                  setMessageText(
                    responseApi.message ||
                      "Erro ao salvr lista de destinatários. "
                  )
                }
                setOpenMessage(true)
              }
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </ViewPanel>
  )
}
