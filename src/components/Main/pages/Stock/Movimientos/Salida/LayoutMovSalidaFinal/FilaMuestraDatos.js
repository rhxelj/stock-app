import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import useStyles from "../styles";

// Context



export default function FilaMuestraDatos(props) {

    console.log('props  ', props)
    console.log(props.datosm.StkItemsCantDisp)
    console.log(props.datosm.StkItemsCantidad)
    console.log(props.datosm.StkItemsFAct)
    console.log(props.datosm.StkItemsMax)
    console.log(props.datosm.StkItemsMin)
    return (
        <>
            <Grid container item justify="rigth">
                <h2>esta en muestra</h2>
                <h2>Disponibilidad   : {props.datosm.StkItemsCantDisp}</h2>
            </Grid>
        </>
    );
}
