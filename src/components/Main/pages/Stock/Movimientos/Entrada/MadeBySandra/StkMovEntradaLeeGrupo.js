import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Grupo
export const stkgrupoleer = _ => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkgrupoleer";
    // var stkgrupo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkgrupo = JSON.parse(res.text);
        // setState({ ...state, stkgrupo: stkgrupo });
        // console.log("stkgrupo leer dentro del then ------> ", stkgrupo);
        resolve(stkgrupo);
      });
  });
};
