import React, { Component } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
import "react-table/react-table.css";

// import Button from '@material-ui/core/Button';
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";

import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function ProveedoresBorrar(props) {
  const { idProveedores } = props;
  const url = IpServidor + "/proveedoresborrar/?id=" + idProveedores;
  request
    .delete(url)
    .set("Content-Type", "application/json")
    .then(function(res) {
      // res.body, res.headers, res.status
    })
    //alert("Borrado")

    .catch((err) => CodigoError(err));
}
