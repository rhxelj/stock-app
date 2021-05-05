import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField, InputAdornment } from "@material-ui/core";
import { stkrubroleecodgryrb } from "../../../Rubros/StkRubroLeeCodGryRb";

//Necesario para CONTEXTAPI
import { useContext } from "react";
import { StkMovEntradaContext } from "../StkMovEntrada";

export default function Fila() {
  // Esto es para poder consumir los datos del CONTEXAPI
  const { state, setState } = useContext(StkMovEntradaContext);
  var result = []

  async function stkrubroleercodgryrb(GrupoEleg, RubroEleg) {
    result = await stkrubroleecodgryrb(GrupoEleg, RubroEleg);
    setTimeout(() => {
      setState(state => ({
        ...state,
        StkRubroAncho: result[0].StkRubroAncho,
        StkRubroPresDes: result[0].StkRubroPresDes,
        StkRubroPres: result[0].StkRubroPres,
        StkRubroUM: result[0].StkRubroUM
      }));

    }, 600);
  }

  useEffect(() => {
    stkrubroleercodgryrb(state.idStkGrupo, state.idStkRubro);

  }, [state.idStkRubro]); // eslint-disable-line react-hooks/exhaustive-deps



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
            // autoFocus={true}
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
            // autoFocus={true}
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
            // autoFocus={true}
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
