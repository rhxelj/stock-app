import React, { useState, useEffect } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
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
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"
import leePresupConfTipoLeerDesc from "../../leePresupConfTipoLeerDesc"

export default function FilaAnexos(props) {
  console.log('esta en fila anexos')
  const { state, setState } = useContext(PresupPantContext);
  const [selectedValue, setSelectedValue] = React.useState("");

  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  //   setState({ ...state, PresupConfTipoDesc: event.target.value });
  // };

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
    if (id === "AnexoEleg") {
      setState({ ...state, LabelMed: event.target.value })
      var descripcion = event.target.value
      leerdesc(descripcion)
    }
  };

  async function leerdesc(descripcion) {
    const result = await leePresupConfTipoLeerDesc(descripcion);
    setState({ ...state, DatosPresupEleg: result });
    console.log('result en flanexos ', result)
  }


  const classes = useStyles();

  async function conftipoleer(anexo) {
    const result = await leePresupConfTipoLeeAnexo(anexo);
    setState({ ...state, tipoanexo: result });
  }


  useEffect(() => {
    if (state.tipoanexo.length === 0) {
      var anexo = 'S'
      conftipoleer(anexo);
    }
  }, [state.tipoanexo]);

  const textdata = [
    {
      id: "AnexoEleg",
      label: "Anexos",
      value: state.idPresupConfTipo,
      mapeo: (
        <>
          <option></option>
          {state.tipoanexo.map((option) => (
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

      {/* <Grid container item direction="column" spacing={3} xs={6}> */}
      {/* <Grid container xs={12}> */}
      {/* <Grid container direction="row"> */}
      {/* <Grid item spacing={3} xs={12}> */}
      <Grid item xs={4}>
        {/* <Grid item spacing={3} xs> */}
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
            disabled={props.disable}
          >
            {data.mapeo}
          </TextField>
        ))}
      </Grid>
      <Grid item xs={4}>
        <TextField
          // disabled={props.disable}
          inputProps={{ maxlength: 3 }}
          size="small"
          variant="outlined"
          id="AnexoLargo"
          type="number"
          label={state.LabelMed}
          fullWidth
          value={state.AnexoLargo}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={4}>
        {console.log(state.LabelMed)}
        <TextField
          // disabled={props.disable}

          inputProps={{ maxlength: 3 }}
          size="small"
          variant="outlined"
          id="AnexoLargo"
          type="number"
          // label={'state.LabelMed'}
          label={state.LabelMed}
          defaultValue={state.LabelMed}
          fullWidth
          value={state.AnexoLargo}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      {/* </Grid> */}
    </>
  );
}
