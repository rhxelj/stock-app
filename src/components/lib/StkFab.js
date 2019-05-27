import React, { Fragment } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase';

// {/* Muesra los botones Flotantes en la parte inferior de la pantalla */}

const StkFab = ({toggleAgregar,toggleBusqueda,toggle_busqueda,search,filtered})=>( 
    <Fragment>           
        
        {/* Agregar datos a la base de datos */}
        <Fab 
            onClick={toggleAgregar} 
            color="primary" 
            aria-label="Add" 
            style={{ 
                "position" : "fixed",
                "bottom": "10px",
                "right": "25px",}}
        >
            <AddIcon />
        </Fab>
        
        {/* Filtro de busqueda */}
        <Fab 
            onClick={toggleBusqueda} 
            color="primary" 
            aria-label="Search" 
            style={{ 
                "position" : "fixed",
                "bottom": "70px",
                "right": "25px",}}
        >
            <SearchIcon />
        </Fab>
        
        <div      // className={this.props.classes.fab}
            style={{ 
                "position" : "fixed",
                "bottom": "135px",
                "right": "25px",}}
        >     
            {toggle_busqueda && <InputBase style={{background:"grey"}} placeholder="Texto de Busqueda" onChange={search} type="text" value={filtered}/>}
        </div>

    </Fragment>
)

export default StkFab
