import React, { useState, useEffect } from "react";
import ubicacion from "../../UbicacionGeografica";
import { stkubfisicaleerUbG } from "../../../../Stock/UbicacionFisica/StkUbFisicaUG";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

var initial_state = {
  StkEnvasePartida: "",
  StkEnvaseUbG: "",
  StkEnvaseUbF: "",
  StkEnvaseObserv: "",
  stkenvaseubfisica: []
};
export default function FilaCuatro() {
  var [state, setState] = useState(initial_state);
  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function stkubfisicaubgeo(codigoUbG) {
    const result = await stkubfisicaleerUbG(codigoUbG);
    setState({ ...state, stkenvaseubfisica: result });
  }

  useEffect(() => {
    stkubfisicaubgeo(state.StkEnvaseUbG);
  }, [state.StkEnvaseUbG]);

  const classes = useStyles();
  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs>
          <TextField
            size="small"
            variant="outlined"
            id="StkEnvasePartida"
            type="text"
            label="Partida"
            fullWidth
            value={state.StkEnvasePartida}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            variant="outlined"
            id="StkEnvaseUbG"
            select
            label="Ubicación Geografica"
            fullWidth
            value={state.StkEnvaseUbG}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            autoFocus={true}
            className={classes.textField_150}
            InputLabelProps={{ shrink: true }}
          >
            <option></option>

            {ubicacion.map(option => (
              <option key={option.indiceub} value={option.indiceub}>
                {option.detalleub}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            variant="outlined"
            id="StkEnvaseUbF"
            select
            label="Ubicación Física"
            fullWidth
            value={state.StkEnvaseUbF}
            onChange={handleChange}
            SelectProps={{
              native: true
            }}
            autoFocus={true}
            className={classes.textField_150}
          >
            <option></option>
            {state.stkenvaseubfisica.map(option => (
              <option key={option.idStkUbFisica} value={option.idStkUbFisica}>
                {option.idStkUbFisica}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            variant="outlined"
            id="StkEnvaseObserv"
            type="text"
            label="Observación"
            fullWidth
            value={state.StkEnvaseObserv}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>
      </Grid>
    </>
  );
}
