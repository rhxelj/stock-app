import React, { useEffect, useState } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
import "react-table/react-table.css";

// Para MaterialTable
import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

//*****

import { columns } from "./StkUbFisica_Columns"
import { StkUbFisica_Data } from "./StkUbFisica_Data"

import { onRowAdd } from "./onRowAdd"
// import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import StkUbFisicaAgregar from "./StkUbFisicaAgregar";
import StkUbFisicaBorrar from "./StkUbFisicaBorrar";

import IpServidor from "../../VariablesDeEntorno";
// import StkFab from "../../../../lib/StkFab";

// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import { withStyles } from "@material-ui/core/styles";
// import "../../../../../Styles/TableHeader.css";

import { HeaderTitle } from "../../../../lib/HeaderTitle"

export default function StkUbFisica() {


  HeaderTitle("Ubicacion Fisica")

  // const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);


  // async function columnsFetch() {
  //   const col = await llenarColumns();
  //   setColumns(() => col)
  // }

  async function dataFetch() {
    const data = await StkUbFisica_Data();
    setData(data);
  }

  async function initialFetch() {

    // columnsFetch()
    dataFetch();
  }

  useEffect(() => {
    initialFetch()
  }, []);

  return (
    <div>
      <MaterialTable
        title=""
        columns={columns}
        data={data}
        icons={tableIcons}
        localization={localization}

        options={{
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          // tableLayout: "fixed", //con esta opcion entran todas las columnas en la pantalla pero superpone informacion
        }}

        editable={{
          onRowAdd: newData =>
            onRowAdd(newData).then(() => dataFetch()),
          // onRowUpdate: (newData, oldData) =>
          //   onRowUpdate(newData, oldData).then(() => dataFetch()),
          onRowDelete: oldData =>
            onRowDelete(oldData).then(() => dataFetch()),
        }}
      />
    </div>
  );
}
