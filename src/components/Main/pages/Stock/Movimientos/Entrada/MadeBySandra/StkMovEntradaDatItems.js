import request from "superagent";
import { Grid, TextField, Dialog, Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { stkitemsleecodgrrbit } from "../../Stock/Items/StkItemsLeeCodGrRbIt";
import useStyles from "../StkMovEntradaStyle";
var initial_state = {
  stkitemsele: [],
  StkItemsFAct: "",
  StkItemsMin: null,
  StkItemsMax: null,
  StkItemsCantDisp: 0,
  StkItemsCantidad: 0
};

function StkMovEntradaDatItems(props) {
  var [state, setState] = useState(initial_state);

  var datoseleg = Object.values(props);
  const [GrupoEleg1, RubroEleg1, ItemEleg1] = datoseleg;

  async function stkitemsleercodgrrbit(GrupoEleg1, RubroEleg1, ItemEleg1) {
    const result = await stkitemsleecodgrrbit(
      GrupoEleg1,
      RubroEleg1,
      ItemEleg1
    );
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
    stkitemsleercodgrrbit(GrupoEleg1, RubroEleg1, ItemEleg1);
  }, [ItemEleg1]);

  const classes = useStyles();
  return (
    <div className={classes.root1}>
      <Grid item container spacing={1} direction="row">
        {!!ItemEleg1 && (
          <Grid item container spacing={3}>
            <Grid
              item
              container
              xs={8}
              spacing={10}
              alignItems="center"
              direction="row"
            >
              <Grid item xs={8}>
                <TextField
                  size="small"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  id="FechaAct"
                  label="Fecha Actualización"
                  value={state.StkItemsFAct.substr(0, 10)}
                  disabled
                  className={classes.textField}
                />
              </Grid>

              <Grid item xs={8}>
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

              <Grid item xs={8}>
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
                  disabled
                />
              </Grid>

              <Grid item xs={8}>
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
              <Grid item xs={8}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="MaxStock"
                  label="Máximo Stock"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={state.StkItemsMax}
                  disabled
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
export default StkMovEntradaDatItems;
