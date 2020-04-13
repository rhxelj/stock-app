import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo


export const stkrubroleeproveedor = StkRubroProv => {
  return new Promise(resolve => {
    if (StkRubroProv !== 0) {
      const url = IpServidor + "/stkrubroleeproveedor/" + StkRubroProv;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then(res => {
          const stkrubro = JSON.parse(res.text);
          resolve(stkrubro);
        });
    }
  });
};

