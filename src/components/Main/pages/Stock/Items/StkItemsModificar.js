import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function modificarItems(props) {
  return new Promise(function (resolve) {
    console.log("modificarItems  props  ", props);
    const {
      idStkItems,
      StkItemsGrupo,
      StkItemsRubro,
      StkItemsRubroAbr,
      StkItemsDesc,
      StkItemsCantidad,
      StkItemsCantDisp,
      // StkItemsFAct,
      StkItemsMin,
      StkItemsMax,
    } = props;

    const url =
      IpServidor +
      "/stkitemsmodificar/?idStkItems=" +
      idStkItems +
      "&StkItemsGrupo=" +
      StkItemsGrupo +
      "&StkItemsRubro=" +
      StkItemsRubro;
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        StkItemsRubroAbr: StkItemsRubroAbr,
        StkItemsDesc: StkItemsDesc,
        StkItemsCantidad: StkItemsCantidad,
        StkItemsCantDisp: StkItemsCantDisp,
        StkItemsMin: StkItemsMin,
        StkItemsMax: StkItemsMax,
      })
      .then(function () { })
      .catch((err) => CodigoError(err));
    resolve();
  });
}
