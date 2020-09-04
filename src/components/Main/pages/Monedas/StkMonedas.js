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
import { columns } from "./StkTableColumnsMonedas";

import SelecCampos from "../Impresion/SelecCampos";

import { HeaderTitle } from "../../../lib/HeaderTitle";
import { localization } from "../../../lib/material-table/localization";

function Monedas() {
  HeaderTitle("Monedas");
  const [data, setData] = useState(initial_state);
  // const [monedas, setData] = useState();

  async function initialFetch() {
    const monedas = await leerMonedas();
    setData(monedas);
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
            borrarMonedas(oldData.idStkMonedas);
            initialFetch();
          }
          resolve();
        }, 1000);
      });
  }

  useEffect(() => {
    initialFetch();
    console.log("dentro de useEffect");
  }, []);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        localization={localization}
        title="ABM DE Monedas"
        columns={columns}
        data={data}
        // options={{ addRowPosition: "first" }}
        options={{
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          // tableLayout: "fixed",
        }}
        editable={{
          onRowAdd: onRowAdd(),
          onRowUpdate: onRowUpdate(),
          onRowDelete: onRowDelete(),
        }}
      />

      <SelecCampos headerTabla={columns} />
    </div>
  );
}

export default withStyles(styles)(Monedas);
