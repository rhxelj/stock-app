import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import CodigoError from "../../../lib/CodigoError";

export function borrarMonedas(props) {
  const idStkMonedas = props;
  const url = IpServidor + "/stkmonedasborrar/" + idStkMonedas;
  request
    .delete(url)
    .set("Content-Type", "application/json")
    .then(function () {
      // res.body, res.headers, res.status
    })
    .catch((err) => CodigoError(err));
}
