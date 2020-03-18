import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import ComboBCC from "../../../../../../lib/ComboBCC";
export default function Fila() {
  const classes = useStyles();

  const actions = {
    borrar: () => alert("presiono BORRAR"),
    confirmar: () => alert("presiono CONFIRMAR"),
    cancelar: () => alert("presiono CANCELAR")
  };

  return (
    <>
      <Grid container item spacing={2} justify="flex-end">
        <ComboBCC actions={actions} />
      </Grid>
    </>
  );
}
