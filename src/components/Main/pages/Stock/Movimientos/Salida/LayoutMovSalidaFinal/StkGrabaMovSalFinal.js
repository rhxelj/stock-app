import request from "superagent";

import IpServidor from "../../../../VariablesDeEntorno";
import CodigoError from "../../../../../../lib/CodigoError";
// Lee Rubro por codigo de gupo

export const stkGrabaMovSalFinal = (
  StkItemsGrupo,
  StkItemsRubro,
  idStkItems,
  nuevacantstock,
  nuevacantdisp
) => {
  const url = IpServidor + "/stkgrabamovsalfinal";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ StkItemsGrupo: StkItemsGrupo })
    .send({ StkItemsRubro: StkItemsRubro })
    .send({ idStkItems: idStkItems })
    .send({ nuevacantstock: nuevacantstock })
    .send({ nuevacantdisp: nuevacantdisp })
    .set("X-API-Key", "foobar")
    .then(function (res) {
      const respuesta = JSON.parse(res.text);
      if (respuesta.affectedRows !== 0)
        alert("EXITO");
      else alert("No modifico");
    })
    .catch((err) => CodigoError(err));
};
