/* eslint-disable no-use-before-define */
import {
  ChevronLeft,
  Close,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon
} from "@mui/icons-material"
import {
  Backdrop,
  Box,
  Button,
  ButtonTypeMap,
  CircularProgress,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography
} from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MuiDrawer from "@mui/material/Drawer"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/router"
import React, { FC, ReactElement, useState } from "react"
import Location from "../Location"
import { local } from "../Location/props"
import { IAccessItem, ListMenuProps } from "./props"
const drawerWidth: number = 260
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    })
  }
}))

const ListMenu: FC<ListMenuProps> = ({ ...props }) => {
  const router = useRouter()
  const goToFunction = async (path?: string) => {
    if (path) {
      await router.push(path)
    }
  }
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {props.userAccess &&
        props.userAccess.map((access: IAccessItem, index: number) => (
          <Box key={`${index}${Math.random() * (999999 - 1) + 1}`}>
            <ListItemButton
              onClick={() => {
                props.toggleThis && props.toggleThis(index)
              }}
            >
              <ListItemIcon>
                <Icon fontSize="small">{access.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={access.text} />
              {access.opened ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {access.childrens && (
              <Collapse in={access.opened} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {access.childrens.map(
                    (childrenItem: IAccessItem, index: number) => (
                      <ListItemButton
                        key={`${index}${Math.random() * (999999 - 1) + 1}`}
                        onClick={() => {
                          goToFunction(childrenItem.path)
                        }}
                      >
                        <ListItemIcon>
                          <Icon fontSize="small">{childrenItem.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={childrenItem.text} />
                      </ListItemButton>
                    )
                  )}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
    </List>
  )
}

interface viewPanelProps {
  title?: string
  location?: local[]
  addButton?: ReactElement<ButtonTypeMap>
  bottonButtons?: ReactElement<ButtonTypeMap>[]
  loading?: {
    isLoading?: boolean
    onClose?: () => void
  }
  snack?: {
    open?: boolean
    message?: string
    onClose?: () => void
  }
}

const ViewPanel: FC<viewPanelProps> = ({ ...props }) => {
  const [menuList, setMenuList] = React.useState<IAccessItem[]>([
    {
      text: "Boletim Eletrônico",
      icon: "auto_stories",
      opened: false,
      path: "",
      childrens: [
        {
          text: "Publicações",
          icon: "forward_to_inbox",
          opened: false,
          path: "/panel/publicacoes"
        }
      ]
    },
    {
      text: "INR Leitor",
      icon: "desktop_windows",
      opened: false,
      path: "",
      childrens: [
        {
          text: "Atualizações",
          icon: "system_update_alt",
          opened: false,
          path: "/panel/atualizacoes"
        },
        {
          text: "Bugs reportados",
          icon: "report_problem",
          opened: false,
          path: "/panel/reportes"
        }
      ]
    }
  ])
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const opentest = (index: number): void => {
    const temp = [...menuList]
    const tempItem = { ...temp[index] }
    tempItem.opened = !tempItem.opened
    temp[index] = tempItem
    setMenuList(temp)
  }

  const action = (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={props.snack?.onClose}
        disabled={props.loading?.isLoading}
      >
        Fechar
      </Button>
      <IconButton
        disabled={props.loading?.isLoading}
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.snack?.onClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px"
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            INR Publicações - Painel Administrativo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "inline-block",
            px: [1]
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
        <ListMenu
          userAccess={menuList}
          toggleThis={opentest}
          drawerOpened={open}
        />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme => theme.palette.secondary.main,
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Location location={props.location} />
            </Grid>

            {props.addButton ? (
              <>
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                  <Typography variant="h6">
                    {props.title && props.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={1}>
                  {props.addButton}
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6">
                  {props.title && props.title}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {props.children}
            </Grid>

            {props.bottonButtons && props.bottonButtons.length > 0 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid
                  container
                  spacing={3}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  {props.bottonButtons.map((bottonButtonItem, index) => (
                    <Grid
                      key={`item-button-added-per-user-${index}`}
                      item
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      xl={2}
                    >
                      {bottonButtonItem}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <Snackbar
        open={props.snack?.open}
        autoHideDuration={5000}
        onClose={props.snack?.onClose}
        message={props.snack?.message}
        action={action}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={props.loading && props.loading.isLoading ? true : false}
        onClick={props.loading?.onClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
export default ViewPanel
