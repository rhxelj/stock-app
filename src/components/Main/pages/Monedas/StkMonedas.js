import React, { Component, useState, useEffect } from "react";

import { leerMonedas } from "./StkMonedasLeer";
import { agregarMonedas } from "./StkMonedasAgregar";
import { borrarMonedas } from "./StkMonedasBorrar";
import { modificarMonedas } from "./StkMonedasModificar";

import { withStyles } from "@material-ui/core/styles";
import "../../../../Styles/TableHeader.css";

import MaterialTable from "material-table";
import {
  style,
  styles,
  CustomTableCell,
  initial_state,
  initial_open,
} from "./Constants";
import { tableIcons } from "./Constants";
import { columns } from "./StkTableColumnsMonedas";

// import SelecCampos from "../Impresion/Imprimir/SelecCampos";
import Imprimir from "../Impresion/Imprimir/Imprimir";

import { HeaderTitle } from "../../../lib/HeaderTitle";
import { localization } from "../../../lib/material-table/localization";

// import Imprimir from "../Impresion/Imprimir/indexwww";

import { useContext } from "react";
import { globalContext } from "../../../App";

function Monedas() {
  HeaderTitle("Monedas");
  const [data, setData] = useState(initial_state);
  const [open, setOpen] = useState(initial_open);
  // const { valor, setValor } = useContext(globalContext);

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

  function toggleImprimir() {
    // setOpen({ imprimir: !open.imprimir });
    // setValor((valor) => ({ ...valor, openImp: !valor.openImp }));
  }
  function Imp(columns, data) {
    return <h1>HOLA</h1>;
    // <Imprimir
    //   // open={open.imprimir} //boolean
    //   open={true}
    //   setOpen={setOpen}
    //   columnas={columns}
    //   datos={data}
    // />
  }
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
          exportButton: true,
          exportCsv: (columns, data) => {
            // toggleImprimir();
            // Imp(columns, data);
            // Imprimir(open, columns);
            // {
            //   <Imprimir
            //     open={open.imprimir} //boolean
            //     setOpen={setOpen}
            //     columnas={columns}
            //     datos={data}
            //   />;
            // }
            // console.log("columns : ", columns);
            // console.log("data : ", data);
          },

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

      {/* <button onClick={toggleImprimir}>IMPRIMIR</button> */}
      <button onClick={() => setOpen({ imprimir: true })}>IMPRIMIR</button>
      {/* <SelecCampos columns={columns} open={open.imprimir} setOpen={setOpen} /> */}
      <Imprimir
        columns={columns}
        open={open.imprimir}
        setOpen={setOpen}
        datos={data}
      />

      {/* {toggleImprimir && <Imprimir
      //   // open={open.imprimir} //boolean
        open={true}
        setOpen={setOpen}
        columnas={columns}
        datos={data}
      />} */}
    </div>
  );
}

export default withStyles(styles)(Monedas);
