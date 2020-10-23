import React, { Fragment, useState, useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

import { TextField } from "@material-ui/core";

import { stkgrupoleerred } from "../../../../../Stock/Grupos/StkGrupoLeerRed";
import { stkrubroleecodgrupored } from "../../../../Rubros/StkRubroLeeCodGrupoRed";
import { stkitemsleecodgryrb } from "../../../../Items/StkItemsLeeCodGryRb";

// Context
import { useContext } from "react";
import { StkMovEntradaContext } from "../../StkMovEntrada";
import { initial_state } from "../../Initial_State";

export default function F2C1(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(StkMovEntradaContext);

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
    //  dispatch({type: event.target.id})
  };

  async function stkgrupoleer() {
    const result = await stkgrupoleerred();
    setState({ ...state, stkgrupo: result });
  }

  async function stkrubroleercodgrupo(codigogrupo) {
    const result = await stkrubroleecodgrupored(codigogrupo);
    setState({ ...state, stkrubro: result });
  }

  async function stkitemsleercodgryrb(codigogrupo, codigorubro) {
    const result = await stkitemsleecodgryrb(codigogrupo, codigorubro);
    setState({ ...state, stkitems: result });
  }
  // function reducer(stater, action){
  //   switch (action.type) {
  //     case 'idStkGrupo':
  //       stkrubroleercodgrupo(state.idStkGrupo)
  //       return console.log ('idStkGrupo');
  //     case 'idStkRubro':
  //       stkitemsleercodgryrb(state.idStkGrupo, state.idStkRubro);
  //       return console.log ('idStkRubro');

  //     default:
  //       return console.log ('estaria dando error');
  //   }
  // }

  useEffect(() => {
    if (state.idStkGrupo === "") {
      stkgrupoleer();
    }
    if (state.idStkGrupo != "") {
      stkrubroleercodgrupo(state.idStkGrupo);
    }

  }, [state.idStkGrupo]);

  // useEffect(() => {

  //   stkrubroleercodgrupo(state.idStkGrupo); //leo rubros apartir del grupo seleccionado
  // }, [state.idStkGrupo]);

  useEffect(() => {
    // setState({...state, idStkItems : ''})
    stkitemsleercodgryrb(state.idStkGrupo, state.idStkRubro); //leo rubros apartir del grupo seleccionado
  }, [state.idStkRubro]);

  useEffect(() => {
    console.log('state.stkitems.length   ', state.stkitems.length)
    console.log('')
    if (state.stkitems.length === 1) {
      setState({ ...state, idStkItems: "1" });
    } else {
      setState({ ...state, idStkItems: "" });
    }
  }, [state.stkitems]);
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
              autoFocus={data.id == "idStkGrupo" && true}
            >
              {data.mapeo}
            </TextField>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
