/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ImprimirPantalla   from '../Impresion/ImprimirPantalla'
import { Dialog, TablePagination } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));


// var columnas = [
//   { nombre :  "Código" },
//   { nombre :  "Código2" },
  

//   { nombre :  "Código3" }

    
// ]
export default function SelecCampos(props) {
  // const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [properties, setProperties] = React.useState(false);
 
  
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  
  // La siguiente funcion la uso para hacer el mapeo correcto de los encabezados a mostrar*********

  const mapeo = ()=>{
      var campoVisible=[]
      checked.map(valor =>{
        const encabezado ={
                displayName:valor.Header,
                field: valor.accessor
              }
        campoVisible.push(encabezado)
      })
      setProperties(campoVisible)
  }

  // *********

    return (
    <div>
    <Dialog
      open={true}
      // onClose={this.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">Elija los Campos a IMPRIMIR</DialogTitle>
    {/* <List className={classes.root}> */}
    <List>
        {/* {columnas.map(value => { */}
           {props.headerTabla.map((value,index) => {
             const labelId = `checkbox-list-label-${value}`;
             
             return (
          <ListItem key={value.Header} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.Header }`} />
            <ListItemText id={labelId} primary={`${value.accessor }`} />
           
          </ListItem>
          
          );
        })
        }
    </List>
    {/* Aca llamo a ImprimirPantalla y le paso datos y columnas */}
      {/* <ImprimirPantalla elegidos={checked} datos={props.datos} /> */}

        <DialogActions>
          <Button 
            variant="contained" 
            color="primary" 
            // onClick={()=> setOpen(true)}
            onClick={()=> {
              mapeo()
              setOpen(true)
            }}
          >
            Imprimir
          </Button>

          <Button variant="contained" color="secondary" onClick={()=>props.toggleImprimir()}>
            Cancelar
          </Button>
        </DialogActions>
        {/* </Dialog> */}


      </Dialog>
      
      {/* {toggle.imprimir && */}
      {open &&
        <ImprimirPantalla 
          datos={props.datos} 
          properties={properties}
          toggleImprimir={props.toggleImprimir} 
          // properties={checked}
        /> 
       }
    </div>
  );
}
