import { DataGrid, local, Location, ViewPanel } from "@Components/Panel"
import {
  Add,
  ArrowBack,
  Close,
  Delete,
  Info,
  MarkEmailRead,
  Search
} from "@mui/icons-material"
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
const location: local[] = [
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
]
export default function SearchReportes() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [rowsperpage, setRowsperpage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [reporteList, setReporteList] = useState<any[]>([])
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [openBackDrop, setOpenBackDrop] = useState<boolean>(false)
  const [openBackDropDestinatarios, setOpenBackDropDestinatarios] =
    useState<boolean>(false)
  const handleCloseBackDrop = () => {
    setOpenBackDrop(false)
  }
  const handleCloseBackDropDestinatarios = () => {
    setOpenBackDropDestinatarios(false)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const changePage = async (page: number) => {}
  const changeRowsPerPage = async (rowsPerPage: number) => {}
  const onSelect = (id: string) => {
    setLoading(true)
    router.push(`/panel/reportes/${id}`)
  }
  return (
    <ViewPanel>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Location location={location} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6">Reportes dos usuários</Typography>
          </Grid>

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
              gridData={reporteList}
              gridHeaders={[
                {
                  headerName: "Nome",
                  field: "nome",
                  align: "left"
                },
                {
                  headerName: "Email",
                  field: "email",
                  align: "left"
                },
                {
                  headerName: "Ddd",
                  field: "ddd",
                  align: "center"
                },
                {
                  headerName: "Fone",
                  field: "fone",
                  align: "center"
                },
                {
                  headerName: "Status",
                  field: "status",
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
                onClick={() => {
                  router.push("/panel")
                }}
              >
                Voltar
              </Button>

              <Button
                disabled={loading}
                variant="contained"
                onClick={() => {
                  setOpenBackDropDestinatarios(true)
                }}
                startIcon={<MarkEmailRead />}
              >
                Destinatários
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={openDialog}
        autoHideDuration={6000}
        onClose={handleCloseDialog}
        message={dialogText}
        action={
          <>
            <Button color="secondary" size="small" onClick={handleCloseDialog}>
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
          <DialogContentText id="alert-dialog-description">
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
                        // value={searchText}
                        // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        //   setSearchText(e.target.value)
                        // }}
                        // onKeyPress={searchByEnterKeyPress}
                        // disabled={loading}
                        label="nome"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                      <TextField
                        // value={searchText}
                        // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        //   setSearchText(e.target.value)
                        // }}
                        // onKeyPress={searchByEnterKeyPress}
                        // disabled={loading}
                        label="Email"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                      <IconButton
                        disabled={loading}
                        onClick={() => {
                          console.log("asddsadad")
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          p: 1,
                          borderBottom: "1px solid #9999",
                          "&:hover": {
                            background: "#ECEFF1"
                          }
                        }}
                      >
                        <Typography variant="subtitle1">
                          asdasdasdadasd
                        </Typography>{" "}
                        |{" "}
                        <Typography variant="subtitle1">
                          asdasdasdadasd
                        </Typography>
                        <IconButton
                          disabled={loading}
                          onClick={() => {
                            console.log("asddsadad")
                          }}
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            // onClick={() => {}}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        onClick={handleCloseBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ViewPanel>
  )
}
