import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

// Lee Rubro por codigo de gupo

export const stkenvaseagregar = state => {
  console.log("estoy en envase agregrar ");
  return new Promise(resolve => {
    const url =
      IpServidor +
      "/stkenvaseagregar/?idStkItems=" +
      state.idStkItems +
      "&idStkGrupo=" +
      state.idStkGrupo +
      "&idStkRubro=" +
      state.idStkRubro;

    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cantidad: state.cantidad })
      .send({ StkRubroPres: state.StkRubroPres })
      .send({ StkEnvasePartida: state.StkEnvasePartida })
      .send({ StkEnvaseUbG: state.StkEnvaseUbG })
      .send({ StkEnvaseUbF: state.StkEnvaseUbF })
      .send({ StkEnvaseObserv: state.StkEnvaseObserv })
      .then(resolve("ok"))
      .catch(err => {
        CodigoError(err);
      });
  });
};
