import { S3Client } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import { local, Location, ViewPanel } from "@Components/Panel"
import styled from "@emotion/styled"
import { ArrowBack, Check, Close, FileUpload, Save } from "@mui/icons-material"
import {
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import { ChangeEvent, useRef, useState } from "react"
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
    text: "Atualizações",
    iconName: "system_update_alt",
    href: "/panel/aplicativo"
  }
]

type uploadPartResponse = {
  ETag: string
  partNumber: number
}

const Input = styled("input")({
  display: "none"
})

export default function CreateAtualizacoes() {
  // const chunkSize = 1048576 * 3
  const chunkSize = 1048576 * 6
  const router = useRouter()
  const inputRef = useRef<any>(null)
  const [version, setVersion] = useState<number>(0)
  const [major, setMajor] = useState<number>(0)
  const [minor, setMinor] = useState<number>(0)
  const [severity, setSeverity] = useState<string>("")
  const [vigente, setVigente] = useState<boolean>(true)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogText, setDialogText] = useState<string>("")
  const [errorList, setErrorList] = useState<boolean[]>([
    false,
    false,
    false,
    false
  ])

  const [blockSave, setBlockSave] = useState<boolean>(true)
  const [blockBack, setBlockBack] = useState<boolean>(false)
  const [blockUpload, setBlockUpload] = useState<boolean>(false)
  const [blockFields, setBlockFields] = useState<boolean>(false)
  const [blockDeleteFile, setBlockDeleteFile] = useState<boolean>(false)
  const [blockConfirmFile, setBlockConfirmFile] = useState<boolean>(true)
  const [showDeleteFile, setshowDeleteFile] = useState<boolean>(false)

  const [fileExec, setFileExec] = useState<File | null>(null)
  const [fileSize, setFileSize] = useState<number>(0)
  const [fileName, setFileName] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)
  const [process, setProcess] = useState<string>("Parado")

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const getFileContext = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        setFileExec(e.target.files[0])
        setFileName(e.target.files[0].name)
        setFileSize(e.target.files[0].size)
        setProcess("preparando")

        setTimeout(() => {
          setshowDeleteFile(true)
          setBlockConfirmFile(false)
          setBlockUpload(true)
          setBlockSave(true)
          setBlockBack(true)
          setProcess("Arquivo selecionado.")
        }, 1000)
      } else {
        setBlockUpload(false)
        setBlockSave(false)
        setBlockBack(false)
        setFileExec(null)
        setFileName("")
        setFileSize(0)
        setshowDeleteFile(false)
        setBlockConfirmFile(true)
        setProcess("Nenhum arquivo selecionado.")

        if (inputRef.current) inputRef.current.value = null
      }
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
    }
  }

  const confirmUpload = async () => {
    try {
      setProcess("iniciando upload.")

      if (fileExec) {
        const paralel = new Upload({
          client: new S3Client({
            region: "sa-east-1",
            credentials: {
              accessKeyId: "AKIAXQT5JNASE2YZFCDL",
              secretAccessKey: "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"
            }
          }),
          leavePartsOnError: false,
          params: {
            Bucket: "harpy-bucket",
            Key: `INR/realease/${fileName}`,
            Body: fileExec
          }
        })

        paralel.on("httpUploadProgress", prog => {
          if (prog.loaded && prog.total) {
            const p = Math.floor((prog.loaded / prog.total) * 100)
            setProgress(p)
          }
        })

        console.log(await paralel.done())
      }
    } catch (error: any) {
      console.log(error)
      setDialogText(error.message)
      setOpenDialog(true)
    }
  }

  const cancelFile = async () => {
    try {
      setBlockUpload(false)
      setBlockSave(false)
      setBlockBack(false)
      setFileExec(null)
      setFileName("")
      setFileSize(0)
      setshowDeleteFile(false)
      setBlockConfirmFile(true)
      setProcess("Parado.")

      if (inputRef.current) inputRef.current.value = null
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
    }
  }

  const saveThisUpdate = () => {
    try {
      if (version <= 0) {
        const tmp = [...errorList]
        tmp[0] = true
        setErrorList(tmp)
      }

      if (major <= 0) {
        const tmp = [...errorList]
        tmp[1] = true
        setErrorList(tmp)
      }

      if (minor <= 0) {
        const tmp = [...errorList]
        tmp[2] = true
        setErrorList(tmp)
      }

      if (!severity && severity === "") {
        const tmp = [...errorList]
        tmp[3] = true
        setErrorList(tmp)
      }
    } catch (error) {}
  }

  return (
    <ViewPanel>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Location location={location} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6">Nova Atualização</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              value={version}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[0] = false
                setErrorList(tmp)
                setVersion(parseInt(e.target.value))
              }}
              error={errorList[0]}
              disabled={blockFields}
              label="Versão"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              value={major}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[1] = false
                setErrorList(tmp)
                setMajor(parseInt(e.target.value))
              }}
              error={errorList[1]}
              disabled={blockFields}
              label="Major"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <TextField
              value={minor}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const tmp = [...errorList]
                tmp[2] = true
                setErrorList(tmp)
                setMinor(parseInt(e.target.value))
              }}
              error={errorList[2]}
              disabled={blockFields}
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
                  const tmp = [...errorList]
                  tmp[3] = true
                  setErrorList(tmp)
                  setSeverity(event.target.value)
                }}
                error={errorList[3]}
                fullWidth
                disabled={blockFields}
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
            <InputLabel>Vigente</InputLabel>
            <Switch
              disabled={blockFields}
              checked={vigente}
              onChange={(
                _: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => setVigente(checked)}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper sx={{ background: "#ECEFF1", p: 2 }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="body1">
                    <strong>.EXE</strong>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <label htmlFor="icon-button-file">
                    <Input
                      ref={inputRef}
                      id="icon-button-file"
                      type="file"
                      onChange={getFileContext}
                    />
                    <Button
                      disabled={blockUpload}
                      fullWidth
                      variant="contained"
                      component="span"
                      startIcon={<FileUpload />}
                    >
                      arquivo
                    </Button>
                  </label>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Typography variant="caption">
                    Nome:{" "}
                    <strong>
                      {fileName !== "" ? fileName : "Selecione o executável."}
                    </strong>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Typography variant="caption">
                    Tamanho:{" "}
                    <strong>
                      {fileSize <= 0
                        ? 0
                        : `${
                            fileSize % 1048576 == 0
                              ? fileSize / 1048576
                              : Math.floor(fileSize / 1048576) + 1
                          }mb(s)`}
                    </strong>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                  {showDeleteFile && (
                    <IconButton
                      size="small"
                      color="error"
                      disabled={blockDeleteFile}
                      onClick={cancelFile}
                    >
                      <Icon>highlight_off</Icon>
                    </IconButton>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Typography variant="caption">
                    Status: <strong>{process}</strong>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Button
                    disabled={blockConfirmFile}
                    fullWidth
                    color="success"
                    variant="contained"
                    component="span"
                    startIcon={<Check />}
                    onClick={confirmUpload}
                  >
                    Confirmar
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>
                  <LinearProgress value={progress} variant="determinate" />
                </Grid>
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                  <Typography variant="body2">{progress} %</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {JSON.stringify({})}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <Button
                disabled={blockBack}
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={() => {
                  router.push("/panel/atualizacoes")
                }}
              >
                Voltar
              </Button>
              <Button
                disabled={blockSave}
                variant="contained"
                startIcon={<Save />}
                onClick={saveThisUpdate}
              >
                Salvar
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
