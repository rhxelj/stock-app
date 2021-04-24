import React, { useState } from "react";
import { initial_state } from "./Initial_State";
import FilaUno from './LayoutPresupuesto/FilaUno'
import FilaDos from './LayoutPresupuesto/FilaDos'

import { HeaderTitle } from '../../../lib/HeaderTitle';
import {
  Grid,
} from "@material-ui/core";

export const PresupPantContext = React.createContext();


var PresupPant = () => {
  HeaderTitle("Presupuestos");

  const [state, setState] = useState(initial_state);
  const [datosrenglon, setDatosRenglon] = useState([]);

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