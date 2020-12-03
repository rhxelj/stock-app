import CodigoError from '../../../../lib/CodigoError'
import request from "superagent";
import IpServidor from '../../VariablesDeEntorno'

export default function leePresupConfTipoLeeAnexo(props) {
  const AnexoSN = props;
  return new Promise((resolve) => {
    const url = IpServidor + "/presupconftipoleeanexo/?anexo=" + AnexoSN;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const presupconftipoleeanexo = JSON.parse(res.text);
        resolve(presupconftipoleeanexo);
      });
  });
}
