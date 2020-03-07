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
