import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { TextField, InputAdornment } from "@material-ui/core";
import { stkrubroleecodgryrb } from "../../../Rubros/StkRubroLeeCodGryRb";

//Necesario para CONTEXTAPI
import { useContext } from "react";
import { StkMovSalidaContext } from "./StkMovSalida";

import { TipoConfeccion } from "../TipoConfeccion";

export default function Fila() {
  const classes = useStyles();
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(StkMovSalidaContext);

  async function stkrubroleercodgryrb(GrupoEleg, RubroEleg) {
    const result = await stkrubroleecodgryrb(GrupoEleg, RubroEleg);
    setState((state) => ({
      ...state,
      StkRubroAncho: result[0].StkRubroAncho,
      StkRubroPresDes: result[0].StkRubroPresDes,
      StkRubroPres: result[0].StkRubroPres,
      StkRubroUM: result[0].StkRubroUM,
    }));
  }

  useEffect(() => {
    // stkrubroleercodgryrb(value.GRI.idStkGrupo, value.GRI.idStkRubro);
    stkrubroleercodgryrb(state.idStkGrupo, state.idStkRubro);
  }, [state.idStkRubro]);

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  return (
    <>
      <Grid container item xs></Grid>
      <Grid container item justify="space-between" spacing={2}>
        <Grid item xs>
          <TextField
            size="small"
            id="cantidad"
            label="Cantidad"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.cantidad}
            // autoFocus={true}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            id="largo"
            label="Largo"
            type="number"
            // fullWidth
            InputLabelProps={{ shrink: true }}
            value={state.largo}
            onChange={handleChange}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            // variant="outlined"
            id="ancho"
            label="Ancho"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.ancho}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            // id="TConfec"
            id="indice"
            select
            label="Tipo Confección"
            fullWidth
            value={state.indice} //ToDo confirmar si dejar o sacar esta propiedad
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            autoFocus={true}
          >
            <option></option>
            {TipoConfeccion.map((option) => (
              <option key={option.indice} value={option.indice}>
                {option.detalle}
              </option>
            ))}
          </TextField>
        </Grid>

        {/* <Grid item xs>
          <TextField
            size="small"
            id="StkRubroAncho" //Todo A que ancho se refiere?
            label="Ancho"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.StkRubroAncho}
            onChange={handleChange}
            // autoFocus={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">de ancho</InputAdornment>
              ),
            }}
          />
        </Grid> */}
      </Grid>
    </>
  );
}
