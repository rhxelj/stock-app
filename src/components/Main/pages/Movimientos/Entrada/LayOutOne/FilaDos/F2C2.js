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
// import { initial_state } from "./Initial_State";
//

var initial_state = {
  stkitemsele: [],
  StkItemsFAct: "",
  StkItemsMin: null,
  StkItemsMax: null,
  StkItemsCantDisp: 0,
  StkItemsCantidad: 0
};

export default function F2C2(props) {
  var [state, setState] = useState(initial_state);

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function stkitemsleercodgrrbit(GrupoEleg, RubroEleg, ItemEleg) {
    const result = await stkitemsleecodgrrbit(GrupoEleg, RubroEleg, ItemEleg);
    setState(state => ({
      ...state,
      StkItemsCantidad: result[0].StkItemsCantidad,
      StkItemsCantDisp: result[0].StkItemsCantDisp,
      StkItemsFAct: result[0].StkItemsFAct,
      StkItemsMin: result[0].StkItemsMin,
      StkItemsMax: result[0].StkItemsMax
    }));
  }

  useEffect(() => {
    stkitemsleercodgrrbit(
      props.data.idStkGrupo,
      props.data.idStkRubro,
      props.data.idStkItems
    );
  }, [props.data]);

  const classes = useStyles();

  return (
    <>
      <Grid container alignItems="center" item spacing={6} xs={6}>
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
          <TextField
            size="small"
            variant="outlined"
            id="Cantidad"
            label="Cantidad Real"
            InputLabelProps={{ shrink: true }}
            value={state.StkItemsCantidad}
            disabled
            // className={classes.textField}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}>Minimo Stock</Paper> */}
          <TextField
            size="small"
            variant="outlined"
            id="MinStock"
            label="Mínimo Stock"
            InputLabelProps={{ shrink: true }}
            value={state.StkItemsMin}
            disabled
            // className={classes.textField}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}>Maximo Stock</Paper> */}
          <TextField
            size="small"
            variant="outlined"
            id="MaxStock"
            label="Máximo Stock"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.StkItemsMax}
            disabled
          />
        </Grid>
      </Grid>
    </>
  );
}