import { local, Location, ViewPanel } from "@Components/Panel"
import { ArrowBack, CheckCircle } from "@mui/icons-material"
import { Button, Grid, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FC, useState } from "react"

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
    text: "Publicação",
    iconName: "forward_to_inbox",
    href: ""
  }
]

export default function GetReporteBugById() {
  const [loading, setLoading] = useState<boolean>(false)

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

  return (
    <ViewPanel loading={loading}>
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Location location={location} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6">
              {!loading
                ? "Reporte de bug Nº 12312313 criado em: 01/01/2011"
                : "Aguarde..."}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Tratamento" text="Sr" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block label="Nome" text="Douglas Aasddalves Pacor" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block label="Email" text="douglas.pacor@outlook.com" />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="DDD" text="16" center />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Telefone" text="993830033" />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="App ID" text="inrappID-993830033" />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Block label="Sis. Operacional" text="Windows 10 Pro" />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Versão" text="0.2.63" />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Status Atual" text="CRIADO" />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Ultimo BE Recebido" text="12" />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Ultimo CL Recebido" text="12" />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Block label="Notificações BL Permitidas" text="SIM" center />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Block label="Notificações CL Permitidas" text="SIM" center />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body2">
              <strong>Opção de contato com o criador do reporte</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Aceita contato ?" text="SIM" center />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="O número esta no whatsapp ?" text="SIM" center />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block label="Aceita contato por: whatsapp ?" text="SIM" center />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Block label="Aceita contato por: Email ?" text="SIM" center />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Block label="Aceita contato por: Ligação ?" text="SIM" center />
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
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="caption">
                    Reporte CRIADO com sucesso em: 01/01/2011
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="caption">
                    Reporte CRIADO com sucesso em: 01/01/2011
                  </Typography>
                </Grid>
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
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lacinia elit, nec tempus justo. Etiam ut felis nisi. Suspendisse vehicula arcu eros, a vestibulum nulla sollicitudin a. Aliquam posuere dignissim est. Donec tincidunt, metus quis sagittis sagittis, nisi urna consequat ex, vel consequat diam nunc id ante. Etiam eu bibendum mi. Donec ornare, est maximus imperdiet pulvinar, lorem lacus imperdiet urna, et laoreet diam diam id tellus. Mauris lobortis pharetra ipsum, vitae imperdiet sapien interdum euismod. Vivamus pellentesque fringilla nisl, vitae placerat nisi aliquam ut. Maecenas vitae mauris faucibus, blandit leo hendrerit, mattis lacus. Aliquam erat volutpat. Mauris in odio tempus, rutrum eros ut, consequat libero. Suspendisse malesuada vestibulum nulla sit amet finibus. Duis scelerisque facilisis dictum.
Morbi semper ex eu massa dictum sodales. Donec porttitor magna ac ipsum placerat maximus. Quisque quis vehicula ex. Curabitur odio tortor, lacinia vel eros dapibus, fringilla rhoncus felis. Maecenas et tincidunt enim, ut tincidunt risus. Phasellus mattis, erat id vestibulum varius, massa eros facilisis tellus, sit amet commodo velit nisl non sapien. Morbi posuere nisl magna, et volutpat lacus congue ac. Integer lacinia consequat velit non ultricies. Aenean et ullamcorper quam, vel dignissim metus. In sit amet dolor auctor, mattis metus id, tempor arcu. Phasellus elementum, mi at sagittis tempus, purus eros hendrerit ex, quis viverra mauris dui ut magna. Ut sit amet nunc eget justo aliquet finibus at vel metus. Sed tincidunt mi ac semper feugiat. Sed turpis nisl, consectetur in eros hendrerit, venenatis iaculis sem. Aenean non varius ipsum, eu porttitor augue."
              />
            </Box>
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
                // onClick={() => {
                //   router.push("/panel/publicacoes")
                // }}
                startIcon={<ArrowBack />}
              >
                Voltar
              </Button>

              <Button
                disabled={loading}
                variant="contained"
                startIcon={<CheckCircle />}
                // onClick={publish}
              >
                Finalizar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
