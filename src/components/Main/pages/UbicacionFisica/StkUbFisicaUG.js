import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Ubicación Física por Ubicación Geográfica

export const stkubfisicaleerUbG = id => {
  const url = IpServidor + "/stkubfisicaleerUbG/?id=" + id;
  request
    .get(url)
    .set("Content-Type", "application/json")
    .then(res => {
      const ubicacionf = JSON.parse(res.text);
      setState({ ...state, ubicacionf: ubicacionf });
    });
};
