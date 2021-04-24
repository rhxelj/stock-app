// import React, { Component } from "react";
// import request from "superagent";
// import IpServidor from "../../VariablesDeEntorno";
// // import ReactTable from 'react-table'
// // import 'react-table/react-table.css'

// import IconButton from "@material-ui/core/IconButton";
// import ClearIcon from "@material-ui/icons/Clear";
// import DeleteIcon from "@material-ui/icons/Delete";
// import DoneIcon from "@material-ui/icons/Done";
// // import IpServidor from './VariablesDeEntorno'
// import CodigoError from "../../../../lib/CodigoError";

import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function StkUbFisicaBorrar(props) {
  return new Promise(function () {
    const { idStkUbFisica, StkUbFisicaGeo } = props;

    const url = IpServidor + "/stkubfisicaborrar";

    // class BorrarUnidadMedidas extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     // url: IpServidor +'/stkunmedborrar/',
    //     ubfisica: [],
    //     // filtrado:[],
    //     filtered: "",
    //     toggle: true,
    //     idStkUbFisica: props.idStkUbFisica
    //   };
    //   // this.search = this.search.bind(this)
    //   this.toggle = this.toggle.bind(this);
    // }

    // toggle(event) {
    //   this.setState(prevState => ({
    //     toggle: !prevState.toggle
    //   }));
    // }

    // ubfisicaborrar = (idStkUbFisica, StkUbFisicaGeo) => {
    //   var url = IpServidor + "/stkubfisicaborrar/";
    request
      .get(
        url +
        "?idStkUbFisica=" +
        idStkUbFisica +
        "&StkUbFisicaGeo=" +
        StkUbFisicaGeo
      )
      .set("Content-Type", "application/json")
      .then(function () { })
      .catch((err) => CodigoError(err));
  });
}
