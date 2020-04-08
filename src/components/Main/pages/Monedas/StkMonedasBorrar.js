import React, { Component, useState, useEffect } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

// import Button from '@material-ui/core/Button';
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import IpServidor from "../VariablesDeEntorno";
import CodigoError from "../../../lib/CodigoError";

export function borrarMonedas(props) {
  const idStkMonedas = props;
  const url = IpServidor + "/stkmonedasborrar/" + idStkMonedas;
  request
    .delete(url)
    .set("Content-Type", "application/json")
    .then(function(res) {
      // res.body, res.headers, res.status
    })
    .catch((err) => CodigoError(err));
}
