import React, { Component } from "react";
import request from "superagent";

import IpServidor from "../VariablesDeEntorno";

// Material UI START
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Material UI   END

import Grid from "@material-ui/core/Grid";
import CodigoError from "../../../lib/CodigoError";

export function actualizaMoneda(props) {
  const url =
    IpServidor + "/stkmonedasmodificar/" + this.state.moneda.idStkMonedas;
  request
    //  .post('http://localhost:4000/stkmonedasmodificar/'+this.state.moneda.idStkMonedas)
    .post(url)
    .set("Content-Type", "application/json")
    //    .send({ idtipomonedas: this.state.idtipomonedas})
    .send({ StkMonedasDescripcion: this.state.moneda.StkMonedasDescripcion })
    .send({ StkMonedasCotizacion: this.state.moneda.StkMonedasCotizacion })
    .set("X-API-Key", "foobar")
    .then(function(res) {
      // res.body, res.headers, res.status
    })
    .catch((err) => CodigoError(err));
  //this.getproveedores();
  // };

  //  return(
  //   //  console.log()
  //     //  retorno algo
  //  )
}
