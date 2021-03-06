import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { TextField, InputAdornment } from "@material-ui/core";
import { stkrubroleecodgryrb } from "../../../Stock/Rubros/StkRubroLeeCodGryRb";

//Necesario para CONTEXTAPI
import { useContext } from "react";
import { StkMovEntradaContex } from "../StkMovEntrada";

var initial_state = {
  stkitemsele: [],
  StkItemsFAct: "",
  StkItemsMin: null,
  StkItemsMax: null,
  StkItemsCantDisp: 0,
  StkRubroAncho: 0,
  cantidad: 1
};

export default function Fila() {
  const classes = useStyles();

  var [state, setState] = useState(initial_state);

  // Esto es para poder consumir los datos del CONTEXAPI
  const value = useContext(StkMovEntradaContex);

  async function stkrubroleercodgryrb(GrupoEleg, RubroEleg) {
    const result = await stkrubroleecodgryrb(GrupoEleg, RubroEleg);
    setState(state => ({
      ...state,
      StkRubroAncho: result[0].StkRubroAncho,
      StkRubroPresDes: result[0].StkRubroPresDes,
      StkRubroPres: result[0].StkRubroPres,
      StkRubroUM: result[0].StkRubroUM
    }));
  }

  useEffect(() => {
    stkrubroleercodgryrb(value.data.idStkGrupo, value.data.idStkRubro);
  }, [value.data.idStkRubro]);

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  return (
    <>
      <Grid container item justify="space-between" spacing={2}>
        <Grid item xs>
          <TextField
            size="small"
            id="cantidad"
            label="Cantidad"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.cantidad}
            autoFocus={true}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="StkRubroPres"
            label=" "
            size="small"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={state.StkRubroPresDes}
            autoFocus={true}
            InputProps={{
              endAdornment: <InputAdornment position="end">de :</InputAdornment>
            }}
            disabled
          />
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            // variant="outlined"
            id="StkRubroPres"
            label="Presentación"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.StkRubroPres}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            // variant="outlined"
            id="StkRubroUM"
            label="Unidad Medidas"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={state.StkRubroUM}
            InputProps={{
              endAdornment: <InputAdornment position="end"> X </InputAdornment>
            }}
            disabled
          />
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            id="StkRubroAncho"
            label="Ancho"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.StkRubroAncho}
            onChange={handleChange}
            autoFocus={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">de ancho</InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
