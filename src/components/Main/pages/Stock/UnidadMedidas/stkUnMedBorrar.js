import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function stkUnMedBorrar(props) {
  const { idStkUnMed } = props;
  const url = IpServidor + "/stkunmedborrar/" + idStkUnMed;

  request
    .delete(url)
    .set("Content-Type", "application/json")
    .then(function () { })
    .catch((err) => CodigoError(err));
}
