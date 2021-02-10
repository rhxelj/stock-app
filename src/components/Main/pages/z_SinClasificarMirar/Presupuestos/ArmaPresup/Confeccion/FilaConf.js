import React, { useState, useEffect } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupuestosContext } from "../../Presupuestos";
import leePresupConfTipoLeeAnexo from '../../lecturasVarias/leePresupConfTipoLeeAnexo'

export default function FilaConf(props) {
  const [selectedValue, setSelectedValue] = React.useState("cs");
  const { state, setState } = useContext(PresupuestosContext);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupCsSs: event.target.value });
  };

  const handleChange1 = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  const classes = useStyles();



  return (
    <>
      <Grid container item xs={12}>
        {/* <Grid container item direction="row" xs={12}> */}
        {/* <Grid item spacing={3} xs={12}> */}
        <RadioGroup
          row
          aria-label="Tipo de Dobladillo"
          name="tipoDobladillo"
          value={selectedValue}
          onChange={handleChange}
        >
          <Grid item xs={6}>
            <FormControlLabel
              value="cs"
              control={<Radio />}
              label="C/Soga"
              labelPlacement="top"
              disabled={props.disable}
            />
          </Grid>
          {/* <Grid item spacing={3} xs={12}> */}
          <Grid item xs={6}>
            <FormControlLabel
              value="ss"
              control={<Radio />}
              label="S/Soga"
              labelPlacement="top"
              disabled={props.disable}
            />
          </Grid>
        </RadioGroup>
        <Grid item xs={6}>
          <TextField
            inputProps={{ maxLength: 20 }}
            size="small"
            variant="outlined"
            id="DescripPresup"

            label="Descripción"
            fullWidth
            value={state.DescripPresup}
            onChange={handleChange1}
            className={classes.textField}
          />
        </Grid>
      </Grid>

    </>
  );
}
