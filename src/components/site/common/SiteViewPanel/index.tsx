import { AccountCircle } from "@mui/icons-material"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import Image from "next/image"
import { FC, ReactNode } from "react"
const diasSemana = [
  "Domingo",
  "Segunda feira",
  "Terça feira",
  "Quarta feira",
  "Quinta feita",
  "Sexta feira",
  "Sábado"
]

const SiteViewPanel: FC<{
  children?: ReactNode
}> = ({ ...props }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "inline-block",
        p: 0,
        m: 0,
        bgcolor: theme => theme.palette.secondary.light
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "80px",
          display: "flex"
        }}
      >
        <Container>
          <Grid
            container
            alignContent="center"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
              <Box
                sx={{
                  width: "100%",
                  height: "80px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Image
                  width="120px"
                  height="53px"
                  src="https://object.epicquestti.com.br/inr/assets/inr-logo-mail.png"
                  alt="Inr Publicações"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
              <Grid
                container
                alignContent="center"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "inline",
                      textAlign: "center"
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 900 }}>
                        {diasSemana[new Date().getDay()]}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        variant="caption"
                        sx={{ fontSize: 11, fontWeight: 900 }}
                      >
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: 16, fontWeight: 900 }}
                      >
                        {new Date().toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Button
                    fullWidth
                    startIcon={<AccountCircle sx={{ mr: 1 }} />}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          bgcolor: theme => theme.palette.primary.main
        }}
      >
        <Container>buttons</Container>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "260px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(https://www.aluralingua.com.br/artigos/assets/cool.jpg)`
        }}
      >
        <Typography
          sx={{
            zIndex: 99,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)"
          }}
          color={"#FFFFFF"}
          variant="h4"
        >
          titulo da sessão
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }}
        />
      </Box>
      <Box>
        <Container>
          <Box
            sx={{
              width: "100%",
              paddingTop: 2,
              paddingBottom: 2,
              minHeight: "800px"
            }}
          >
            {props.children}
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          bgcolor: theme => theme.palette.primary.dark
        }}
      >
        <Container>Banner inr</Container>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          bgcolor: theme => theme.palette.primary.main
        }}
      >
        <Container>Bottom contents</Container>
      </Box>
    </Box>
  )
}

export default SiteViewPanel
