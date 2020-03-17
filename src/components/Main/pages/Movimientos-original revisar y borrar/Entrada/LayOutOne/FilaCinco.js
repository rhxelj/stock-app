import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

export default function Fila() {
  const classes = useStyles();

  return (
    <>
      <Grid container item spacing={2} justify="flex-end">
        {/* <Grid container direction="row" justify="flex-end" spacing={4} item>
          <Paper className={classes.paper}>Borrar</Paper>
          <Paper className={classes.paper}>confirma</Paper>
          <Paper className={classes.paper}>cancela</Paper>
        </Grid> */}
        <Grid item xs={3}>
          <Paper className={classes.paper}>Borrar</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Confirma</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Cancela</Paper>
        </Grid>
      </Grid>
    </>
  );
}
