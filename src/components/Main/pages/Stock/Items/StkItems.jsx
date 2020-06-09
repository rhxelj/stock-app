import React, { useState, useEffect } from "react";
import request from "superagent";

import { withStyles } from "@material-ui/core/styles";
import "../../../../../Styles/TableHeader.css";

import StkItemsAgregar from "./StkItemsAgregar";
import StkItemsBorrar from "./StkItemsBorrar";
import StkItemsModificar from "./StkItemsModificar";
import Grid from "@material-ui/core/Grid";
import SelecCampos from "../../Impresion/SelecCampos";
import IpServidor from "../../VariablesDeEntorno";

import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { initialState } from "./itemsInitialState"
import { itemsColumns } from "./itemsColumns";

// import React, { Component } from "react";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import Paper from "@material-ui/core/Paper";
// import StkFab from "../../../../lib/StkFab";
// import 'react-table/react-table.css'
// import ReactTable from 'react-table'
// import Button from '@material-ui/core/Button';
// import orderBy from 'lodash/orderBy'

// Estilo para el botón de borrar

// const style = {
//   padding: "0px",
//   width: "100px",
// };

// Estilos Inicio
// const CustomTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

//   const styles = theme => ({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing.unit * 3,
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 700,
//     },
//     row: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.background.default,
//       },
//     },
//   });
// Estilos Fin

function StkItems() {

  const [state, setState] = useState(initialState);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  async function columnsFetch() {
    const col = await itemsColumns();
    setColumns(() => col);
  }

  // async function dataFetch() {
  //   const data = await grupoData();
  //   setData(data);
  // }

  //Read
  // leeStkItems = (_) => {
  //   const url = IpServidor + "/stkitemsleer";
  //   request
  //     .get(url)
  //     .set("Content-Type", "application/json")
  //     .then((res) => {
  //       const items = JSON.parse(res.text);
  //       setState({ items: items });
  //     });
  // };

  //Read
  const leeStkItemsDetalles = (_) => {
    const url = IpServidor + "/stkitemsleedetalles";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const items = JSON.parse(res.text);
        setState({ items: items });
      });
  };
  // stkgrupoleercod = (id) => {
  //   const url = IpServidor + "/stkgrupoleercod/?id=" + id;
  //   request
  //     .get(url)
  //     .set("Content-Type", "application/json")
  //     .then((res) => {
  //       const stkgrupoitem = JSON.parse(res.text);
  //       this.setState(() => {
  //         return { stkgrupoitem: stkgrupoitem[0] };
  //       }); //saco el item del grupo
  //     });
  //   //   console.log(this.state.stkgrupoitem)
  //   //   console.log('StkGrupoDesc'+this.state.stkgrupoitem.StkGrupoDesc)
  //   return this.state.stkgrupoitem.StkGrupoDesc;
  // };
  // // }

  // toggle(event) {
  //   // toogle = (event)=>{
  //   this.setState((prevState) => ({
  //     toggle: !prevState.toggle,
  //   }));
  // }

  // togglemodificar(event) {
  //   this.toggle();
  //   this.setState((prevState) => ({
  //     togglemodificar: !prevState.togglemodificar,
  //   }));
  // }

  // componentDidMount() {
  //   // this.leeStkItems()
  //   this.leeStkItemsDetalles();
  // }


  async function initialFetch() {
    columnsFetch();
    // dataFetch();
  }

  useEffect(() => {
    initialFetch();
  }, []);


  useEffect(() => {
    leeStkItemsDetalles();
  });

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        localization={localization}
        columns={columns}
        data={state.items}
        options={{
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
}
// }

export default StkItems;
