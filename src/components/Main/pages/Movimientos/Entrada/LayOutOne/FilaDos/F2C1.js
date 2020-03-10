import React, { Fragment, useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // Grid,
  IconButton,
  InputAdornment,
  // Paper,
  TextField,
  Typography
} from "@material-ui/core";

import { stkgrupolee } from "../../../../Stock/Grupos/StkGrupoLee";
import { stkrubroleecodgrupo } from "../../../../Stock/Rubros/StkRubroLeeCodGrupo";
import { stkitemsleecodgryrb } from "../../../../Stock/Items/StkItemsLeeCodGryRb";
import { stkitemsleecodgrrbit } from "../../../../Stock/Items/StkItemsLeeCodGrRbIt";

import { initial_state } from "./Initial_State";
// import StkMovEntradaDatItems from "./StkMovEntradaDatItems";

// Context
import { useContext } from "react";
import { StkMovEntradaContex } from "../../StkMovEntrada";

export default function F2C1(props) {
  var [state, setState] = useState(initial_state);

  // Esto es para poder consumir los datos del CONTEXAPI
  const value = useContext(StkMovEntradaContex);

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function stkgrupoleer() {
    const result = await stkgrupolee();
    setState({ ...state, stkgrupo: result });
  }

  async function stkrubroleercodgrupo(codigogrupo) {
    const result = await stkrubroleecodgrupo(codigogrupo);
    setState({ ...state, stkrubro: result });
  }

  async function stkitemsleercodgryrb(codigogrupo, codigorubro) {
    const result = await stkitemsleecodgryrb(codigogrupo, codigorubro);
    setState({ ...state, stkitems: result });
  }

  useEffect(() => {
    stkgrupoleer();
  }, []);
  useEffect(() => {
    stkrubroleercodgrupo(state.idStkGrupo); //leo rubros apartir del grupo seleccionado
  }, [state.idStkGrupo]);

  useEffect(() => {
    stkitemsleercodgryrb(state.idStkGrupo, state.idStkRubro); //leo rubros apartir del grupo seleccionado
  }, [state.idStkRubro]);

  useEffect(() => {
    if (!!state.idStkItems) {
      value.setGRI({
        idStkGrupo: state.idStkGrupo,
        idStkRubro: state.idStkRubro,
        idStkItems: state.idStkItems
      });
    }
  }, [state.idStkItems]);

  const classes = useStyles();

  return (
    <>
      <Grid container item direction="column" spacing={3} xs={6}>
        {/* Grupo */}
        <Grid item xs>
          <TextField
            id="idStkGrupo"
            size="small"
            select
            label="Grupo"
            fullWidth
            value={state.idStkGrupo} //todo mirar que valor poner puse este de forma arbitraria para ver si borra
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
            // ilaDos
          >
            <option></option>
            {/* {console.log("state.stkgrupo dentro de option :", state.stkgrupo)} */}
            {state.stkgrupo.map(option => (
              <option key={option.idStkGrupo} value={option.idStkGrupo}>
                {option.StkGrupoDesc}
              </option>
            ))}
          </TextField>
        </Grid>

        {/* Rubro */}
        <Grid item xs>
          <TextField
            size="small"
            variant="outlined"
            id="idStkRubro"
            select
            label="Rubro"
            fullWidth
            value={state.idStkRubro} //todo mirar idem grupo
            // onChange={() => handleChangeRubro("idStkRubro")}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            autoFocus={true}
            // className={classes.textField_150}
          >
            <option></option>
            {state.stkrubro.map(option => (
              <option key={option.idStkRubro} value={option.idStkRubro}>
                {option.StkRubroDesc}
              </option>
            ))}
          </TextField>
        </Grid>

        {/* Items */}
        <Grid item xs>
          {/* <Paper className={classes.paper}>Items</Paper> */}
          <TextField
            id="idStkItems"
            size="small"
            variant="outlined"
            select
            label="Items"
            fullWidth
            value={state.idStkItems} //todo idem grupo
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            autoFocus={true}
            // className={classes.textField_150}
          >
            <option></option>
            {state.stkitems.map(option => (
              <option key={option.idStkItems} value={option.idStkItems}>
                {option.StkItemsDesc}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
}
