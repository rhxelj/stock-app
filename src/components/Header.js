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

  // TODO 👀📐 4: we could use one function instead of two here
  // getToggleState = (stateToToggle) => this.setState(prevState=>({[stateToToggle]: !prevState[stateToToggle]}))
  handleClickMovimientos = () => {
    this.setState(prevState => ({
      abrir_movimientos: !prevState.abrir_movimientos
      // abrir_tablas: !prevState.abrir_tablas
    }));
  };

  handleClickTablas = () => {
    this.setState(prevState => ({
      abrir_tablas: !prevState.abrir_tablas
      // abrir_movimientos: !prevState.abrir_movimientos
    }));
    // this.setState({[prop]: event.currentTarget})
  };

  handleClose = prop => event => {
    this.setState({ [prop]: null });
  };

  render() {
    const { abrir_movimientos, abrir_tablas } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer("left", true)}
            >
              <MenuIcon
              // onClick={this.toggleDrawer('left', true)}
              ></MenuIcon>
            </IconButton>
            <Typography variant="h6" color="inherit">
              STOCK
            </Typography>

            {/* TODO 👀📐 5: when a file gets near or > 200 lines, we can refactor it to make it more readable */}
            {/* check out the extension "VSCode React Refactor" https://marketplace.visualstudio.com/items?itemName=planbcoding.vscode-react-refactor*/}
            {/* I would extract the entire Drawer here into a component called LeftDrawer */}
            <SwipeableDrawer
              open={this.state.left}
              onClose={this.toggleDrawer("left", false)}
              onOpen={this.toggleDrawer("left", true)}
            >
              <div
                id="division"
                role="presentation"
                onClick={this.toggleDrawer("right", false)}
                onKeyDown={this.toggleDrawer("left", false)}
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
                  <ListItem
                    button
                    onClick={this.getToggleState("abrir_movimientos")}
                  >
                    <ListItemText primary="Movimientos" />
                    {abrir_movimientos ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={abrir_movimientos} timeout="auto" unmountOnExit>
                    {/* <MenuItem payload = "http://localhost:3000/Proveedores" >
                      salida
                    </MenuItem> */}
                    <List component="div" disablePadding>
                      {/* TODO 👀📐 6: there's a lot of repetition here */}
                      {/* consider mapping out an array of items like this */}
                      {/* {[
                        { link: "/ModPrecios", primary: "Modifica Precios" },
                        { link: "/PresupPant", primary: "Presupuesto" },
                        { link: "/ListaPrecios", primary: "Lista de Precios" }
                      ].map(({ link, primary }) => (
                        <ListItem
                          key={primary}
                          button
                          component={Link}
                          to={link}
                        >
                          <ListItemText primary={primary} />
                        </ListItem>
                      ))} */}
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
                    {/* TODO 👀📐 7: do we need a collapse here?
                    if we can save the user a click,
                    maybe a sidebar with overflow: scroll could be a better solution?
                    here's how to visually separate menus
                    https://miro.medium.com/max/2625/1*7CEsoYdtFPjMBqpDB58HqQ.png
                    from this "refactoring-ui" article
                    https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886
                    */}
                  </Collapse>

                  <ListItem
                    button
                    onClick={this.getToggleState("abrir_movimientos")}
                  >
                    <ListItemText primary="Tablas" />
                    {abrir_tablas ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={abrir_tablas} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {/* TODO 👀📐 6: map from an array here too */}
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
  }
}

export default Header;
