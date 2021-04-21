import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { fade, makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";
import { movimientos, tablas } from "./menues";
import { format } from "fecha";
// import InputBase from "@material-ui/core/InputBase";
// import SearchIcon from "@material-ui/icons/Search";
// import { TextField, InputAdornment } from "@material-ui/core";

import { useContext } from "react";
import { globalContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 8, 1, 1),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const initial_state = {
  open: false,
  menutablas: null,
  menutablas1: null,
  menumov: null,
  top: false,
  left: false,
  bottom: false,
  right: false,
  setSelectedIndex: 0,
  showComponent: false,
};
function Header() {
  const { valor } = useContext(globalContext);
  // const { valor, setValor } = useContext(globalContext);

  // const valor = "Variable interna";
  // console.log("Contenido de value en HEADER ", valor);
  // setValor("prueba");

  const [state, setState] = useState(initial_state);
  const classes = useStyles();
  // const [buscar, setbuscar] = useState("");
  const { abrir_movimientos, abrir_tablas } = state;

  const toggleDrawer = (side, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({
      ...state,
      [side]: open,
      abrir_movimientos: false, //activo esto si quiero cerrar los menúes cuando hago una selección.
      abrir_tablas: false, //activo esto si quiero cerrar los menúes cuando hago una selección.
    });
  };

  const getToggleState = (stateToToggle) => {
    setState((prevState) => ({
      ...state,
      [stateToToggle]: !prevState[stateToToggle],
    }));
  };
  // const handleChange = (event) => {
  //   setbuscar({ buscar: event.target.value });
  // };

  // const handleClose = (prop) => (event) => {
  //   setState({ ...state, [prop]: null });
  // };
  const diafecha = format(new Date(), "DD-MM-YYYY");

  function newMethod(abrir_movimientos, abrir_tablas) {
    return (
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <div
          id="division"
          role="presentation"
          // onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <List
            color="blue"
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                OlsaSG
              </ListSubheader>
            }
          >
            <ListItem
              button
              onClick={() => getToggleState("abrir_movimientos")}
            >
              <ListItemText primary="Movimientos" />
              {abrir_movimientos ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={abrir_movimientos} timeout="20">
              <List component="div" disablePadding>
                {movimientos.map(({ link, primary }) => (
                  <ListItem
                    onClick={toggleDrawer("left", false)}
                    key={primary}
                    button
                    component={Link}
                    to={link}
                  >
                    <ListItemText primary={primary} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <ListItem button onClick={() => getToggleState("abrir_tablas")}>
              <ListItemText primary="Tablas" />
              {abrir_tablas ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={abrir_tablas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {tablas.map(({ link, primary }) => (
                  <ListItem
                    onClick={toggleDrawer("left", false)}
                    key={primary}
                    button
                    component={Link}
                    to={link}
                  >
                    <ListItemText primary={primary} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </div>
      </SwipeableDrawer>
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          // onClick={this.toggleDrawer("left", true)}
          >
            <MenuIcon onClick={toggleDrawer("left", true)}></MenuIcon>
          </IconButton>
          {/* </Toolbar>   */}
          <Typography variant="h6" className={classes.title} noWrap>
            OlsaSG
          </Typography>
          <Typography variant="h6" className={classes.title} noWrap>
            {valor}
          </Typography>

          {newMethod(abrir_movimientos, abrir_tablas)}

          <Typography variant="h6">{diafecha}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
  // }
}

export default Header;
