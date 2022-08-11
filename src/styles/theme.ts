import { Theme } from "@mui/material"
import { createTheme } from "@mui/material/styles"

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#0172B6",
      dark: "#212121",
      light: "#FAFAFA",
      contrastText: "#E3F2FD"
    },
    secondary: {
      main: "#616161",
      dark: "#263238",
      light: "#B0BEC5",
      contrastText: "#ECEFF1"
    }
  }
})

export default theme
