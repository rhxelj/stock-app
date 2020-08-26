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

export default function FilaUnoIzq() {
  const [selectedValue, setSelectedValue] = React.useState("un");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupTipo: event.target.value });
    console.log(event.target.value);
  };
  const classes = useStyles();

  const textdata = [
    {
      id: "TipoConfeccion",
      label: "Confección",
      value: state.PresupTipo,
      mapeo: (
        <>
          <option></option>
          {state.tipopresup.map((option) => (
            // // <option key={option.tipopresupabr} value={option.tipopresupabr}>
            //   {/* {option.tipopresupdet} */}
            <option key={option.PresupConfTipo} value={option.PresupConfTipo}>
              {option.PresupConfTipoDesc}
            </option>
          ))}
        </>
      ),
    },
  ];
  return (
    <>
      {/* <Grid container item spacing={3} xs={6}> */}
      <Grid item spacing={3} xs>
        {textdata.map((data) => (
          <TextField
            id={data.id}
            size="small"
            select
            label={data.label}
            fullWidth
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
          >
            {data.mapeo}
          </TextField>
          // <Grid>
          // </Grid>
        ))}
      </Grid>
    </>
  );
}
