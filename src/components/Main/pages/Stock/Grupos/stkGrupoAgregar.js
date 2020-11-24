import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";
import CodigoError from "../../../../lib/CodigoError";
import Mensaje from "../../../../lib/Mensaje";

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
    .then(function (res) {
      const respuesta = JSON.parse(res.text);
      if (respuesta.affectedRows !== 0)
        Mensaje("error", "Grupo agregado correctamente");
      else Mensaje("error", "No se pudo modificar");
    })
    .catch((err) => CodigoError(err));
}
