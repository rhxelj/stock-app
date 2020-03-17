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
  Typography
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

export default function Fila() {
  const classes = useStyles();

  return (
    <>
      <Grid container item justify="center">
        {/* <Paper className={classes.paper}>FECHA</Paper> */}
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          type="date"
          id="FechaAct"
          label="Fecha"
          // value={state.StkItemsFAct}
          value="10/10/2020"
          disabled
          // className={classes.textField}
        />
      </Grid>
    </>
  );
}
