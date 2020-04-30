import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leerProveedores(props) {
  return new Promise(function(resolve, reject) {
    const url = IpServidor + "/proveedoresleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const proveedores = JSON.parse(res.text);
        resolve(proveedores);
      });
  });
}
