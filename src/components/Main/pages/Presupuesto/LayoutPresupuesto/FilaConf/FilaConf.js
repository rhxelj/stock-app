import React, { useState, useEffect } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"

export default function FilaConf(props) {
  const [selectedValue, setSelectedValue] = React.useState("cs");
  const { state, setState } = useContext(PresupPantContext);
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
        {/* <Grid item spacing={3} xs={2}> */}
        {/* <Grid item xs> */}
        <RadioGroup
          row
          size="small"
          // aria-label="Tipo de Dobladillo"
          name="tipoDobladillo"
          value={selectedValue}
          onChange={handleChange}
          margin="dense"
        >

          <Grid item xs={3}>
            <FormControlLabel
              // size="small"
              value="cs"
              control={<Radio />}
              label="C/S"
              labelPlacement="top"
              disabled={props.disable}
              margin="dense"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              // size="small"
              value="ss"
              control={<Radio />}
              label="S/S"
              labelPlacement="top"
              disabled={props.disable}
              margin="dense"
            />
          </Grid>
        </RadioGroup>
        <Grid item xs={4}>
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
      </Grid>
    </>
  );
}
