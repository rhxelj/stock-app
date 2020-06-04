// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import request from "superagent";

import { withStyles } from "@material-ui/core/styles";
import "../../../../../Styles/TableHeader.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import StkFab from "../../../../lib/StkFab";

import StkItemsAgregar from "./StkItemsAgregar";
import StkItemsBorrar from "./StkItemsBorrar";
import StkItemsModificar from "./StkItemsModificar";
import Grid from "@material-ui/core/Grid";
import SelecCampos from "../../Impresion/SelecCampos";
import IpServidor from "../../VariablesDeEntorno";

import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { columns } from "./itemsColumns";
// import 'react-table/react-table.css'
// import ReactTable from 'react-table'
// import Button from '@material-ui/core/Button';
// import orderBy from 'lodash/orderBy'

// Estilo para el botón de borrar

const style = {
  padding: "0px",
  width: "100px",
};

// Estilos Inicio
const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

// class StkItems extends Component {
const initialState = {
  idStkItems: 0,
  StkItemsGrupo: 0,
  StkItemsRubro: 0,
  StkItemsDesc: "",
  StkItemsCantidad: 0,
  StktemsFAct: "",
  StkItemsMin: 0,
  StkItemsMax: 0,
  items: [],
  itemsdetalles: [],
  stkgrupoitem: [],
};

function StkItems() {
  // constructor(props) {
  // super(props);
  const [state, setState] = useState(initialState);

  //******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

  // toggle = (arg) => {
  //   this.setState((prevState) => ({
  //     toggle: { [arg]: !prevState.toggle[arg] },
  //   })); // estado inicial "FALSE" muestra la tabla de "..." en "TRUE" llama al componente <ComponenteParticular>
  // };

  //******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************

  //*********************************************** Cosas a agregar para la funcion de Busqueda Begin ***************************************************

  // Funcion De Busqueda - Begin

  // search = (event) => {
  //   // Funcion de busqueda
  //   // var name  = event.target.name
  //   var value =
  //     event.target.type === "checkbox"
  //       ? event.target.checked
  //       : event.target.value;
  //   this.setState({ filtered: value });
  // };

  // Funcion De Busqueda - End.

  // Opcion para borrar contenido del cuadro de busqueda - BEGIN

  // borraFiltered = () => {
  //   this.setState({ filtered: "" });
  // };

  // Opcion para borrar contenido del cuadro de busqueda - END

  //********************************************* Cosas a agregar para la funcion de Busqueda End ****************************************************************

  //********************************************* Cosas a agregar para la funcion de Ordenar (SortBy) Begin ******************************************************

  // Funcion ordernar - Begin

  // sortBy(key) {
  //   this.setState({
  //     items: this.state.items.sort((a, b) =>
  //       this.state.direction[key] === "asc"
  //         ? a[key] < b[key]
  //           ? 1
  //           : -1
  //         : a[key] > b[key]
  //         ? 1
  //         : -1
  //     ),
  //     direction: {
  //       [key]: this.state.direction[key] === "asc" ? "desc" : "asc",
  //     },
  //   });
  // }

  // Funcion ordernar - End

  //*********************************************** Cosas a agregar para la funcion de Ordenar (SortBy) End *******************************************************

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
