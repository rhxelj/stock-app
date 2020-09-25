import CodigoError from "../../../lib/CodigoError";
import IpServidor from "../VariablesDeEntorno";
import request from "superagent";

export default function leePresupConfTipoLeeAnexo(props) {
  const AnexoSN = props;
  return new Promise((resolve) => {
    const url = IpServidor + "/presupconftipoleeanexo/?anexo=" + AnexoSN;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const presupconftipoleeanexo = JSON.parse(res.text);
        console.log('presupconftipoleeanexo  ', presupconftipoleeanexo)
        resolve(presupconftipoleeanexo);
      });
  });
}
