import request from "superagent";

import IpServidor from "../VariablesDeEntorno";
var nroPresupuesto = 0
export const PresupGrabar = (props, nomCliente, idClientes) => {
  return new Promise(resolve => {
    const url = IpServidor + "/presupgraba";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ DatosPresup: props })
      .send({ nomCliente: nomCliente })
      .send({ idClientes: idClientes })
      .set("X-API-Key", "foobar")
      .then(res => {
        const respuesta = JSON.parse(res.text);
        nroPresupuesto = respuesta.insertId

        // if (respuesta.affectedRows !== 0) alert("EXITO");
        // else alert("No modifico");

        resolve(nroPresupuesto);
      })
  })

    .catch((err) =>
      console.log('codigo de error presupgrabar que no es error', err)
      //  CodigoError(err)

    );

}
// .then(function (res) {
//   const respuesta = JSON.parse(res.text);
//   console.log('respuesta.affectedRows   ', respuesta)
// })
// .catch((err) => CodigoError(err));
