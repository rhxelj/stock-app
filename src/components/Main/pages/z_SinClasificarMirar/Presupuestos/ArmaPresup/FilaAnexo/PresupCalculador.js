import request from "superagent";
import IpServidor from '../../../VariablesDeEntorno'
export const presupcalculador = (DatosPresupEleg, datoscalculo, tipo, check) => {

  var backend, url
  if (DatosPresupEleg.PresupConfTipoBack != null) {
    backend = DatosPresupEleg.PresupConfTipoBack
    url = IpServidor + backend + '/?datoscalculo=' + datoscalculo;
  }
  else {
    url = IpServidor + '/presupconftipocalc/?tipo=' + tipo;
  }
  return new Promise(resolve => {
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const presuprenglon = JSON.parse(res.text);
        resolve(presuprenglon);
      });
  });
};