import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leeStkItemsDetalles(props) {
  return new Promise(function(resolve, reject) {
    const url = IpServidor + "/stkitemsleedetalles";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const items = JSON.parse(res.text);
        resolve(items);
      });
  });
}
