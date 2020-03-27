import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

export const stkitemsleedisp= (state) => {
  console.log('estoy en  stkitemsleedisp ')
  return new Promise(resolve => {
    if (state.idStkGrupo != '' && state.idStkRubro != '' && state.idStkItems != '') {
      const url =
        IpServidor +
        "/stkitemsleedisp/?idStkGrupo=" +
        state.idStkGrupo +
        "&idStkRubro=" +
        state.idStkRubro +
        "&idStkItems=" +
        state.idStkItems;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then(res => {
          const disponibilidad = JSON.parse(res.text);
          resolve(disponibilidad);
        });
    }
  });
};
