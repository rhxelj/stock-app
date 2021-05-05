import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";

import FilaDos from "./LayoutMovEntrada/FilaDos";
import FilaTres from "./LayoutMovEntrada/FilaTres";
import FilaCuatro from "./LayoutMovEntrada/FilaCuatro";
// import FilaCinco from "./LayoutMovEntrada/FilaCinco";
import FilaCinco from "./LayoutMovEntrada/FilaCinco/index";
import { initial_state } from "./Initial_State";

// import StkGenImpQR from "../../../Impresion/StkGenImpQR";

import { HeaderTitle } from "../../../../../lib/HeaderTitle";

export const StkMovEntradaContext = React.createContext();

var StkMovEntrada = () => {
  HeaderTitle("Movimiento de Entrada");

  const [state, setState] = useState(initial_state);
  // const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={6}>
          <StkMovEntradaContext.Provider
            value={{
              state: state,
              setState: setState,
            }}
          >
            {/* Grupo, Rubro, Items, Cant. Disp., Cant, Min. */}
            <FilaDos />
            {/* Fila Cantidd, Pres. Desc., Pres., UM,Ancho */}
            <FilaTres />
            {/* Fila Partida, Ub. Geo., Ub. Fisc., Observaciones */}
            <FilaCuatro />
            {/* Fila Confirma, Cancela, Borra */}
            <FilaCinco />
          </StkMovEntradaContext.Provider>
        </Grid>
      </Container>
    </div>
  );
};
export default StkMovEntrada;
