import React, { Component } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
import "react-table/react-table.css";

import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";

import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function borrarRubros(props) {
  return new Promise(function(resolve, reject) {
    const { idStkRubro, StkRubroCodGrp } = props;

    var url =
      IpServidor +
      "/stkrubroborrar/" +
      "?idStkRubro=" +
      idStkRubro +
      "&StkRubroCodGrp=" +
      StkRubroCodGrp;
    request
      .get(url)
      .set("Content-Type", "application/json")
      // .then(function(res) {
      //     // res.body, res.headers, res.status
      // })
      //alert("Borrado")
      .catch((err) => CodigoError(err));

    resolve();
  });
}
