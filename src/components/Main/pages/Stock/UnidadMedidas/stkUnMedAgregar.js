import React, { Component } from "react";
import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Material UI START
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Material UI   END
import CodigoError from "../../../../lib/CodigoError";

export function stkUnMedAgregar(props) {
  const { StkUnMedDesc, idStkUnMed } = props;

  const url = IpServidor + "/stkunmedagregar";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ idStkUnMed: idStkUnMed })
    .send({ StkUnMedDesc: StkUnMedDesc })
    .set("X-API-Key", "foobar")
    .then(function(res) {
      // res.body, res.headers, res.status
      //     console.log('res.status  ' + res.status);
      //     console.log('esta aca');
      //     alert('Agrego correctamente');
    })
    .catch((err) => CodigoError(err));
}
