import React, { useState } from "react";
import Radio, { RadioProps } from '@material-ui/core/Radio';
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

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";


export default function FilaUnoIzq() {
  const [selectedValue, setSelectedValue] = React.useState('un');
  const { state, setState } = useContext(PresupPantContext);


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupTipo: event.target.value });
    console.log(event.target.value)
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
          {state.tipopresup.map(option => (
            <option key={option.tipopresupabr} value={option.tipopresupabr}>
              {option.tipopresupdet}
            </option>
          ))}
        </>
      )

    }
  ];
  return (
    <>
      <Grid container item justify="left">
        {textdata.map(data => (
          <Grid >
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
          </Grid>
        ))}
        {/* <Radio
        checked={selectedValue === 'un'}
        onChange={handleChange}
        value="un"
        name="radio-button-presup"
      />
      Unidad
      <Radio
        checked={selectedValue === 'pu'}
        onChange={handleChange}
        value="pu"
        name="radio-button-presup"
      />
      Paño Unido
      <Radio
        checked={selectedValue === 'fa'}
        onChange={handleChange}
        value="fa"
        name="radio-button-presup"
      />
      Con Fajas
      <Radio
        checked={selectedValue === 'cf'}
        onChange={handleChange}
        value="cf"
        name="radio-button-presup"
      />
      Confeccionada
      <Radio
        checked={selectedValue === 'en'}
        onChange={handleChange}
        value="en"
        name="radio-button-presup"
        size="small"
      />
      Enrollable */}
      </Grid>
    </>
  );
}
