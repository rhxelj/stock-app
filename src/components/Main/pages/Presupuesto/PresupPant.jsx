import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';

import DatosPresup from './DatosPresup'
import { initial_state } from "./Initial_State";
import useStyles from "./PresupStyle";
import FilaUno from './LayoutPresupuesto/FilaUno'
import FilaDos from './LayoutPresupuesto/FilaDos'
import TablaPresup from './LayoutPresupuesto/TablaPresup'
import FilaCuatro from './LayoutPresupuesto/FilaCuatro'

import { HeaderTitle } from '../../../lib/HeaderTitle';
import {
  Container,
  Dialog,
  Grid,
  Paper,
} from "@material-ui/core";

export const PresupPantContext = React.createContext();


var PresupPant = (props) => {
  HeaderTitle("Presupuestos");

  const [state, setState] = useState(initial_state);
  const [datosrenglon, setDatosRenglon] = useState([]);
  const classes = useStyles();

  return (
    <div>

      {/* <Container> */}
      {/* <Grid item></Grid> */}
      <Grid container spacing={2} alignItems="center">
        {/* spacing={3}  */}
        <PresupPantContext.Provider
          value={{
            state: state,
            setState: setState,
            datosrenglon: datosrenglon,
            setDatosRenglon: setDatosRenglon
          }}
        >
          {/* <Grid item></Grid> {/*  Para dejar espacio  */}
          {/* <Grid item></Grid>  {/* Para dejar espacio  */}
          <FilaUno />
          <FilaDos />

        </PresupPantContext.Provider>

      </Grid>
      {/* </Container> */}
    </div>
  );
}
export default PresupPant;