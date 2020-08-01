import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
            {props.open &&
                <Grid container item justify="rigth">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Detalle</TableCell>
                                <TableCell align="right">Stock </TableCell>
                                <TableCell align="right">Disponibilidad</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell align="right">{props.datosm.detalle}</TableCell>
                                <TableCell align="right">{props.datosm.StkItemsCantidad}</TableCell>
                                <TableCell align="right">{props.datosm.StkItemsCantDisp}</TableCell>
                                <TableCell align="right">{props.datosm.cantarestar}</TableCell>


                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            }
        </>
    );
}
