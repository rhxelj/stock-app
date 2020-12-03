import React, { Fragment, useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';

import DatosPresup from './DatosPresup'
import { initial_state } from "./Initial_State";

import useStyles from "./PresupStyle";
import FilaUno from './LayoutPresupuesto/FilaUno'
import FilaDos from './LayoutPresupuesto/FilaDos'
import TablaPresup from './LayoutPresupuesto/TablaPresup'
import FilaCuatro from './LayoutPresupuesto/FilaCuatro'

import Box from '@material-ui/core/Box';
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

      {/* <Container> */}
      {/* <Grid item></Grid> */}
      <Grid container spacing={3}
      // alignItems="center"
      >
        <PresupPantContext.Provider
          value={{
            state: state,
            setState: setState
          }}
        >
          {/* <Grid item></Grid>  Para dejar espacio  */}
          {/* <Grid item xs={1}></Grid>  Para dejar espacio */}
          {/* <Grid> */}
          {/* <Box style={{ margin: "15px", backgroundColor: "red" }} > */}
          <FilaUno />
          {/* </Grid> */}
          {/* </Box> */}
          {/* <Grid> */}
          <FilaDos />
          {/* </Grid> */}
          {/* <Grid item xs={1}></Grid>  Para dejar espacio */}

        </PresupPantContext.Provider>
      </Grid>
      {/* </Container> */}
    </div>
  );
}
export default PresupPant;