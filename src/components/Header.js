import React from 'react';
import { Link } from 'react-router-dom'


const Header = () => (
    <div>
   
        <nav className="blue">
            <div  className="container">    
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo">STOCK APP</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/StkMonedas">Monedas</Link></li>
                    <li><Link to="/Proveedores">Proveedores</Link></li>
                    <li><Link to="/StkUnMed">Unidad Medida</Link></li>
                    {/* <li><Link to="/AgregarMonedas">Agregar Monedas</Link></li> */}
                    {/* <li><Link to="/BorrarMonedas">Borrar Monedas</Link></li> */}
                    {/* <li><Link to="/ModificarMonedas">Modificar Monedas</Link></li> */}
                    {/* <li><Link to="/LeerMonedas">Leer Monedas</Link></li> */}
                </ul>
                </div>
                </div>
        </nav>
       
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

);

export default Header;