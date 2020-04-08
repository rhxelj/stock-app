import React, { Component, useState, useEffect } from "react";

import { leerMonedas } from "./StkMonedasLeer";
import { agregarMonedas } from "./StkMonedasAgregar";
import { borrarMonedas } from "./StkMonedasBorrar";
import { modificarMonedas } from "./StkMonedasModificar";

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

  function onRowAdd() {
    return (newData) =>
      new Promise((resolve, reject) => {
        agregarMonedas(newData);
        initialFetch();
        resolve();
      }, 1000);
  }

  function onRowUpdate() {
    return (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            modificarMonedas(newData);
            initialFetch();
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
            initialFetch();
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
      type: "currency",
      order: true,
    },
  ];

  useEffect(() => {
    initialFetch();
  }, []);

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
