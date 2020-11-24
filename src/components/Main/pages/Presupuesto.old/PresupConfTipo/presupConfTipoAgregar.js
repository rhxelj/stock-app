import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";
import CodigoError from "../../../../lib/CodigoError";
import Mensaje from "../../../../lib/Mensaje";

export function presupConfTipoAgregar(props) {
  const {
    PresupConfTipoLargo,
    PresupConfTipoAncho,
    PresupConfTipoAnexo,
    PresupConfTipoCant,
    PresupConfTipoDesc,
    PresupConfTipoRubro,
    PresupConfTipoImprime,
  } = props;

  const url = IpServidor + "/presupconftipoagregar";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ PresupConfTipoLargo: PresupConfTipoLargo })
    .send({ PresupConfTipoAncho: PresupConfTipoAncho })
    .send({ PresupConfTipoAnexo: PresupConfTipoAnexo })
    .send({ PresupConfTipoCant: PresupConfTipoCant })
    .send({ PresupConfTipoDesc: PresupConfTipoDesc })
    .send({ PresupConfTipoRubro: PresupConfTipoRubro })
    .send({ PresupConfTipoImprime: PresupConfTipoImprime })
    .set("X-API-Key", "foobar")
    .then(function (res) {
      const respuesta = JSON.parse(res.text);
      if (respuesta.affectedRows !== 0)
        Mensaje("success", "Agregado Correctamente");
      else Mensaje("error", "No se pudo modificar");
    })
    .catch((err) => CodigoError(err));
}
