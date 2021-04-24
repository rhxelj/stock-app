import request from "superagent";
import IpServidor from "../VariablesDeEntorno";

export const presupcalculador = (DatosPresupEleg, datoscalculo, tipo) => {
  console.log('datos calculo  ', datoscalculo)
  var backend, url
  if ((DatosPresupEleg.PresupConfTipoBack === null) || DatosPresupEleg.PresupConfTipoBack === "") {

    url = IpServidor + '/presupconftipocalc/?tipo=' + tipo + "&datoscalculo=" + datoscalculo;
  }
  else {
    backend = DatosPresupEleg.PresupConfTipoBack
    url = IpServidor + backend + '/?datoscalculo=' + datoscalculo;
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

