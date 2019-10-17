import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
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

class Header extends React.Component {
 
  constructor(props){
    super(props)
  
   
  this.state = {
    open: false,
    menutablas:null,
    menutablas1:null,
    menumov:null,
    top: false,
    left: false,
    bottom: false,
    right: false,
    setSelectedIndex: 0,
      showComponent: false,
  }

  }
 
  toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  
    this.setState({ [side]: open });
  };



  handleClickMovimientos = () => {
    this.setState(prevState => ({
      abrir_movimientos: !prevState.abrir_movimientos
      
    }))
  };

  handleClickTablas = () => {   
    this.setState(prevState => ({
      abrir_tablas: !prevState.abrir_tablas
      
    }))
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
            onClick={this.toggleDrawer('left', true)}
        >
            <MenuIcon
              onClick={this.toggleDrawer('left', true)}
            >
            </MenuIcon>
        </IconButton>
        <Typography variant="h6" color="inherit">
            STOCK
        </Typography>
      
   


           <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer('left', false)}
            onOpen={this.toggleDrawer('left', true)}
           >
              <div
                id="division"
                role="presentation"
                onClick={this.toggleDrawer('right', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                <List
                color = 'blue'
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Menú Stock
                    </ListSubheader>
                  }
                >
                  <ListItem button  onClick={this.handleClickMovimientos}>
                    <ListItemText primary="Movimientos" />
                      {abrir_movimientos ? <ExpandLess  /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={abrir_movimientos}  timeout="auto" unmountOnExit> 
                    {/* <MenuItem payload = "http://localhost:3000/Proveedores" >
                      salida
                    </MenuItem> */}
                     <List component="div" disablePadding>
                    {/*    <ListItem button component={Link} to="/ListaPrecios">
                          <ListItemText primary="Lista Precios" />
                          </ListItem>*/}
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
               
                  <ListItem button onClick={this.handleClickTablas}>
                    <ListItemText primary="Tablas" />
                      {abrir_tablas ? <ExpandLess  /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={abrir_tablas}  timeout="auto" unmountOnExit> 
                        <List component="div" disablePadding>
                            <ListItem  button component={Link} to="/Proveedores">
                              <ListItemText primary="Proveedores" />
                            </ListItem>
                            <ListItem  button component={Link} to="/StkMonedas">
                              <ListItemText primary="Monedas" />
                            </ListItem>
                            <ListItem  button component={Link} to="/StkGrupo">
                              <ListItemText primary="Grupos" />
                            </ListItem>
                            <ListItem  button component={Link} to="/StkRubro">
                              <ListItemText primary="Rubros" />
                            </ListItem>
                            <ListItem  button component={Link} to="/StkItems">
                              <ListItemText primary="Items" />
                            </ListItem>
                            <ListItem  button component={Link} to="/StkUnMed">
                              <ListItemText primary="Unidad de Medidas" />
                            </ListItem>
                            <ListItem  button component={Link} to="/StkUbFisica">
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
