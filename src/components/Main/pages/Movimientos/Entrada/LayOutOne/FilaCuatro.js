import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

export default function Fila() {
  const classes = useStyles();

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper}>Partida</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Ubicacion Geografica</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Ubicacion Fisica</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Observaciones</Paper>
        </Grid>
      </Grid>
    </>
  );
}
