import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function stkUnMedModificar(props) {
  const { StkUnMedDesc, idStkUnMed } = props;
  const url = IpServidor + "/stkunmedmodificar/" + idStkUnMed;

  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ idStkUnMed: idStkUnMed })
    .send({ StkUnMedDesc: StkUnMedDesc })
    .then(function () {
      // res.body, res.headers, res.status
    })
    .catch((err) => CodigoError(err));
}
