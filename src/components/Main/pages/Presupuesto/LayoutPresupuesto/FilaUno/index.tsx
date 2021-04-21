import React from "react";
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

import FilaUnoIzq from "./FilaUnoIzq";
import TipoCliente from "./TipoCliente";
import TipoIVA from "./TipoIVA";

export default function Fila() {
  return (
    <>
      {/* <Grid
        container
        spacing={3}
        // alignItems="flex-end"
        // direction="row"
        // justify="center"
        alignItems="center"
        xs={12}
      > */}
      <TipoCliente />
      <TipoIVA />
      <FilaUnoIzq />

      {/* </Grid> */}
    </>
  );
}
