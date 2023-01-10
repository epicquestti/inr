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
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #212121",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width: "12px"
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b"
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595"
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595"
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595"
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b"
          }
        }
      }
    }
  }
})

export default theme
