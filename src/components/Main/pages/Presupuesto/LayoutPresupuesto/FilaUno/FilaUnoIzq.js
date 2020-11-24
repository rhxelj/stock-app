import React, { useEffect } from "react";
import {

  Grid,

  TextField,
} from "@material-ui/core";
import useStyles from "../styles";

import leePresupConfTipoLeerDesc from "../../leePresupConfTipoLeerDesc"
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { stat } from "fs";

export default function FilaUnoIzq(props) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const { state, setState } = useContext(PresupPantContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    var descripcion = event.target.value
    setState({ ...state, PresupConfTipoDesc: event.target.value });
    leerdesc(descripcion)
  };

  async function leerdesc(descripcion) {
    const result = await leePresupConfTipoLeerDesc(descripcion);
    setState({ ...state, DatosPresupEleg: result });

  }

  async function conftipoleer(anexo) {
    const result = await leePresupConfTipoLeeAnexo(anexo);
    setState({ ...state, tipopresup: result });
  }

  useEffect(() => {
    if (state.tipopresup.length === 0) {
      var anexo = 'N'
      conftipoleer(anexo)
    }
  }, [state.tipopresup]);

  const classes = useStyles();

  const textdata = [
    {
      id: "TipoConfeccion",
      label: "Confección",
      value: state.NroConfTipo,
      mapeo: (
        <>
          <option></option>
          {state.tipopresup.map(option => (
            <option key={option.NroConfTipo} value={option.PresupConfTipoDesc}>
              {option.PresupConfTipoDesc}
            </option>
          ))}
        </>
      ),
    },
  ];
  return (
    <>
      {/* <Grid container item spacing={3} xs={6}> */}
      {/* <Grid item container spacing={3} xs={12}> */}
      <Grid item xs={1}>
        {textdata.map(data => (
          <TextField
            id={data.id}
            key={data.id}
            size="small"
            select
            label={data.label}
            margin="dense"
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
          >
            {data.mapeo}
          </TextField>
        ))}
      </Grid>
    </>
  );
}