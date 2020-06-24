import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';

import DatosPresup from './DatosPresup'
import { initial_state } from "./Initial_State";

import useStyles from "./PresupStyle";
import FilaUno from './LayoutPresupuesto/FilaUno'
import FilaDos from './LayoutPresupuesto/FilaDos'
import FilaTres from './LayoutPresupuesto/FilaTres'
import {
  Container,
  Dialog,
  Grid,
  Paper,
} from "@material-ui/core";
export const PresupPantContext = React.createContext();


  var PresupPant = props => {
    const [state, setState] = useState(initial_state);
    const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={6}>
          <PresupPantContext.Provider
            value={{
              state: state,
              setState: setState
            }}
          >
            {/* Botones de elección de presupuesto */}
            <FilaUno />
             {/* Cantidad y Rubro */}
             <FilaDos />
            {/* Fila Cantidd, Pres. Desc., Pres., UM,Ancho */}
           {/* <FilaTres /> */}
            {/* Fila Partida, Ub. Geo., Ub. Fisc., Observaciones */}
            {/* <FilaCuatro /> */}
            {/* Fila Confirma, Cancela, Borra */}
            {/* <FilaCinco /> */}
          </PresupPantContext.Provider>
        </Grid>
      </Container>
    </div>
  );
}
export default PresupPant;