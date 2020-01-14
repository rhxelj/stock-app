import React from "react";
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

// TODO 👀📐 1: we don't have to use class components anymore, we can use function components with React's new Hooks api
// I've refactored it in HeaderHooks.jsx
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  toggleDrawer = (side, open) => event => {
    // TODO 👀📐 2: for complex conditional statements, give them a readable constant name so we don't have to figure out what the code is doing
    const isTabOrShiftKeyPress =
      event &&
      event.type === "keydown" &&
      /* TODO 👀📐 3: shortcut for === || === is [].includes */ [
        "Tab",
        "Shift"
      ].includes(event.key);
    if (isTabOrShiftKeyPress) {
      return;
    }

    this.setState({ [side]: open });
  };

  getToggleState = stateToToggle => {
    this.setState(prevState => ({
      [stateToToggle]: !prevState[stateToToggle]
    }));
  };

  handleClose = prop => event => {
    this.setState({ [prop]: null });
  };

  newMethod(abrir_movimientos, movimientos, abrir_tablas) {
    return (
      <SwipeableDrawer
        open={this.state.left}
        onClose={this.toggleDrawer("left", false)}
        onOpen={this.toggleDrawer("left", true)}
      >
        <div
          id="division"
          role="presentation"
          // onClick={this.toggleDrawer("right", false)}
          onKeyDown={this.toggleDrawer("left", false)}
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
              onClick={() => this.getToggleState("abrir_movimientos")}
            >
              <ListItemText primary="Movimientos" />
              {abrir_movimientos ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={abrir_movimientos} timeout="20">
              <List component="div" disablePadding>
                {movimientos.map(({ link, primary }) => (
                  <ListItem key={primary} button component={Link} to={link}>
                    <ListItemText primary={primary} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <ListItem
              button
              // onMouseEnter={() => this.getToggleState("abrir_tablas")}
              onClick={() => this.getToggleState("abrir_tablas")}
            >
              <ListItemText primary="Tablas" />
              {abrir_tablas ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={abrir_tablas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  { primary: "Proveedores", link: "/Proveedores" },
                  { primary: "Monedas", link: "/StkMonedas" },
                  { primary: "Grupos", link: "/StkGrupo" },
                  { primary: "Rubros", link: "/StkRubro" },
                  { primary: "ItemsS", link: "/StkItems" },
                  { primary: "Unidad de Medidas", link: "/StkUnMed" },
                  { primary: "Ubicación Física", link: "StkUbFisica" }
                ].map(({ link, primary }) => (
                  <ListItem key={primary} button component={Link} to={link}>
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

  render() {
    const { abrir_movimientos, abrir_tablas } = this.state;
    const movimientos = [
      { link: "/ModPrecios", primary: "Modifica Precios" },
      { link: "/PresupPant", primary: "Presupuesto" },
      { link: "/ImprimeQR", primary: "ImprimeQR" },
      { link: "/ListaPrecios", primary: "Lista de Precios" },
      {
        link: "/StkMovEntrada",
        primary: "Entrada Mercadería"
      },
      { link: "/StkMovSalida", primary: "Salida Virtual" },
      { link: "/StkSalidaFinal", primary: "Salida Final" }
    ];
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
              <MenuIcon onClick={this.toggleDrawer("left", true)}></MenuIcon>
            </IconButton>
            <Typography variant="h6" color="inherit">
              OlsaSG
            </Typography>
            {/* TODO 👀📐 5: when a file gets near or > 200 lines, we can refactor it to make it more readable */}
            {/* check out the extension "VSCode React Refactor" https://marketplace.visualstudio.com/items?itemName=planbcoding.vscode-react-refactor*/}
            {/* I would extract the entire Drawer here into a component called LeftDrawer */}
            {this.newMethod(abrir_movimientos, movimientos, abrir_tablas)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
