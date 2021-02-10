import request from "superagent";
import React, { useState } from "react";
import IpServidor from '../../VariablesDeEntorno'
import CodigoError from '../../../../lib/CodigoError'
// import { PresupPreview } from './PresupPreview'
// Lee Rubro por codigo de gupo

export const PresupImprime = (props, idcliente, nomCliente, suma, nroPresupuesto, descrip) => {
    const url1 = IpServidor + "/imppresup";
    request
        .post(url1)
        .set("Content-Type", "application/json")
        .send({ datospresup: props })
        .send({ idcliente: idcliente })
        .send({ nomCliente: nomCliente })
        .send({ suma: suma })
        .send({ nroPresupuesto: nroPresupuesto })
        .send({ descrip: descrip })
        .set("X-API-Key", "foobar")
        .then(function (res) {
            const respuesta = JSON.parse(res.text);
        })
        .catch((err) => CodigoError(err));


}
