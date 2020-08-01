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
import useStyles from './styles'

// Context



export default function FilaMuestraDatos(props) {
    var nuevacantdisp = props.datosm.StkItemsCantDisp

    if (props.datosm.largopasa == 0) {
        var nuevacantstock = props.datosm.StkItemsCantidad - props.datosm.cantarestar
        nuevacantdisp = props.datosm.StkItemsCantDisp - props.datosm.cantarestar
    }
    else {
        var nuevacantstock = props.datosm.StkItemsCantidad - props.datosm.cantarestar
    }
    const classes = useStyles();
    return (
        <>
            {props.open &&
                <Grid container item justify="rigth">
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Envase </TableCell>
                                <TableCell align="center" >Detalle</TableCell>
                                <TableCell align="center" colSpan={2} >Stock </TableCell>
                                <TableCell align="center" colSpan={2} >Disponibilidad</TableCell>
                                <TableCell align="center">Cantidad</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                                <TableCell align="center">Anterior </TableCell>
                                <TableCell align="center">Actual </TableCell>
                                <TableCell align="center">Anterior </TableCell>
                                <TableCell align="center">Actual </TableCell>
                                <TableCell align="center"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell align="center">{props.datosm.nroenvase}</TableCell>
                                <TableCell align="center">{props.datosm.detalle}</TableCell>

                                <TableCell align="center">{props.datosm.StkItemsCantidad}</TableCell>
                                <TableCell style={
                                    nuevacantstock < props.datosm.StkItemsMin
                                        ? { background: "#f92c19" }
                                        // : { background: "#00e676" }
                                        : {}
                                } align="center">{nuevacantstock}</TableCell>

                                <TableCell align="center">{props.datosm.StkItemsCantDisp}</TableCell>
                                <TableCell align="center">{nuevacantdisp}</TableCell>
                                <TableCell align="center">{props.datosm.cantarestar}</TableCell>


                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            }
        </>
    );
}
