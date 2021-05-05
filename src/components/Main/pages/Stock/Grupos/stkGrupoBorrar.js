import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import CodigoError from "../../../../lib/CodigoError";

export function stkGrupoBorrar(props) {
  const { idStkGrupo } = props;
  const url = IpServidor + "/stkgrupoborrar/" + idStkGrupo;
  request
    .delete(url)
    .set("Content-Type", "application/json")
    .then(function () { })
    .catch((err) => CodigoError(err));
}
