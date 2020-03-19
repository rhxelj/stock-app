import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

import { TextField } from "@material-ui/core";

// import { stkgrupolee } from "../../../../Stock/Grupos/StkGrupoLee";
import { stkgrupolee } from "../../../../Grupos/StkGrupoLee";
import { stkrubroleecodgrupo } from "../../../../Rubros/StkRubroLeeCodGrupo";
import { stkitemsleecodgryrb } from "../../../../Items/StkItemsLeeCodGryRb";

import { initial_state } from "./Initial_State";

// Context
import { useContext } from "react";
import { StkMovEntradaContex } from "../../StkMovEntrada";

export default function F2C1(props) {
  var [state, setState] = useState(initial_state);

  // Esto es para poder consumir los datos del CONTEXAPI
  const value = useContext(StkMovEntradaContex);

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value }); //Todo revisar !!!!!!!!
    // setState({ ...state, id: event.target.value });
  };

  async function stkgrupoleer() {
    const result = await stkgrupolee();
    setState({ ...state, stkgrupo: result });
  }

  async function stkrubroleercodgrupo(codigogrupo) {
    const result = await stkrubroleecodgrupo(codigogrupo);
    setState({ ...state, stkrubro: result });
  }

  async function stkitemsleercodgryrb(codigogrupo, codigorubro) {
    const result = await stkitemsleecodgryrb(codigogrupo, codigorubro);
    setState({ ...state, stkitems: result });
  }

  useEffect(() => {
    stkgrupoleer();
  }, []);
  useEffect(() => {
    stkrubroleercodgrupo(state.idStkGrupo); //leo rubros apartir del grupo seleccionado
  }, [state.idStkGrupo]);

  useEffect(() => {
    stkitemsleercodgryrb(state.idStkGrupo, state.idStkRubro); //leo rubros apartir del grupo seleccionado
  }, [state.idStkRubro]);

  useEffect(() => {
    if (!!state.idStkItems) {
      value.setGRI({
        idStkGrupo: state.idStkGrupo,
        idStkRubro: state.idStkRubro,
        idStkItems: state.idStkItems
      });
    }
  }, [state.idStkItems]);

  const classes = useStyles();

  const textdata = [
    {
      id: "idStkGrupo",
      label: "Grupo",
      value: state.idStkGrupo,
      mapeo: (
        <>
          <option></option>
          {state.stkgrupo.map(option => (
            <option key={option.idStkGrupo} value={option.idStkGrupo}>
              {option.StkGrupoDesc}
            </option>
          ))}
        </>
      )
    },
    {
      id: "idStkRubro",
      label: "Rubro",
      value: state.idStkRubro,
      mapeo: (
        <>
          <option></option>
          {state.stkrubro.map(option => (
            <option key={option.idStkRubro} value={option.idStkRubro}>
              {option.StkRubroDesc}
            </option>
          ))}
        </>
      )
    },
    {
      id: "idStkItems",
      label: "Items",
      value: state.idStkItems,
      mapeo: (
        <>
          <option></option>
          {state.stkitems.map(option => (
            <option key={option.idStkItems} value={option.idStkItems}>
              {option.StkItemsDesc}
            </option>
          ))}
        </>
      )
    }
  ];
  return (
    <>
      <Grid container item direction="column" spacing={3} xs={6}>
        {textdata.map(data => (
          <Grid item xs>
            <TextField
              id={data.id}
              size="small"
              select
              label={data.label}
              fullWidth
              value={data.value} //todo mirar que valor poner puse este de forma arbitraria para ver si borra
              onChange={handleChange}
              SelectProps={{ native: true }}
              variant="outlined"
            >
              {data.mapeo}
            </TextField>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
