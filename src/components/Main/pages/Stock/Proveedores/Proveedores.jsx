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
// import { leercolumns } from "./columns"
import { leerProveedores } from "./ProveedoresLeer";
import { onRowAdd } from "./onRowAdd"
import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import LeerProveedor from "../../z_SinClasificarMirar/LeerProveedor";

export default function Proveedores() {
  // const [rubro, setRubro] = useState({ columns: [], data: [] });
  // const [strubromodificar, setStkrubromodificar] = useState(false);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // Lleno columna - inicio
  async function llenarColumns() {
    // const stkgrupo = await stkGrupoLeerRedRubro();
    // var objstkgrupo = await stkgrupo.reduce(function (acc, cur, i) {
    //   acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
    //   return acc;
    // }, {});

    // const stkrubro = await stkrubroleeproveedor();
    // var objstkrubroprov = await stkrubro.reduce(function (acc, cur, i) {
    //   acc[cur.StkRubroProv] = cur.ProveedoresDesc;
    //   return acc;
    // }, {});

    // const stkUnMed = await stkUnMedLeerRed();
    // var objstkUnMed = await stkUnMed.reduce(function (acc, cur, i) {
    //   acc[cur.idStkUnMed] = cur.StkUnMedDesc;
    //   return acc;
    // }, {});

    // const stkMonedas = await stkMonedasleerRed();
    // var objstkMonedas = await stkMonedas.reduce(function (acc, cur, i) {
    //   acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
    //   return acc;
    // }, {});

    return columnsFill(
      // objstkgrupo, objstkrubroprov, objstkUnMed, objstkMonedas
    );
  }
  // Lleno columna - fin{idStkMonedas: "qaz", StkMonedasDescripcion: "DES1700"}
  // async function stkrubroleemezcla() {
  //   const result = await stkrubroleermezcla();
  //   setData(() => result);
  //   console.log("data => ", data);
  // }

  async function initialFetch() {
    const col = await llenarColumns();
    console.log("el contenido de col es  : ", col)
    setColumns(() => col)
    dataFetch();
  }

  function columnsFill(
    // objstkgrupo,
    // objstkrubroprov,
    // objstkUnMed,
    // objstkMonedas
  ) {
    return new Promise(function (resolve, reject) {
      // setColumns(

      resolve(
        [
          // { title: "idProveedores", field: "idProveedores" },
          { title: "Descripción", field: "proveedor.ProveedoresDesc" },
          { title: "Tipo", field: "ProveedoresTipo" }, //Proveedores Tipo idStkTipoProveed
          { title: "Calle", field: "ProveedoresCalle" },
          { title: "CUIT", field: "ProveedoresCUIT" },
          { title: "Calle Nro.", field: "ProveedoresNroCalle" },
          { title: "Piso", field: "ProveedoresPiso" },
          { title: "Dto", field: "ProveedoresDto" },
          { title: "CodPos", field: "ProveedoresCodPos" },
          { title: "Loc", field: "ProveedoresLoc" },
          { title: "Pcia", field: "ProveedoresPcia" },
          { title: "Tel", field: "ProveedoresTel" },
          { title: "Contacto", field: "ProveedoresContacto" },
          { title: "Mail", field: "ProveedoresMail" },
          { title: "Web", field: "ProveedoresWeb" },
          { title: "CodMon", field: "ProveedoresCodMon" },
          // {
          //   title: "CodMon",
          //   field: "ProveedoresCodMon",
          //   lookup: objstkMonedas,
          // },
        ]
      );
    })
  }

  //Read
  function read() {
    return new Promise((resolve) => {
      // const url = IpServidor + '/proveedoresleer'; //'http://192.168.2.102:4000/indexprov'
      const url = IpServidor + "/proveedoresleer";
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then((res) => {
          const proveedores = JSON.parse(res.text);
          // console.log("proveedores => ", proveedores);
          setData(proveedores);
          console.log("data => ", data);
        });
      resolve();
    });
  }

  // async function columnsFetch() {
  //   const columns = await leercolumns();
  //   console.log("Corri columns FETCH")
  //   // setColumns(columns);
  // }
  async function dataFetch() {
    const data = await leerProveedores();
    setData(data);
  }

  useEffect(() => {
    // llenarColumns();
    initialFetch()
  }, []);

  // useEffect(() => {
  //   dataFetch();
  // }, []);


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


