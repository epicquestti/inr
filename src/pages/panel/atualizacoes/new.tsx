import { local, Location, ViewPanel } from "@Components/Panel"
import styled from "@emotion/styled"
import { ArrowBack, Close, FileUpload, Save } from "@mui/icons-material"
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
import { ChangeEvent, useEffect, useState } from "react"
import HttpRequest from "../../../lib/RequestApi"
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
  const chunkSize = 1048576
  const router = useRouter()
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
  const [showDeleteFile, setshowDeleteFile] = useState<boolean>(false)
  const [uploadTextState, setUploadTextState] = useState<string>("")

  const [fileExec, setFileExec] = useState<File>()
  const [fileSize, setFileSize] = useState<number>(0)
  const [fileName, setFileName] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)
  const [inicioChunks, setInicioChunks] = useState<number>(0)
  const [fimChunks, setFimChunks] = useState<number>(chunkSize)
  const [process, setProcess] = useState<string>("stoped")

  // const [fileToBeUpload, setFileToBeUpload] = useState<File>()
  // const [showProgress, setShowProgress] = useState(false)
  // const [counter, setCounter] = useState(1)
  // const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0)
  // const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize)
  // const [progress, setProgress] = useState(0)
  // const [fileGuid, setFileGuid] = useState("")
  // const [fileSize, setFileSize] = useState(0)
  // const [chunkCount, setChunkCount] = useState(0)

  // Teste
  // const [fileId, setFileId] = useState<string>("")
  // const [fileKey, setFileKey] = useState<string>("")
  // const [finalList, setFinalList] = useState<uploadPartResponse[]>([])
  // const [block, setBlock] = useState<boolean>(true)

  // useEffect(() => {
  //   if (fileSize > 0) {
  //     fileUpload()
  //   }
  // }, [fileToBeUpload, progress])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  useEffect(() => {
    if (fileSize > 0) {
      setshowDeleteFile(true)
    } else {
      setshowDeleteFile(false)
    }
  }, [fileSize])

  // const fileUpload = () => {
  //   setCounter(counter + 1)
  //   if (finalList.length <= chunkCount) {
  //     if (fileToBeUpload) {
  //       const chunk = fileToBeUpload?.slice(beginingOfTheChunk, endOfTheChunk)
  //       uploadChunk(chunk)
  //     }
  //   }
  // }

  // const resetChunkProperties = () => {
  //   setShowProgress(true)
  //   setProgress(0)
  //   setFinalList([])
  //   setBeginingOfTheChunk(0)
  //   setEndOfTheChunk(chunkSize)
  // }

  // const uploadCompleted = async () => {
  //   const response = await HttpRequest.Post(
  //     `/api/atualizacoes/upload/completeMultpartUpload?key=${fileKey}&uploadId=${fileId}`,
  //     finalList
  //   )

  //   if (response.success) {
  //     console.log(`success ${response.success}`, response.data)
  //     setProgress(100)
  //   } else {
  //     console.log(`success ${response.success}`)
  //   }

  //   setFileId("")
  //   setFileKey("")
  //   setFinalList([])
  //   setBeginingOfTheChunk(0)
  //   setEndOfTheChunk(chunkSize)
  //   setFileGuid("")
  //   setFileSize(0)
  //   setChunkCount(0)
  //   setCounter(1)

  //   setTimeout(() => {
  //     setShowProgress(false)
  //     setProgress(0)
  //   }, 3000)
  // }

  // const makeUploadChunkProcess = async (
  //   fileKey: string,
  //   fileId: string,
  //   chunk: Blob
  // ) => {
  //   try {
  //     const tmp = [...finalList]
  //     const uploadPartRespose = await HttpRequest.Post(
  //       `/api/atualizacoes/upload/uploadMultpart?partNumber=${counter}&key=${fileKey}&uploadId=${fileId}`,
  //       chunk
  //     )

  //     if (uploadPartRespose.success) {
  //       tmp.push({
  //         ETag: uploadPartRespose.data.ETag,
  //         partNumber: uploadPartRespose.data.partNumber
  //       })

  //       setFinalList(tmp)
  //       setBeginingOfTheChunk(endOfTheChunk)
  //       setEndOfTheChunk(endOfTheChunk + chunkSize)

  //       console.log(tmp.length)

  //       if (tmp.length === chunkCount) {
  //         console.log("Process is complete, counter", tmp.length)
  //         await uploadCompleted()
  //       } else {
  //         const percentage = (tmp.length / chunkCount) * 100
  //         setProgress(percentage)
  //       }
  //     } else console.log("Error Occurred:", uploadPartRespose.message)
  //   } catch (error: any) {
  //     setDialogText(error.message)
  //     setOpenDialog(true)
  //     return
  //   }
  // }

  // const uploadChunk = async (chunk: Blob) => {
  //   try {
  //     if (!fileId || fileId === "") {
  //       const startMultpartUploadResponse = await HttpRequest.Get(
  //         `/api/atualizacoes/upload/startMultpartUpload?fileName=${fileGuid}`
  //       )

  //       if (startMultpartUploadResponse.success) {
  //         setFileId(startMultpartUploadResponse.data.fileId)
  //         setFileKey(startMultpartUploadResponse.data.fileKey)

  //         await makeUploadChunkProcess(
  //           startMultpartUploadResponse.data.fileKey,
  //           startMultpartUploadResponse.data.fileId,
  //           chunk
  //         )

  //         // P1

  //         return
  //       } else {
  //         setDialogText(startMultpartUploadResponse.message || "")
  //         setOpenDialog(true)
  //         return
  //       }
  //     }

  //     await makeUploadChunkProcess(fileKey, fileId, chunk)
  //     // P2
  //   } catch (error: any) {
  //     setDialogText(error.message)
  //     setOpenDialog(true)
  //   }
  // }

  useEffect(() => {
    if (fileSize > 0) {
    }
  }, [process])

  const getFileContext = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        setUploadTextState("Iniciando.")
        setBlockUpload(true)
        setBlockSave(true)
        setBlockBack(true)
        setFileExec(e.target.files[0])

        const startMultpartUploadResponse = await HttpRequest.Get(
          `/api/atualizacoes/upload/startMultpartUpload?fileName=${fileName}&size=${e.target.files[0].size}&fileName=${e.target.files[0].name}`
        )

        if (startMultpartUploadResponse.success) setProcess("initiated")
        else {
          setDialogText(startMultpartUploadResponse.message || "Erro")
          setOpenDialog(true)
        }
      }
    } catch (error: any) {
      setDialogText(error.message)
      setOpenDialog(true)
    }
  }

  const abortMultpartUpload = async (fileKey: string, fileId: string) => {
    try {
      const res = await HttpRequest.Get(
        `/api/atualizacoes/upload/abortMultpartUpload?key=${fileKey}&uploadId=${fileId}`
      )

      setFileExec(undefined)
      setFileSize(0)
      setFileName("")
      setProgress(0)
      setInicioChunks(0)
      setFimChunks(chunkSize)
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

                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                  {showDeleteFile && (
                    <IconButton
                      size="small"
                      color="error"
                      disabled={blockDeleteFile}
                    >
                      <Icon>highlight_off</Icon>
                    </IconButton>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Typography variant="caption">
                    Tamanho:{" "}
                    <strong>
                      {fileSize <= 0
                        ? 0
                        : `${
                            fileSize % chunkSize == 0
                              ? fileSize / chunkSize
                              : Math.floor(fileSize / chunkSize) + 1
                          }mb(s)`}
                    </strong>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                  <LinearProgress value={progress} variant="determinate" />
                </Grid>

                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                  <Typography variant="body2">{progress} %</Typography>
                  {/* <Icon sx={{ color: "#4CAF50" }}>check_circle_outline</Icon> */}
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Typography variant="caption">{uploadTextState}</Typography>
                </Grid>
              </Grid>
            </Paper>
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
