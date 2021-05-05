import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function StkUbFisicaAgregar(props) {
  return new Promise(function () {
    const { idStkUbFisica, StkUbFisicaGeo } = props;

    const url = IpServidor + "/stkubfisicaagregar";

    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ idStkUbFisica: idStkUbFisica })
      .send({ StkUbFisicaGeo: StkUbFisicaGeo })
      .then(function () { })

      .catch((err) => CodigoError(err));
  });
}
