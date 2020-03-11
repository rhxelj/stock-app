import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkitemsleecodgryrb = (idStkGrupo, idStkRubro) => {
  return new Promise(resolve => {
    if (idStkGrupo !== 0 && idStkRubro !== 0) {
      const url =
        IpServidor +
        "/stkitemsleecodgryrb/?idStkGrupo=" +
        idStkGrupo +
        "&idStkRubro=" +
        idStkRubro;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then(res => {
          const stkitems = JSON.parse(res.text);
          resolve(stkitems);
        });
    }
  });
};
