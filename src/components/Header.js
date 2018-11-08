import React from 'react';
import { Link } from 'react-router-dom'

// imported for use material-UI
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
                
                <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
                >
                Menu Principal
                </Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                >
                <MenuItem onClick={this.handleClose}><Link to="/StkMonedas">Monedas</Link></MenuItem>
                <MenuItem onClick={this.handleClose}><Link to="/Proveedores">Proveedores</Link></MenuItem>
                <MenuItem onClick={this.handleClose}><Link to="/StkUnMed">Unidad Medida</Link></MenuItem>
                </Menu>
            
            {/* <nav className="blue">
                <div  className="container">    
                    <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">STOCK APP</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/StkMonedas">Monedas</Link></li>
                        <li><Link to="/Proveedores">Proveedores</Link></li>
                        <li><Link to="/StkUnMed">Unidad Medida</Link></li>
                    </ul>
                    </div>
                    </div>
            </nav> */}
        
    {/* boton flotante */}

    {/* <div className="fixed-action-btn">
    <a className="btn-floating btn-large red">
        <i className="large material-icons">mode_edit</i>
    </a>
    <ul>
        <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
        <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
        <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
        <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
    </ul>
    </div> */}

        
    
        </div>   
    )
    }
}
export default Header;