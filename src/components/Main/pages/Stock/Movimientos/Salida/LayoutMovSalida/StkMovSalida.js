// import React, { Component} from 'react'
import React, { useState } from "react";

import { initial_state } from './Initial_State'

import { Container, Grid } from "@material-ui/core";
import { HeaderTitle } from "../../../../../../lib/HeaderTitle";
import FilaDos from "./FilaDos";
import FilaTres from "./FilaTres";
import FilaCinco from "./FilaCinco";
export const StkMovSalidaContext = React.createContext();

function StkMovSalida() {
  HeaderTitle("Salidas de stock por Confección en Venta");
  const [state, setState] = useState(initial_state);

  return (
    <Container>
      <StkMovSalidaContext.Provider
        value={{
          state: state,
          setState: setState,
        }}
      >
        <Grid container spacing={32}>
          <FilaDos />
          <div style={{ margin: "25px" }}></div>{" "}
          {/* esto es para dar espacio */}
          <FilaTres /> {/* Cantida / Largo / Ancho / Tipo de Confección */}
          <div style={{ margin: "25px" }}></div>{" "}
          {/* esto es para dar espacio */}
          <FilaCinco />
        </Grid>
      </StkMovSalidaContext.Provider>
    </Container>
  );
}

export default StkMovSalida;
