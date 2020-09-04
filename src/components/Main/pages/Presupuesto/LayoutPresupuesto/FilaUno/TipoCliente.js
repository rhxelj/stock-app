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

// import Radio from '@material-ui/core/Radio';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function TipoCliente() {
  const [selectedValue, setSelectedValue] = React.useState("mn");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupMnMy: event.target.value });
  };
  const classes = useStyles();
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipo de Cliente</FormLabel>
        <RadioGroup
          row
          aria-label="Tipo de Cliente"
          name="tipoCliente"
          value={selectedValue}
          onChange={handleChange}
        >
          <Grid item xs>
            <FormControlLabel
              value="mn"
              control={<Radio />}
              label="Minorista"
              labelPlacement="top"
            />
          </Grid>
          <Grid item xs>
            <FormControlLabel
              value="my"
              control={<Radio />}
              label="Mayorista"
              labelPlacement="top"
            />
          </Grid>
        </RadioGroup>
      </FormControl>
      {/* <Grid container direction="column" xs={6}>
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
      </Grid> */}
    </>
  );
}