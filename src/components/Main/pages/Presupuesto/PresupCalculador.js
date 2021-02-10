import request from "superagent";
import IpServidor from "../VariablesDeEntorno";

export const presupcalculador = (DatosPresupEleg, datoscalculo, tipo, check) => {
  var backend, url
  if ((DatosPresupEleg.PresupConfTipoBack == null) || DatosPresupEleg.PresupConfTipoBack == "") {
    url = IpServidor + '/presupconftipocalc/?tipo=' + tipo;
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

//http://localhost:4000/presuppu/?datoscalculo=[{"StkRubroAbr":"ZDA9","minmay":"my","cantidad":"3","largo":"5","ancho":0,"tipoconf":"cs"}]
//   http://localhost:4000/presuppurec/?datoscalculo=[{"StkRubroAbr":"ZDA9","minmay":"my","cantidad":"3","largo":"5","ancho":0,"tipoconf":"cs"}]