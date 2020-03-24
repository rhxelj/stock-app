import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";

// export const agregaStock = _ => {
export function agregaStock(state) {
  const url =
    IpServidor +
    "/stkitemsmodstock/?idStkItems=" +
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
    .send({ StkItemsCantDisp: state.StkItemsCantDisp })
    .send({ StkItemsCantidad: state.StkItemsCantidad })
    .catch(err => {
      if (err.status === 414) {
        alert("Falta información para modificar Items  ");
      } else {
        console.log("Error nro en StkMovEntrada 1:  " + err.status);
      }
    });

  const url1 =
    IpServidor +
    "/stkenvaseagregar/?idStkItems=" +
    state.idStkItems +
    "&idStkGrupo=" +
    state.idStkGrupo +
    "&idStkRubro=" +
    state.idStkRubro;

  request
    .post(url1)
    .set("Content-Type", "application/json")
    .send({ cantidad: state.cantidad })
    .send({ StkRubroPres: state.StkRubroPres })
    .send({ StkEnvasePartida: state.StkEnvasePartida })
    .send({ StkEnvaseUbG: state.StkEnvaseUbG })
    .send({ StkEnvaseUbF: state.StkEnvaseUbF })
    .send({ StkEnvaseObserv: state.StkEnvaseObserv })
    .then(res => {
      //   setState({ ...state, marcaagregado: true });
    })
    .catch(err => {
      if (err.status === 413) {
        alert("Falta información para agregar Envase  ");
      } else {
        console.log("Error nro en StkMovEntrada 2 :  " + err.status);
      }
    });
  // this.toggleImprimir()
  //   toggleEntradaDatos();
}
