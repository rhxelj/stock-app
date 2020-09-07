import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';

import DatosPresup from './DatosPresup'
import { initial_state } from "./Initial_State";

import useStyles from "./PresupStyle";
import FilaUno from './LayoutPresupuesto/FilaUno'
import FilaDos from './LayoutPresupuesto/FilaDos'
import TablaPresup from './LayoutPresupuesto/TablaPresup'
import FilaCuatro from './LayoutPresupuesto/FilaCuatro'

import {
  Container,
  Dialog,
  Grid,
  Paper,
} from "@material-ui/core";
import leePresupConfTipoLeeAnexo from "./leePresupConfTipoLeeAnexo"

export const PresupPantContext = React.createContext();


var PresupPant = props => {

  const [state, setState] = useState(initial_state);
  const classes = useStyles();


  async function conftipoleer(anexo) {
    const result = await leePresupConfTipoLeeAnexo(anexo);
    setState({ ...state, tipopresup: result });
  }


  useEffect(() => {
    var anexo = 'N'
    conftipoleer(anexo);
  }, []);



  return (
    <div>
      {
        console.log('state.tipopresup    ', state.tipopresup)}
      <Container>
        {/* <Grid item></Grid> */}
        <Grid container spacing={3} alignItems="center">
          <PresupPantContext.Provider
            value={{
              state: state,
              setState: setState
            }}
          >
            <Grid item></Grid> {/*  Para dejar espacio  */}
            <Grid item></Grid> {/*  Para dejar espacio  */}
            <FilaUno />
            <FilaDos />

          </PresupPantContext.Provider>
        </Grid>
      </Container>
    </div>
  );
}
export default PresupPant;