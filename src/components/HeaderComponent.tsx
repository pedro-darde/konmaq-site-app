import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Login,
  Person,
  PersonAdd,
  PersonRemove,
  ShoppingBagOutlined,
  ShoppingCartCheckoutRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Image from "next/image";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import colors from "../constants/colors";
import { useCart } from "../hooks/useCart";
import { ProductCartShow } from "./product/ProductCartShow";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  childComponent: JSX.Element;
}

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: colors.primary_color,
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: colors.primary_color,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#D1D2D4",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    backgroundColor: "#D1D2D4",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function HeaderComponent({ childComponent }: HeaderProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchorEl);
  const { getToken, user, loadUserInfo } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { products, load } = useCart();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const MenuCart = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        id="cart-menu"
        open={openAnchor}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            maxHeight: 550,
            overflowY: "scroll",
            width: 500,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ProductCartShow isOrderScreen={false} />
      </Menu>
    );
  };

  React.useEffect(() => {
    loadUserInfo();
    load();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              router.push("/");
            }}
          >
            {/*<Image src={LogoImage} height={50} width={150} alt="Logo do site" />*/}
          </IconButton>
          <Box sx={{ marginLeft: "auto" }}>
            {!user.userName && (
              <>
                <Button
                  startIcon={<PersonAdd />}
                  sx={{ marginRight: "1rem", color: "white" }}
                  onClick={() => {
                    router.push("/users/create");
                  }}
                >
                  Cadastrar-se
                </Button>
              </>
            )}

            {user.userName ? (
              <>
                <IconButton>
                  <Person color="success" />
                  {/** @ts-ignore*/ user.userName}
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  startIcon={<Login />}
                  sx={{ color: "white" }}
                  onClick={() => router.push("/login")}
                >
                  Já sou usuário
                </Button>
              </>
            )}

            <MenuCart />
            <IconButton
              disabled={products.length === 0}
              sx={{ ml: 1 }}
              onClick={handleClick}
              aria-controls={openAnchor ? "cart-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAnchor ? "true" : undefined}
            >
              <Badge color="primary" badgeContent={products.length}>
                <ShoppingBagOutlined
                  color={products.length === 0 ? "disabled" : "primary"}
                  fontSize="large"
                />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon color="info" />
            </ListItemIcon>
            <ListItemText primary={"MEUS ITENS"} sx={{ color: "white" }} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {childComponent}
      </Box>
    </Box>
  );
}
