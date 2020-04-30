import React, { useEffect, useState } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import Grid from "@material-ui/core/Grid";
import { ProveedoresColName } from "./ProveedoresColName";

// import AgregarProveedor from './ProveedoresAgregar'
import IpServidor from "../../VariablesDeEntorno";
import ProveedoresAgregar from "./ProveedoresAgregar";
import ProveedoresBorrar from "./ProveedoresBorrar";
import ProveedoresModificar from "./ProveedoresModificar";
import StkFab from "../../../../lib/StkFab";
import SelecCampos from "../../Impresion/SelecCampos";

// para usar las tablas de MUI start
import { withStyles } from "@material-ui/core/styles";
import "../../../../../Styles/TableHeader.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { llenarColumns } from "./columns"
import { leerProveedores } from "./ProveedoresLeer";
import { onRowAdd } from "./onRowAdd"
import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";

export default function Proveedores() {
  // const [rubro, setRubro] = useState({ columns: [], data: [] });
  // const [strubromodificar, setStkrubromodificar] = useState(false);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);


  async function columnsFetch() {
    const col = await llenarColumns();
    setColumns(() => col)
  }

  async function dataFetch() {
    const data = await leerProveedores();
    setData(data);
  }

  async function initialFetch() {
    columnsFetch()
    dataFetch();
  }

  useEffect(() => {
    initialFetch()
  }, []);

  return (
    <div>
      <MaterialTable
        title="PROVEEDORES"
        icons={tableIcons}
        columns={columns}
        data={data}

        editable={{
          onRowAdd: newData =>
            onRowAdd(newData),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    </div>
  );
}


