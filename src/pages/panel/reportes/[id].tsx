import { ViewPanel } from "@Components/Panel"
import { RequestApi } from "@lib/frontend"
import { ArrowBack, CheckCircle } from "@mui/icons-material"
import { Button, ButtonTypeMap, Grid, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import { FC, ReactElement, useEffect, useState } from "react"

export default function GetReporteBugById() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [textDialog, setDialogText] = useState<string>("")
  const [tratamento, setTratamento] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [ddd, setDdd] = useState<string>("")
  const [fone, setFone] = useState<string>("")
  const [appId, setAppId] = useState<string>("")
  const [sisOperacional, setSisOperacional] = useState<string>("")
  const [versao, setVersao] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [ultimoBE, setUltimoBE] = useState<number>(0)
  const [ultimoCL, setUltimoCL] = useState<number>(0)
  const [notifyBE, setNotifyBE] = useState<boolean>(false)
  const [notifyCL, setNotifyCL] = useState<boolean>(false)
  const [aceitaContato, setAceitaContato] = useState<boolean>(false)
  const [iswhatsApp, setIswhatsApp] = useState<boolean>(false)
  const [contactWhatsApp, setContactWhatsApp] = useState<boolean>(false)
  const [contactEmail, setContactEmail] = useState<boolean>(false)
  const [contactCall, setContactCall] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const [eventLists, setEventLists] = useState<any[]>([])
  const [blockFinishReporte, setBlockFinishReporte] = useState<boolean>(false)

  const getById = async () => {
    try {
      if (!router.isReady) return

      setLoading(true)
      setShowDialog(false)
      const { id } = router.query

      const report = await RequestApi.Get(`/api/suporte/${id}`)

      if (report.success) {
        setTratamento(report.data.report.tratamento)
        setNome(report.data.report.nome)
        setEmail(report.data.report.email)
        setDdd(report.data.report.ddd)
        setFone(report.data.report.fone)
        setAppId(report.data.report.appId)
        setSisOperacional(report.data.report.os)
        setVersao(report.data.report.version)
        setStatus(report.data.report.status)
        setUltimoBE(report.data.report.lastBeReceived)
        setUltimoCL(report.data.report.lastClassReceived)
        setNotifyBE(report.data.report.notifyBoletim)
        setNotifyCL(report.data.report.notifyClassificador)
        setAceitaContato(report.data.report.contactNo)
        setIswhatsApp(report.data.report.isWhats)
        setContactWhatsApp(report.data.report.contactWhats)
        setContactEmail(report.data.report.contactEmail)
        setContactCall(report.data.report.contactCall)
        setDescription(report.data.report.descricao)
        setEventLists(report.data.events)

        if (report.data.report.status === "FINALIZADO") {
          setBlockFinishReporte(true)
        } else {
          setBlockFinishReporte(false)
        }

        setLoading(false)
      } else throw new Error(report.message || "")
    } catch (error: any) {
      setDialogText(error.message)
      setShowDialog(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    getById()
  }, [router.isReady])

  const Block: FC<{ label: string; text: string; center?: boolean }> = ({
    ...props
  }) => {
    return (
      <Box sx={{ wdith: "100%", display: "inline" }}>
        <Box
          sx={{
            wdith: "100%",
            textAlign: `${props.center ? "center" : "left"}`
          }}
        >
          <Typography variant="subtitle2">{props.label}</Typography>
        </Box>
        <Box
          sx={{
            wdith: "100%",
            textAlign: `${props.center ? "center" : "left"}`
          }}
        >
          <Typography variant="subtitle1">{props.text}</Typography>
        </Box>
      </Box>
    )
  }

  const btnListFunction = (): ReactElement<ButtonTypeMap>[] => {
    const l: ReactElement<ButtonTypeMap>[] = []

    l.push(
      <Button
        fullWidth
        disabled={loading}
        variant="contained"
        onClick={() => {
          setLoading(true)
          router.push("/panel/reportes")
        }}
        startIcon={<ArrowBack />}
      >
        Voltar
      </Button>
    )

    if (!blockFinishReporte) {
      l.push(
        <Button
          fullWidth
          disabled={loading}
          variant="contained"
          startIcon={<CheckCircle />}
          onClick={async () => {
            try {
              if (!router.isReady) return

              setLoading(true)
              setShowDialog(false)
              const { id } = router.query
              const report = await RequestApi.Post(
                `/api/suporte/finishReport`,
                {
                  id
                }
              )

              if (report.success) {
                setBlockFinishReporte(true)
                setDialogText(
                  report.message || "Reporte Finalizado com sucesso."
                )
                setShowDialog(true)
                setLoading(false)
              } else throw new Error(report.message || "")
            } catch (error: any) {
              setDialogText(error.message)
              setShowDialog(true)
              setLoading(false)
            }
          }}
        >
          Finalizar
        </Button>
      )
    }

    return l
  }

  const btnList = btnListFunction()

  const finalize = async () => {}

  return (
    <ViewPanel
      title={
        !loading
          ? "Reporte de bug Nº 12312313 criado em: 01/01/2011"
          : "Aguarde..."
      }
      loading={{
        isLoading: loading,
        onClose: () => {
          setLoading(false)
        }
      }}
      snack={{
        open: showDialog,
        message: textDialog,
        onClose: () => {
          setShowDialog(false)
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
          text: "Publicação",
          iconName: "forward_to_inbox",
          href: ""
        }
      ]}
      bottonButtons={btnList}
    >
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                width: "100%",
                height: "40px",
                background: theme => theme.palette.primary.dark,
                dislplay: "flex",
                alignItems: "center",
                alignContent: "center",
                color: "#FFFFFF",
                p: 1,
                borderRadius: 1
              }}
            >
              <Typography variant="body2">
                <strong>Informações do Reporte</strong>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            <Block center label="Tratamento" text={tratamento} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block label="Nome" text={nome} />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={3} xl={3}>
            <Block label="Email" text={email} />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            <Block center label="DDD" text={ddd} />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Telefone" text={fone} />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block center label="Status Atual" text={status} />
          </Grid>
          {/* linha */}
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Sis. Operacional" text={sisOperacional} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block label="App ID" text={appId} />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
            <Block center label="Versão" text={versao} />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block
              center
              label="Ultimo BE Recebido"
              text={ultimoBE.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block
              center
              label="Ultimo CL Recebido"
              text={ultimoCL.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Block
              label="Notificações do cliente para BE Permitidas ?"
              text={notifyBE ? "Sim" : "Não"}
              center
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Block
              label="Notificações do cliente para CL Permitidas"
              text={notifyCL ? "Sim" : "Não"}
              center
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body2">
              <strong>Opção de contato com o criador do reporte</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block
              label="Aceita contato ?"
              text={aceitaContato ? "Sim" : "Não"}
              center
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block
              label="O número esta no whatsapp ?"
              text={iswhatsApp ? "Sim" : "Não"}
              center
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block
              label="Aceita contato por: whatsapp ?"
              text={contactWhatsApp ? "Sim" : "Não"}
              center
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block
              label="Aceita contato por: Email ?"
              text={contactEmail ? "Sim" : "Não"}
              center
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block
              label="Aceita contato por: Ligação ?"
              text={contactCall ? "Sim" : "Não"}
              center
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body2">
              <strong>Eventos</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                width: "100%",
                border: "1px solid #999999",
                borderRadius: "6px",
                padding: 2
              }}
            >
              <Grid container spacing={2}>
                {eventLists.length > 0 &&
                  eventLists.map((eventItem, index) => (
                    <Grid
                      key={`event-report-${index + 1}-report-id-${index}`}
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Typography variant="caption">
                        {eventItem.observacoes}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box
              sx={{
                width: "100%",
                border: "1px solid #999999",
                borderRadius: "6px",
                padding: 2
              }}
            >
              <Block
                label="Descrição enviada pelo usuário."
                text={description}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
