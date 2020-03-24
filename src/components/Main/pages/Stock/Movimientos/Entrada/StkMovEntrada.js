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
  Typography
} from "@material-ui/core";

import useStyles from "./StkMovEntradaStyle";
import FilaUno from "./LayoutMovEntrada/FilaUno";
import FilaDos from "./LayoutMovEntrada/FilaDos";
import FilaTres from "./LayoutMovEntrada/FilaTres";
import FilaCuatro from "./LayoutMovEntrada/FilaCuatro";
import FilaCinco from "./LayoutMovEntrada/FilaCinco";
import { initial_state } from "./Initial_State";

export const StkMovEntradaContext = React.createContext();

var StkMovEntrada = props => {
  const [state, setState] = useState(initial_state);
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={6}>
          <StkMovEntradaContext.Provider
            value={{
              state: state,
              setState: setState
            }}
          >
            <FilaUno /> {/* Fecha */}
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