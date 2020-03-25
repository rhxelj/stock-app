import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
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
  showComponent: false
};
function Header() {
  const [state, setState] = useState(initial_state);
  const classes = useStyles();

  const { abrir_movimientos, abrir_tablas } = state;

  const toggleDrawer = (side, open) => event => {
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
      abrir_movimientos: false, //activo esto si quiero cerrar los menues cuando hago una selecccion
      abrir_tablas: false //activo esto si quiero cerrar los menues cuando hago una selecccion
    });
  };

  const getToggleState = stateToToggle => {
    setState(prevState => ({
      ...state,
      [stateToToggle]: !prevState[stateToToggle]
    }));
  };

  const handleClose = prop => event => {
    setState({ ...state, [prop]: null });
  };
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
          <Typography variant="h6" className={classes.title}>
            OlsaSG
          </Typography>
          {newMethod(abrir_movimientos, abrir_tablas)}
          <Typography variant="h6">{diafecha}</Typography>
          {/* <Button color="inherit">{diafecha}</Button> */}
        </Toolbar>
      </AppBar>

      {/* <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            // onClick={this.toggleDrawer("left", true)}
          >
            <MenuIcon onClick={toggleDrawer("left", true)}></MenuIcon>
          </IconButton>
          <Typography variant="h6" color="inherit">
            OlsaSddG
          </Typography>
          {newMethod(abrir_movimientos, abrir_tablas)}
        </Toolbar>
      </AppBar> */}
    </div>
  );
  // }
}

export default Header;
