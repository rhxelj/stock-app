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

import leePresupConfTipoLeerDesc from "../../leePresupConfTipoLeerDesc"
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaUnoIzq() {
  const [selectedValue, setSelectedValue] = React.useState("UNIDAD");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    var descripcion = event.target.value
    setState({ ...state, PresupConfTipoDesc: event.target.value });
    leerdesc(descripcion)
  };

  async function leerdesc(descripcion) {
    const result = await leePresupConfTipoLeerDesc(descripcion);
    setState({ ...state, DatosPresupEleg: result });
  }



  const classes = useStyles();

  const textdata = [
    {
      id: "TipoConfeccion",
      label: "Confección",
      value: state.idPresupConfTipo,
      mapeo: (
        <>
          <option></option>
          {state.tipopresup.map((option) => (
            <option key={option.idPresupConfTipo} value={option.idPresupConfTipo}>
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
        ))}
      </Grid>
    </>
  );
}
