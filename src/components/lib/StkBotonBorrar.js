import React, { Fragment } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase';

// {/* Muesra los botones Flotantes en la parte inferior de la pantalla */}

const StkFab = ({toggleAgregar,toggleBusqueda,toggle_busqueda,search,filtered})=>( 
    <Fragment>           
        
                {/* <h1>Borrar Monedas</h1>
                <input onChange={this.search} type="text" value={this.state.filtered}/> 
                */}
                {this.state.toggle
                ?
                <div>
                    <Button 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        <DeleteIcon  />
                    </Button>
                </div>
                :
                    <div className="center-align">
                        <p>Esta seguro de "BORRAR" este Registro?</p>
                        {/* <button className="green "><i className="material-icons" onClick={()=>this.deleteProduct(this.props.idMonedas)}>check</i></button> */}
                        <Button color="primary" onClick={()=>this.deleteProduct(this.props.idMonedas)}><DoneIcon/></Button>
                        
                        {/* <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button> */}
                        <Button color="secondary" onClick={()=>this.toggle()}><ClearIcon/></Button>
                    </div>
                }

    </Fragment>
)

export default StkFab
