import request from "superagent";

import IpServidor from "../VariablesDeEntorno";
import CodigoError from '../../../lib/CodigoError'
// Lee Rubro por codigo de gupo

export const presupgrabar = (datosrenglon1) => {
  console.log('datosrenglon1  presupgrabar  ', datosrenglon1)
  const url = IpServidor + "/presupgraba";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ PresupDatosDetalle: datosrenglon1 })
    .set("X-API-Key", "foobar")
    .then(function (res) {
      const respuesta = JSON.parse(res.text);
      if (respuesta.affectedRows !== 0) alert("EXITO");
      else alert("No modifico");
    })
    .catch((err) => CodigoError(err));
}
