import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';

import { initial_state } from "./Initial_State";

import useStyles from './StkMovSalidaStyle'
import StkSalidaFinal from './StkSalidaFinal'
import {
    Container,
    Dialog,
    Grid,
    Paper,
} from "@material-ui/core";


export const StkMovSalidaFinalContext = React.createContext();


var StkMovSalidaFinal = props => {
    const [state, setState] = useState(initial_state);
    const classes = useStyles();

    return (
        <div>
            <Container>
                <Grid container spacing={6}>
                    <StkMovSalidaFinalContext.Provider
                        value={{
                            state: state,
                            setState: setState
                        }}
                    >
                        {/* Botones de elección de presupuesto */}
                        <StkSalidaFinal />
                        {/* Cantidad y Rubro */}
                        {/* Fila Cantidd, Pres. Desc., Pres., UM,Ancho */}
                        {/* <FilaTres /> */}
                        {/* Fila Partida, Ub. Geo., Ub. Fisc., Observaciones */}
                        {/* <FilaCuatro /> */}
                        {/* Fila Confirma, Cancela, Borra */}
                        {/* <FilaCinco /> */}
                    </StkMovSalidaFinalContext.Provider>
                </Grid>
            </Container>
        </div>
    );
}
export default StkMovSalidaFinal;