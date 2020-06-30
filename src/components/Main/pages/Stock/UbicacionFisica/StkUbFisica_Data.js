import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function StkUbFisica_Data(props) {
  return new Promise(function(resolve, reject) {
    const url = IpServidor + "/stkubfisicaleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const ub_fisica = JSON.parse(res.text);
        resolve(ub_fisica);
      });
  });
}
