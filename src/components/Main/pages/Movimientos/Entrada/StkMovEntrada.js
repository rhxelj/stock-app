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
import FilaUno from "./LayOutOne/FilaUno/";
import FilaDos from "./LayOutOne/FilaDos/";
import FilaTres from "./LayOutOne/FilaTres";
import FilaCuatro from "./LayOutOne/FilaCuatro";
import FilaCinco from "./LayOutOne/FilaCinco";

var StkMovEntrada = props => {
  // var [state, setState] = useState(initial_state);
  // var [dialog, setDialog] = useState(true);

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={6}>
          {/* Fecha */}
          <FilaUno />

          {/* Grupo, Rubro, Items, Cant. Disp., Cant, Min. Stock, Max. Stock */}
          {/* <FilaDos filados={filados} /> */}
          <FilaDos />

          {/* Fila Cantidd, Pres. Desc., Pres., UM,Ancho */}
          <FilaTres />

          {/* Fila Partida, Ub. Geo., Ub. Fisc., Observaciones */}
          <FilaCuatro />

          {/* Fila Confirma, Cancela, Borra */}
          <FilaCinco />
        </Grid>
      </Container>
    </div>
  );
};
export default StkMovEntrada;
