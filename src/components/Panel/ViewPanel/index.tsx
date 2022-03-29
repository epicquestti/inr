/* eslint-disable no-use-before-define */
import {
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon
} from "@mui/icons-material"
import {
  Backdrop,
  Box,
  CircularProgress,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography
} from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MuiDrawer from "@mui/material/Drawer"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/router"
import React, { FC, useState } from "react"
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
  const goToFunction = (path?: string) => {
    if (path) router.push(path)
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
                <Icon>{access.icon}</Icon>
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
                          if (props.startBackDrop) props.startBackDrop()
                          goToFunction(childrenItem.path)
                        }}
                      >
                        <ListItemIcon>
                          <Icon>{childrenItem.icon}</Icon>
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
  box?: boolean
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
    }
  ])
  const [open, setOpen] = useState(false)
  const [openBackDrop, setOpenBackDrop] = useState(false)
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

  const startBackDrop = () => {
    setOpenBackDrop(true)
  }

  const handleClose = () => {
    setOpenBackDrop(false)
  }

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
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1]
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <ListMenu
          userAccess={menuList}
          toggleThis={opentest}
          drawerOpened={open}
          startBackDrop={startBackDrop}
        />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {props.box ? (
            <Paper
              sx={{
                p: 3
              }}
            >
              {props.children}
            </Paper>
          ) : (
            props.children
          )}
        </Container>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
export default ViewPanel
