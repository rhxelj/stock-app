import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import useStyles from './styles'
import { stkGrabaMovSalFinal } from './StkGrabaMovSalFinal'
import { stkGrabaMovSalEnvase } from './StkGrabaMovSalEnvase'

// Context
import { useContext } from "react";
import { StkMovSalidaFinalContext } from './StkMovSalidaFinal'


export default function FilaMuestraDatos(props) {
    const { state, setState } = useContext(StkMovSalidaFinalContext);


    var nuevacantdisp = state.StkItemsCantDisp
    if (state.largopasa == 0) {
        var nuevacantstock = state.StkItemsCantidad - state.cantarestar
        nuevacantdisp = state.StkItemsCantDisp - state.cantarestar
    }
    else {
        var nuevacantstock = state.StkItemsCantidad - state.cantarestar
    }


    async function actualizainf() {

        await stkGrabaMovSalFinal(state.grupo, state.rubro, state.item, nuevacantstock, nuevacantdisp)
        await stkGrabaMovSalEnvase(state.nroenvase, state.grupo, state.rubro, state.item, state.cantarestar)
    }
    const classes = useStyles();
    return (
        <>
            {props.open &&
                <Grid container item justify="center">
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
                                <TableCell align="center">{state.nroenvase}</TableCell>
                                <TableCell align="center">{state.StkItemsDesc}</TableCell>

                                <TableCell align="center">{state.StkItemsCantidad}</TableCell>
                                <TableCell style={
                                    nuevacantstock < state.StkItemsMin
                                        ? { background: "#f92c19" }
                                        : {}
                                } align="center">{nuevacantstock}</TableCell>
                                <TableCell align="center">{state.StkItemsCantDisp}</TableCell>
                                <TableCell align="center">{nuevacantdisp}</TableCell>
                                <TableCell align="center">{state.cantarestar}</TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                    <Button id='botonconf' variant="contained" color="primary" onClick={actualizainf}>
                        Confirmar
          </Button>
                </Grid>
            }
        </>
    );
}
