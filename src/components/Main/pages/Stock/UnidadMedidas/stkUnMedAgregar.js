import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function stkUnMedAgregar(props) {
  const { StkUnMedDesc, idStkUnMed } = props;

  const url = IpServidor + "/stkunmedagregar";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ idStkUnMed: idStkUnMed })
    .send({ StkUnMedDesc: StkUnMedDesc })
    .set("X-API-Key", "foobar")
    .then(function () {
      // res.body, res.headers, res.status
      //     console.log('res.status  ' + res.status);
      //     console.log('esta aca');
      //     alert('Agrego correctamente');
    })
    .catch((err) => CodigoError(err));
}
