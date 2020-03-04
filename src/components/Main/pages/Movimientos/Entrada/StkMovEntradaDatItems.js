import request from "superagent";
import { Grid, TextField, Dialog } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { stkitemsleecodgrrbit } from "../../Stock/Items/StkItemsLeeCodGrRbIt";
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
  // var [GrupoEleg1, setGrupoEleg] = useState(props.GrupoEleg);
  // var [RubroEleg1, setRubroEleg] = useState(props.RubroEleg);
  // var [ItemEleg1, setItemEleg] = useState(props.ItemEleg);

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

  return (
    <div>
      <Grid container>
        {!!ItemEleg1 && (
          <Grid item xs={12} sm={8} lg={12}>
            <TextField label="HOLA" />
            <label>{state.StkItemsCantDisp}</label>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
export default StkMovEntradaDatItems;
