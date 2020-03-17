import request from "superagent";
import {
  TextField,
  Dialog,
  Container,
  InputAdornment
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import { stkrubroleecodgryrb } from "../../Stock/Rubros/StkRubroLeeCodGryRb";
import useStyles from "./StkMovEntradaStyle";
import Paper from "@material-ui/core/Paper";
var initial_state = {
  stkitemsele: [],
  StkItemsFAct: "",
  StkItemsMin: null,
  StkItemsMax: null,
  StkItemsCantDisp: 0,
  StkRubroAncho: 0,
  cantidad: 1
};

function StkMovEntradaDatRubros(props) {
  var [state, setState] = useState(initial_state);

  var datoseleg = Object.values(props);
  const [GrupoEleg1, RubroEleg1] = datoseleg;

  async function stkrubroleercodgryrb(GrupoEleg1, RubroEleg1) {
    const result = await stkrubroleecodgryrb(GrupoEleg1, RubroEleg1);
    console.log(result);

    setState(state => ({
      ...state,
      StkRubroAncho: result[0].StkRubroAncho,
      StkRubroPresDes: result[0].StkRubroPresDes,
      StkRubroPres: result[0].StkRubroPres,
      StkRubroUM: result[0].StkRubroUM
      // StkItemsMax: result[0].StkItemsMax
    }));
  }

  useEffect(() => {
    stkrubroleercodgryrb(GrupoEleg1, RubroEleg1);
  }, [RubroEleg1]);

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };
  const classes = useStyles();
  return (
    <div className={classes.root1}>
      <Grid item container spacing={10} direction="column">
        {/* <Grid item container xs={12} spacing={2}> */}
        {/* <Grid item container direction="column" justify="center" xs={12} spacing={2}> */}
        {!!RubroEleg1 && (
          <Grid item container spacing={10}>
            <Grid
              item
              container
              xs={8}
              spacing={10}
              alignItems="center"
              direction="column"
            >
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="cantidad"
                  label="Cantidad"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={state.cantidad}
                  autoFocus={true}
                  // disabled
                  // className={classes.textField}
                />
              </Grid>
              {/* <Grid item xs={8}>
                <TextField
                  size="small"
                  // variant="outlined"
                  id="StkRubroPresDes"
                  //  label="Presentación"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  value={state.StkRubroPresDes}
                  disabled
                />
              </Grid> */}

              <Grid item xs={10}>
                <TextField
                  size="small"
                  // variant="outlined"
                  id="StkRubroPres"
                  // label="Pres"

                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={state.StkRubroPres}
                  onChange={handleChange}
                  autoFocus={true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {state.StkRubroPresDes + "de :"}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="StkRubroUM"
                  label="Unidad Medidas"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  value={state.StkRubroUM}
                  disabled
                />
              </Grid> */}
              <Grid item xs={8}>
                <TextField
                  size="small"
                  // variant="outlined"
                  id="StkRubroAncho"
                  label="Ancho"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={state.StkRubroAncho}
                  onChange={handleChange}
                  autoFocus={true}
                  // disabled
                  // className={classes.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        {state.StkRubroUM + " x "}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        {/* </Grid>
        </Grid> */}
      </Grid>
    </div>
  );
}
export default StkMovEntradaDatRubros;
