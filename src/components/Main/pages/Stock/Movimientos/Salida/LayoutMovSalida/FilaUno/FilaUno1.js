import React, { useState } from "react";
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
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

export default function Fila() {
  let fecha = new Date();
  var [fechahoy, setfechahoy] = useState(
    fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
  );
  const classes = useStyles();
  return (
    <>
      <Grid container item justify="center">
        {/* <Paper className={classes.paper}>FECHA</Paper> */}
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          type="text"
          id="FechaAct"
          label="Fecha"
          // value={state.StkItemsFAct}
          value={fechahoy}
          disabled
          // className={classes.textField}
        />
      </Grid>
    </>
  );
}
