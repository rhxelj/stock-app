import React from 'react';
import { Link } from 'react-router-dom'

// imported for use material-UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class  Header extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
      };



    render(){
        const { anchorEl } = this.state;
        return (
            <div>
                {/* <AppBar position="static"> */}
                <AppBar position="fixed">
                    <div>
                    <Button
                    color="inherit"
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    >
                    Menu Principal
                    </Button>
                    </div>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    >
                    {/* <MenuItem onClick={this.handleClose}><Link to="/StkMovimiento">Movimiento</Link></MenuItem> */}
                    {/* <MenuItem onClick={this.handleClose}><Link to="/StkMovSalida">Movimiento Salida</Link></MenuItem> */}
                    <MenuItem onClick={this.handleClose}><Link to="/StkMonedas">Monedas</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/Proveedores">Proveedores</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/StkUnMed">Unidad Medida</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/StkRubro">Rubros</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/StkGrupo">Grupos</Link></MenuItem>
                    <MenuItem onClick={this.handleClose}><Link to="/StkItems">Items</Link></MenuItem>
                    </Menu>
                </AppBar>
            </div>   
    )
    }
}
export default Header;