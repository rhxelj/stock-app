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
// import StkMovEntradaDatItems from "./StkMovEntradaDatItems";
import { initial_state } from "./Initial_State";
//

export default function Fila2(props) {
  var [state, setState] = useState(initial_state);
  var [dialog, setDialog] = useState(true);

  const handleChange = event => {
    const id = event.target.id;
    console.log("Nombre de evento lanzado usando id:", id);
    console.log("Nombre de evento lanzado usando [id]:", [id]);
    setState({ ...state, [id]: event.target.value }); //Todo revisar !!!!!!!!
    // setState({ ...state, id: event.target.value });
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

  const classes = useStyles();

  return (
    <>
      <Grid container item spacing={6} xs={6}>
        {/* Cantidad Disponible */}
        <Grid item xs={6}>
          <TextField
            size="small"
            variant="outlined"
            id="CantDisp"
            label="Cantidad Disponible"
            value={state.StkItemsCantDisp}
            style={
              state.StkItemsCantDisp < state.StkItemsMin
                ? { background: "#f92c19" }
                : { background: "#00e676" }
            }
            // fullWidth={true}
            disabled
            // className={classes.textField}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Cantidad</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Minimo Stock</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Maximo Stock</Paper>
        </Grid>
      </Grid>
    </>
  );
}
