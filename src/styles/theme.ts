import { Theme } from "@mui/material"
import { createTheme } from "@mui/material/styles"

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#0172B6",
      dark: "#212121",
      light: "#FAFAFA",
      contrastText: "#FAFAFA"
    },
    secondary: {
      main: "#03B6F0"
    }
  }
})

export default theme
