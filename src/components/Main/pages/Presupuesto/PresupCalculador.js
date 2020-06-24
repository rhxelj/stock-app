import request from "superagent";

import IpServidor from "../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const presupcalculador = (datoscalculo, tipo, check) => {
  var backend
  if (tipo == 'un') {
    backend = '/presupunid'
  }
  if (tipo == 'pu') {
    backend = '/presuppu'
  }
  if (tipo == 'fa') {
    backend = '/presupfajas'
  }
  if (tipo == 'cf') {
    backend = '/presuplonaconf'
  }
  if (tipo == 'en') {
    backend = '/presuplonaenr'
  }
  return new Promise(resolve => {
    const url = IpServidor + backend + '/?datoscalculo=' + datoscalculo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const presuprenglon = JSON.parse(res.text);
        // resolve(presuprenglon[0]);
        resolve(presuprenglon);
      });
  });
};