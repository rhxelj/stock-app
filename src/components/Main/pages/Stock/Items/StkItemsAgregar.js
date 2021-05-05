import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
import "react-table/react-table.css";

export function stkItemsAgregar(newData, codigonuevo) {
  return new Promise(function (resolve) {
    const {
      StkItemsRubroAbr,
      StkItemsDesc,
      StkItemsCantidad,
      StkItemsFAct,
      StkItemsMin,
      StkItemsMax,
      // stkrubro,
      // stkgrupo,
    } = newData;

    const StkItemsGrupo = codigonuevo[1][0].StkItemsGrupo;
    const StkItemsRubro = codigonuevo[1][0].StkItemsRubro;
    const UltItem = codigonuevo[0][0].UltItem;

    const url1 = IpServidor + "/stkitemsagregar/";
    request
      .post(url1)
      .set("Content-Type", "application/json")
      .send({ idStkItems: UltItem + 1 })
      .send({ StkItemsGrupo: StkItemsGrupo })
      .send({ StkItemsRubro: StkItemsRubro })
      .send({ StkItemsRubroAbr: StkItemsRubroAbr })
      .send({ StkItemsDesc: StkItemsDesc })
      .send({ StkItemsCantidad: StkItemsCantidad })
      .send({ StkItemsFAct: StkItemsFAct })
      .send({ StkItemsMin: StkItemsMin })
      .send({ StkItemsMax: StkItemsMax })
      .catch((err) => CodigoError(err));
    resolve();
  });
}
