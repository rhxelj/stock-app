import request from "superagent";
// import ReactTable from 'react-table'
import "react-table/react-table.css";


import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function borrarItems(props) {
  return new Promise(function (resolve) {
    const { idStkItems, StkItemsGrupo, StkItemsRubro } = props;

    // //Delete
    var url =
      IpServidor +
      "/stkitemsborrar/?idStkItems=" +
      idStkItems +
      "&StkItemsGrupo=" +
      StkItemsGrupo +
      "&StkItemsRubro=" +
      StkItemsRubro;
    request
      .delete(url)
      .set("Content-Type", "application/json")
      .catch(err => CodigoError(err));
    resolve();
  });
}
