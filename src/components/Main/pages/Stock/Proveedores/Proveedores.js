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
import { leerProveedores } from "./ProveedoresLeer";
import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import LeerProveedor from "../../z_SinClasificarMirar/LeerProveedor";

export default function Proveedores() {
  // const [rubro, setRubro] = useState({ columns: [], data: [] });
  // const [strubromodificar, setStkrubromodificar] = useState(false);
  // const [columns, setColumns] = useState([]);
  const [data, setData] = useState();

  // this.state = {
  //   proveedores: [],
  //   direction: {}, // direccion del ordenamiento asc o desc
  //   toggle: {
  //     agregar: false,
  //     busqueda: false,
  //     modificar: false,
  //     seleccampos: false,
  //   },
  //   toggle_agregar: false,
  //   toggle_busqueda: false,
  //   toggle_modificar: false,
  //   toggle_imprimir: false,
  //   filtered: "",

  //   proveedor: {
  //     idProveedores: "",
  //     ProveedoresDesc: "",
  //     ProveedoresTipo: 1,
  //     ProveedoresCUIT: "",
  //     ProveedoresCalle: "",
  //     ProveedoresNroCalle: 0,
  //     ProveedoresPiso: "",
  //     ProveedoresDto: "",
  //     ProveedoresCodPos: "",
  //     ProveedoresLoc: "",
  //     ProveedoresPcia: "",
  //     ProveedoresTel: "",
  //     ProveedoresContacto: "",
  //     ProveedoresMail: "",
  //     ProveedoresWeb: "",
  //     ProveedoresCodMon: "",
  //   },
  // };
  // this.toggle = this.toggle.bind(this);

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

  async function dataFetch() {
    const data = await leerProveedores();
    setData(data);
  }

  // useEffect(() => {
  //   dataFetch();
  // }, []);

  useEffect(() => {
    // if (data != "") {
    dataFetch();
    // }
  }, [data]);

  const columns = [
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
  ];
  return (
    <div>
      <MaterialTable
        title="PROVEEDORES"
        icons={tableIcons}
        columns={columns}
        data={data}
      />
    </div>
  );
}
