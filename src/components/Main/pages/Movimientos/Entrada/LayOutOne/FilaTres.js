import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

//Necesario para CONTEXTAPI
import { useContext } from "react";
import { StkMovEntradaContex } from "../StkMovEntrada";

export default function Fila() {
  const classes = useStyles();

  // Esto es para poder consumir los datos del CONTEXAPI
  const value = useContext(StkMovEntradaContex);

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper}>Cantidad</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Presentacion Descripcion</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Presentacion</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Unidad de Medida</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>ancho</Paper>
        </Grid>
      </Grid>
    </>
  );
}
