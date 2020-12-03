import request from "superagent";

import IpServidor from "../VariablesDeEntorno";
import CodigoError from '../../../lib/CodigoError'
// Lee Rubro por codigo de gupo

export const PresupGrabar = (props, nomCliente, idClientes) => {

  const url = IpServidor + "/presupgraba";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ DatosPresup: props })
    .send({ nomCliente: nomCliente })
    .send({ idClientes: idClientes })
    .set("X-API-Key", "foobar")
    .then(function (res) {

      const respuesta = JSON.parse(res.text);
      console.log('respuesta.affectedRows   ', respuesta.affectedRows)
      if (respuesta.affectedRows !== 0) alert("EXITO");
      else alert("No modifico");
    })
    .catch((err) => CodigoError(err));
}
