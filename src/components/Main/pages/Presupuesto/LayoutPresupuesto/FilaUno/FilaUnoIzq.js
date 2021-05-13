import React, { useEffect } from "react";
import {

  Grid,

  TextField,
} from "@material-ui/core";

import leePresupConfTipoLeerDesc from "../../leePresupConfTipoLeerDesc"
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
// import { stat } from "fs";

export default function FilaUnoIzq() {
  const [selectedValue, setSelectedValue] = React.useState("");
  const { state, setState } = useContext(PresupPantContext);
  // this.state = {
  //   value: { DescripPresup: '' },
  // };

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
    setState({ ...state, DescripPresup: '' });
    const result = await leePresupConfTipoLeeAnexo(anexo);
    setState({ ...state, tipopresup: result });
  }

  useEffect(() => {

    setState({ ...state, DescripPresup: '' });
    if (state.tipopresup.length === 0) {
      var anexo = 'N'
      conftipoleer(anexo)
    }
  }, [state.tipopresup]); // eslint-disable-line react-hooks/exhaustive-deps


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

      <Grid item >
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
