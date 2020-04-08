import CodigoError from "../../../lib/CodigoError";
import IpServidor from "../VariablesDeEntorno";
import request from "superagent";

export function addMoneda(props) {
  const { idStkMonedas, StkMonedasDescripcion, StkMonedasCotizacion } = props;
  // console.log("props en addMoneda : ", idStkMonedas);
  const url = IpServidor + "/stkmonedasagregar";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ idStkMonedas: idStkMonedas })
    .send({ StkMonedasDescripcion: StkMonedasDescripcion })
    .send({ StkMonedasCotizacion: StkMonedasCotizacion })
    .set("X-API-Key", "foobar")
    .then(function(res) {
      // res.body, res.headers, res.status
      //     console.log('res.status  ' + res.status);
      //     console.log('esta aca');
      //     alert('Agrego correctamente');
    });
  // .catch((err) => CodigoError(err));
  // };

  // return (

  // );
  // }
}
