import React, { useState } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
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
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaUnoDer() {
  const [selectedValue, setSelectedValue] = React.useState("mn");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupMnMy: event.target.value });
  };
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" xs={6}>
        <Grid item spacing={3} xs={2}>
          <Radio
            checked={selectedValue === "mn"}
            onChange={handleChange}
            value="mn"
            name="radio-button-mnmy"
          />
          Minorista
        </Grid>
        <Grid item spacing={3} xs={2}>
          <Radio
            checked={selectedValue === "my"}
            onChange={handleChange}
            value="my"
            name="radio-button-mnmy"
          />
          Mayorista
        </Grid>
      </Grid>
    </>
  );
}
