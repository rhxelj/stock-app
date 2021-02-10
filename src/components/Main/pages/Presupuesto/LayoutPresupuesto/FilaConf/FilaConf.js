import React, { useState, useEffect } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Dialog, Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"

export default function FilaConf(props) {
  const [selectedValue, setSelectedValue] = React.useState("cs");
  const { state, setState } = useContext(PresupPantContext);
  const [ojalbronce, setOjalBronce] = React.useState('hz');



  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupCsSs: event.target.value });
  };

  const handleChange1 = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });

  };


  const handleChange2 = (event) => {
    setOjalBronce(event.target.value);
    setState({ ...state, PresupOB: event.target.value });
  };
  const classes = useStyles();



  return (
    <>
      {/* <Grid container item xs={12}> */}
      {/* <Grid container item direction="row" xs={12}> */}
      {/* <Grid item spacing={3} xs={2}> */}
      {/* <Grid container item xs={12}> */}
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="tipoDobladillo"
          value={selectedValue}
          onChange={handleChange}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="cs"
            control={<Radio />}
            label="C/S"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="ss"
            control={<Radio />}
            label="S/S"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
      </Grid>
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="tipoOjal"
          value={ojalbronce}
          onChange={handleChange2}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="hz"
            control={<Radio />}
            label="HZ"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="br"
            control={<Radio />}
            label="BR"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
      </Grid>

      <Grid item xs={3}>
        <TextField
          inputProps={{ maxLength: 12 }}
          size="small"
          variant="outlined"
          id="DescripPresup"
          margin="dense"
          label="Descripción"
          fullWidth
          value={state.DescripPresup}
          onChange={handleChange1}
          className={classes.textField}
        />
      </Grid>
    </>
  );
}
