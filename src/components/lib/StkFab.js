import React, { Fragment } from 'react';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';





// {/* Muesra los botones Flotantes en la parte inferior de la pantalla */}

const StkFab = ({toggleAgregar,toggleBusqueda,toggle_busqueda,search,filtered,borraFiltered})=>( 
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
            {toggle_busqueda && 
              <ClickAwayListener onClickAway={toggleBusqueda}>
              <Paper >
                    <InputBase style={{marginLeft:"10px"}} placeholder="Texto de Busqueda" onChange={search} type="text" value={filtered}/>
                        <IconButton onClick={borraFiltered} aria-label="Search">
                            <ClearIcon/>
                        </IconButton>
                </Paper>
                </ClickAwayListener>
            }
        </div>
        
    </Fragment>
)

export default StkFab
