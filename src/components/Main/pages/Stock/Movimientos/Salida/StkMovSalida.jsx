import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import useStyles from "./StkMovSalidaStyle";
import FilaDos from "./LayoutMovSalida/FilaDos";
import FilaTres from "./LayoutMovSalida/FilaTres";
import FilaCuatro from "./LayoutMovSalida/FilaCuatro";
// import FilaCinco from "./LayoutMovSalida/FilaCinco";
import FilaCinco from "./LayoutMovSalida/FilaCinco/index";
import { initial_state } from "./Initial_State";

import StkGenImpQR from "../../../Impresion/StkGenImpQR";

import { HeaderTitle } from "../../../../../lib/HeaderTitle";

export const StkMovSalidaContext = React.createContext();

var StkMovSalida = (props) => {
  HeaderTitle("Movimiento de Salida");

  const [state, setState] = useState(initial_state);
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={6}>
          <StkMovSalidaContext.Provider
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
          </StkMovSalidaContext.Provider>
        </Grid>
      </Container>
    </div>
  );
};
export default StkMovSalida;
