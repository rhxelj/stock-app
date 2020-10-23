import React, { useState, useEffect } from "react";
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
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { stat } from "fs";

export default function FilaUnoIzq(props) {
  const [selectedValue, setSelectedValue] = React.useState("");
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

  async function conftipoleer(anexo) {
    const result = await leePresupConfTipoLeeAnexo(anexo);
    setState({ ...state, tipopresup: result });
  }


  // useEffect(() => {
  //   var anexo = 'N'
  //   conftipoleer(anexo)
  // }, []);


  useEffect(() => {
    if (state.tipopresup.length === 0) {
      var anexo = 'N'
      conftipoleer(anexo)
    }
  }, [state.tipopresup]);

  const classes = useStyles();

  const textdata = [
    {
      id: "TipoConfeccion",
      label: "Confección",
      value: state.NroConfTipo,
      mapeo: (
        <>
          <option></option>
          {state.tipopresup.map(option => (
            <option key={option.NroConfTipo} value={option.PresupConfTipoDesc}>
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
      <Grid item container spacing={3} xs>
        {textdata.map(data => (
          <TextField
            id={data.id}
            key={data.id}
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
