import request from "superagent";

import IpServidor from "../VariablesDeEntorno";
import CodigoError from "../../../lib/CodigoError";
import Mensaje from "../../../lib/Mensaje";

// Lee Rubro por codigo de gupo

export const PresupGrabar = (props, nomCliente, idClientes) => {
  console.log("props  PresupGrabar  ", props);
  // console.log('nomCliente  PresupGrabar  ', nomCliente)
  // console.log('propidClientess  PresupGrabar  ', idClientes)

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
      console.log("respuesta.affectedRows   ", respuesta.affectedRows);
      if (respuesta.affectedRows !== 0)
        Mensaje("success", "Grabado Correctamente");
      else Mensaje("error", "No se pudo modificar");
    })
    .catch((err) => CodigoError(err));
};
