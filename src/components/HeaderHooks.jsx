import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";
// import MenuItem from '@material-ui/core/MenuItem'
// import Button from '@material-ui/core/Button';
// import StkFab from './lib/StkFab'
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
// import { fade, makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
// inputRoot: {
//   color: 'inherit',
// },
// inputInput: {
//   padding: theme.spacing(1, 1, 1, 7),
//   transition: theme.transitions.create('width'),
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     width: 120,
//     '&:focus': {
//       width: 200,
//     },
//   },
// },
// }))

const Header = props => {
  // TODO 👀📐 the useState hook can be used as many times as you want, storing different pieces of state,
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // or all together like this
  const [state, setState] = useState({
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
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // TODO 👀📐 useState doesn't spread the old state for you, we have to do it manually (it's more explicit)
    // const newState = { ...state, overrideThis: newValue }
    // setState(newState)
    setState({ ...state, [side]: open });
  };

  const handleClickMovimientos = () => {
    setState({ ...state, abrir_movimientos: !state.abrir_movimientos });
  };

  const handleClickTablas = () => {
    setState({ ...state, abrir_tablas: !state.abrir_tablas });
  };

  const handleClose = prop => event => {
    setState({ ...state, [prop]: null });
  };

  // TODO 👀📐 no render, just return
  // no more "this."
  const { abrir_movimientos, abrir_tablas } = state;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon
            // onClick={toggleDrawer('left', true)}
            ></MenuIcon>
          </IconButton>
          <Typography variant="h6" color="inherit">
            STOCK
          </Typography>

          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            <div
              id="division"
              role="presentation"
              onClick={toggleDrawer("right", false)}
              onKeyDown={toggleDrawer("left", false)}
            >
              <List
                color="blue"
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Menú Stock
                  </ListSubheader>
                }
              >
                <ListItem button onClick={handleClickMovimientos}>
                  <ListItemText primary="Movimientos" />
                  {abrir_movimientos ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={abrir_movimientos} timeout="auto" unmountOnExit>
                  {/* <MenuItem payload = "http://localhost:3000/Proveedores" >
                      salida
                    </MenuItem> */}
                  <List component="div" disablePadding>
                    <ListItem button component={Link} to="/ModPrecios">
                      <ListItemText primary="Modifica Precios" />
                    </ListItem>

                    <ListItem button component={Link} to="/PresupPant">
                      <ListItemText primary="Presupuesto" />
                    </ListItem>
                    <ListItem button component={Link} to="/ListaPrecios">
                      <ListItemText primary="Lista de Precios" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkMovEntrada">
                      <ListItemText primary="Entrada Mercadería" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkMovSalida">
                      <ListItemText primary="Salida Virtual" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkSalidaFinal">
                      <ListItemText primary="Salida Final" />
                    </ListItem>

                    {/* <ListItem button component={Link} to="/StkImprimeEtiq">
                          <ListItemText primary="Impresión de Etiquetas" />
                          </ListItem> */}
                  </List>
                </Collapse>

                <ListItem button onClick={handleClickTablas}>
                  <ListItemText primary="Tablas" />
                  {abrir_tablas ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={abrir_tablas} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button component={Link} to="/Proveedores">
                      <ListItemText primary="Proveedores" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkMonedas">
                      <ListItemText primary="Monedas" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkGrupo">
                      <ListItemText primary="Grupos" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkRubro">
                      <ListItemText primary="Rubros" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkItems">
                      <ListItemText primary="Items" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkUnMed">
                      <ListItemText primary="Unidad de Medidas" />
                    </ListItem>
                    <ListItem button component={Link} to="/StkUbFisica">
                      <ListItemText primary="Ubicación Física" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
