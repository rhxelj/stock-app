import React, { Component, useState, useEffect } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";

import { leerMonedas } from "./StkMonedasLeer";
import { addMoneda } from "./StkMonedasAgregar";
import { borrarMonedas } from "./StkMonedasBorrar";
import StkMonedasModificar from "./StkMonedasModificar";

import { withStyles } from "@material-ui/core/styles";
import "../../../../Styles/TableHeader.css";

import MaterialTable from "material-table";
import { style, styles, CustomTableCell, initial_state } from "./Constants";
import { tableIcons } from "./Constants";

function Monedas() {
  const [state, setState] = useState(initial_state);

  async function initialFetch() {
    const monedas = await leerMonedas();
    setState({ ...state, monedas: monedas });
  }

  const classes = styles;

  function onRowAdd() {
    return (newData) =>
      new Promise((resolve, reject) => {
        const moneda = newData;
        setState({ ...state, moneda });
        resolve();
      }, 1000);
  }

  function onRowUpdate() {
    return (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            console.log("newData", newData);
            console.log("oldData", oldData);
            // alert("modifico la fila");
            // const data = state.data;
            // const index = data.indexOf(oldData);
            // data[index] = newData;
            // setState({ data }, () => resolve());
          }
          resolve();
        }, 1000);
      });
  }

  function onRowDelete() {
    return (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            console.log("oldData", oldData);
            borrarMonedas(oldData.idStkMonedas);
            initialFetch(); // alert("Borro la fila");
            // let data = state.data;
            // const index = data.indexOf(oldData);
            // data.splice(index, 1);
            // setState({ data }, () => resolve());
          }
          resolve();
        }, 1000);
      });
  }

  var columns = [
    {
      title: "Código",
      field: "idStkMonedas",
      order: true,
    },
    {
      title: "Descripción",
      field: "StkMonedasDescripcion",
      order: true,
    },
    {
      title: "Cotización",
      field: "StkMonedasCotizacion",
      order: true,
    },
  ];

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    if (state.moneda.idStkMonedas != "") {
      addMoneda(state.moneda);
      initialFetch();
    }
  }, [state.moneda.idStkMonedas]);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="ABM DE Monedas"
        columns={columns}
        data={state.monedas}
        options={{ addRowPosition: "first" }}
        editable={{
          onRowAdd: onRowAdd(),
          onRowUpdate: onRowUpdate(),
          onRowDelete: onRowDelete(),
        }}
      />
    </div>
  );
}

export default withStyles(styles)(Monedas);
