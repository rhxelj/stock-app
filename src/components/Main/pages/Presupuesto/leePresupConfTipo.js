import CodigoError from "../../../lib/CodigoError";
import IpServidor from "../VariablesDeEntorno";
import request from "superagent";
// import { resolve } from "dns";

export default function leePresupConfTipo() {
  return new Promise((resolve) => {
    const url = IpServidor + "/presupconftipoleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const presupconftipo = JSON.parse(res.text);
        resolve(presupconftipo);
      });
  });
}
