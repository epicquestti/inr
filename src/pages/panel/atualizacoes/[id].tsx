import { local, Location, ViewPanel } from "@Components/Panel"
import { Grid, Paper, Typography } from "@mui/material"
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
    text: "Atualizações",
    iconName: "system_update_alt",
    href: "/panel/aplicativo"
  }
]

export default function GetAtualizacoesById() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [version, setVersion] = useState<number>(0)
  const [major, setMajor] = useState<number>(0)
  const [minor, setMinor] = useState<number>(0)

  return (
    <ViewPanel>
      {" "}
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Location location={location} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6">
              {version > 0 && major > 0 && minor > 0
                ? `Versão ${version}.${major}.${minor}`
                : "Aguarde..."}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}></Grid>
        </Grid>
      </Paper>
    </ViewPanel>
  )
}
