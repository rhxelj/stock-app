import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";

import CodigoError from "../../../../lib/CodigoError";

// import React, { Component} from 'react'
// // import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// // import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

export function ProveedoresModificar(props) {
  return new Promise(function () {
    const {
      idProveedores,
      ProveedoresDesc,
      ProveedoresTipo,
      ProveedoresCUIT,
      ProveedoresCalle,
      ProveedoresNroCalle,
      ProveedoresPiso,
      ProveedoresDto,
      ProveedoresCodPos,
      ProveedoresLoc,
      ProveedoresPcia,
      ProveedoresTel,
      ProveedoresContacto,
      ProveedoresMail,
      ProveedoresWeb,
      ProveedoresCodMon,
    } = props;

    const url = IpServidor + "/proveedoresmodificar/" + idProveedores;

    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ ProveedoresDesc: ProveedoresDesc })
      .send({ ProveedoresTipo: ProveedoresTipo })
      .send({ ProveedoresCUIT: ProveedoresCUIT })
      .send({ ProveedoresCalle: ProveedoresCalle })
      .send({ ProveedoresNroCalle: ProveedoresNroCalle })
      .send({ ProveedoresPiso: ProveedoresPiso })
      .send({ ProveedoresDto: ProveedoresDto })
      .send({ ProveedoresCodPos: ProveedoresCodPos })
      .send({ ProveedoresLoc: ProveedoresLoc })
      .send({ ProveedoresPcia: ProveedoresPcia })
      .send({ ProveedoresTel: ProveedoresTel })
      .send({ ProveedoresContacto: ProveedoresContacto })
      .send({ ProveedoresMail: ProveedoresMail })
      .send({ ProveedoresWeb: ProveedoresWeb })
      .send({ ProveedoresCodMon: ProveedoresCodMon })

      //.set("X-API-Key", "foobar")
      .then(function () {
        // res.body, res.headers, res.status
      })
      .catch((err) => CodigoError(err));
  });
}
