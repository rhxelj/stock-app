import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";

import CodigoError from "../../../../lib/CodigoError";

export function stkGrupoAgregar(props) {
  const {
    StkGrupoAbr,
    StkGrupoDesc,
    // StkGrupoContRubro, //Todo: Preguntarle a Sandra pero creo que no va
    // idStkGrupo // Todo: Preguntarle a Sandra pero creo que no va
  } = props;

  const url = IpServidor + "/stkgrupoagregar";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ StkGrupoDesc: StkGrupoDesc })
    .send({ StkGrupoAbr: StkGrupoAbr })
    .send({ StkGrupoContRubro: 0 }) // Esto va a ser Cero inicialmente.
    .set("X-API-Key", "foobar")
    .then(function(res) {
      const respuesta = JSON.parse(res.text);
      if (respuesta.affectedRows !== 0) alert("EXITO");
      else alert("No modifico");
    })
    .catch((err) => CodigoError(err));
}
