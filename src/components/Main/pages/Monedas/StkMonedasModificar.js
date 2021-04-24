import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import CodigoError from "../../../lib/CodigoError";

export function modificarMonedas(props) {
  const { idStkMonedas, StkMonedasDescripcion, StkMonedasCotizacion } = props;
  const url = IpServidor + "/stkmonedasmodificar/" + idStkMonedas;
  request
    //  .post('http://localhost:4000/stkmonedasmodificar/'+this.state.moneda.idStkMonedas)
    .post(url)
    .set("Content-Type", "application/json")
    //    .send({ idtipomonedas: this.state.idtipomonedas})
    .send({ StkMonedasDescripcion: StkMonedasDescripcion })
    .send({ StkMonedasCotizacion: StkMonedasCotizacion })
    .set("X-API-Key", "foobar")
    .then(function () {
      // res.body, res.headers, res.status
    })
    .catch((err) => CodigoError(err));
}
