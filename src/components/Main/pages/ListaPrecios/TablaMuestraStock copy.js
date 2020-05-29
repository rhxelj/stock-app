import React, {useState, useEffect} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Paper } from '@material-ui/core';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function TablaMuestraStock(props) {

const {open, handleClose, datositems} = props


return (
<Dialog
open={open}
TransitionComponent={Transition}
keepMounted
onClose={handleClose}
aria-labelledby="alert-dialog-slide-title"
aria-describedby="alert-dialog-slide-description"
>
<DialogTitle id="alert-dialog-slide-title">{"Datos de Items"}</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-slide-description">
  <Table>
             <TableHead>
               <TableCell>Detalle</TableCell>
               <TableCell>Cant.Disponible</TableCell>
               <TableCell>Cant.Stock</TableCell>
             </TableHead>
             <TableBody>
             {datositems.map((stkitem) => {
               return(
                 <TableRow key={stkitem.StkItemsDesc}>
                  <TableCell >{stkitem.StkItemsDesc}</TableCell>
                  <TableCell numeric>{stkitem.StkItemsCantDisp}</TableCell>
                  <TableCell numeric>{stkitem.StkItemsCantidad}</TableCell>
                  </TableRow>
             )
               })}
             </TableBody>
           </Table>
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose} color="secondary">
    Cerrar
  </Button>
  
</DialogActions>
</Dialog>

)
}