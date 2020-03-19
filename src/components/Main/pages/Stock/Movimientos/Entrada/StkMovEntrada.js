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

export const StkMovEntradaContex = React.createContext();

const initial_state = {
  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: ""
};

var StkMovEntrada = props => {
  var [GRI, setGRI] = useState(initial_state); //la uso como variable para pasarla a la columna2

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container spacing={6}>
          <StkMovEntradaContex.Provider
            value={{
              data: GRI,
              setGRI: setGRI
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
          </StkMovEntradaContex.Provider>
        </Grid>
      </Container>
    </div>
  );
};
export default StkMovEntrada;
