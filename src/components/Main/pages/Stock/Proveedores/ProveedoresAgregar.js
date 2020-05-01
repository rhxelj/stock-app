import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CodigoError from "../../../../lib/CodigoError";

export function stkProveedoresAgregar(props) {
  return new Promise(function(resolve, reject) {
    const {
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
      // provdesc,
      // provtipo,
      // provcuit,
      // provcalle,
      // provnrocalle,
      // provpiso,
      // provdto,
      // provcodpostal,
      // provlocalidad,
      // provprovincia,
      // provtelefono,
      // provcontacto,
      // provmail,
      // provpagweb,
      // provcodmon,
      // idStkTipoProveed,
      // StkTipoProveedDesc,
      // tipoprov,
      // idStkMonedas,
      // StkMonedasDescripcion,
      // StkMonedasCotizacion,
      // stkmonedas,
    } = props;

    console.log("PROPS en ProveedoresAgregar => ", props);
    // // Create
    // addProveedor = (_) => {
    const url = IpServidor + "/proveedoresagregar";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ provdesc: ProveedoresDesc })
      .send({ provtipo: ProveedoresTipo })
      .send({ provcuit: ProveedoresCUIT })
      .send({ provcalle: ProveedoresCalle })
      .send({ provnrocalle: ProveedoresNroCalle })
      .send({ provpiso: ProveedoresPiso })
      .send({ provdto: ProveedoresDto })
      .send({ provcodpostal: ProveedoresCodPos })
      .send({ provlocalidad: ProveedoresLoc })
      .send({ provprovincia: ProveedoresPcia })
      .send({ provtelefono: ProveedoresTel })
      .send({ provcontacto: ProveedoresContacto })
      .send({ provmail: ProveedoresMail })
      .send({ provpagweb: ProveedoresWeb })
      .send({ provcodmon: ProveedoresCodMon })
      .set("X-API-Key", "foobar")
      .then(function(res) {})
      .catch((err) => CodigoError(err));
    // };
  });
}
