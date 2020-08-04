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
import FilaUnoDer from "./FilaUnoDer";

export default function FilaUno() {
  return (
    <>
      {/* <Grid
        container
        spacing={3}
        // alignItems="flex-end"
        // direction="row"
        // justify="center"
        // alignItems="center"
        xs={12}
      > */}
      <FilaUnoIzq />
      <FilaUnoDer />
      {/* </Grid> */}
    </>
  );
}
