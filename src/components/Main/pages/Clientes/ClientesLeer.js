import CodigoError from '../../../lib/CodigoError'
import IpServidor from '../VariablesDeEntorno'
import request from "superagent";

export function leerClientes(props) {
  return new Promise(function (resolve, reject) {
    const url = IpServidor + "/clientesleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const clientes = JSON.parse(res.text);
        resolve(clientes);
      });
  });
}
