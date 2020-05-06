import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";
// import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
// import Select from '@material-ui/core/Select';
import CodigoError from "../../../../lib/CodigoError";
// import AgregarMonedas from './StkMonedasAgregar'

export function stkGrupoModificar(props) {
  const { StkGrupoAbr, StkGrupoDesc, StkGrupoContRubro, idStkGrupo } = props;

  const url = IpServidor + "/stkgrupomodificar/?id=" + idStkGrupo;
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ StkGrupoDesc: StkGrupoDesc })
    .send({ StkGrupoAbr: StkGrupoAbr })
    .send({ StkGrupoContRubro: StkGrupoContRubro }) // Esto va a ser Cero inicialmente.
    .then(function(res) {});
}
