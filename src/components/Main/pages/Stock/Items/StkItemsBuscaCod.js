import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
import "react-table/react-table.css";
import { stkItemsAgregar } from './StkItemsAgregar'


export function stkItemsBuscaCod(props) {
  return new Promise(function (resolve, reject) {
    const {
      StkItemsRubroAbr,
      StkItemsDesc,
      StkItemsCantidad,
      StkItemsFAct,
      StkItemsMin,
      StkItemsMax,
      stkrubro,
      stkgrupo,
    } = props;

    var url = IpServidor + "/stkitemscodabr/?StkItemsRubroAbr=" + StkItemsRubroAbr;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((datosenv) => {
        const codigoitems = JSON.parse(datosenv.text);
        stkItemsAgregar(props, codigoitems);
      });

  }
  )
}