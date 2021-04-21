import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";

import CodigoError from "../../../../lib/CodigoError";

export function presupConfTipoAgregar(props) {

    const {
        PresupConfTipoLargo,
        PresupConfTipoAncho,
        PresupConfTipoM2,
        PresupConfTipoAnexo,
        PresupConfTipoCant,
        PresupConfTipoDesc,
        PresupConfTipoRubro,
        PresupConfTipoImprime,
        PresupConfTipoMinMOT,
    } = props;

    const url = IpServidor + "/presupconftipoagregar";
    request
        .post(url)
        .set("Content-Type", "application/json")
        .send({ PresupConfTipoLargo: PresupConfTipoLargo })
        .send({ PresupConfTipoAncho: PresupConfTipoAncho })
        .send({ PresupConfTipoM2: PresupConfTipoM2 })
        .send({ PresupConfTipoAnexo: PresupConfTipoAnexo })
        .send({ PresupConfTipoCant: PresupConfTipoCant })
        .send({ PresupConfTipoDesc: PresupConfTipoDesc })
        .send({ PresupConfTipoRubro: PresupConfTipoRubro })
        .send({ PresupConfTipoImprime: PresupConfTipoImprime })
        .send({ PresupConfTipoMinMOT: PresupConfTipoMinMOT })
        .set("X-API-Key", "foobar")
        // .then(function (res) {
        //     const respuesta = JSON.parse(res.text);
        //     if (respuesta.affectedRows !== 0) alert("EXITO");
        //     else alert("No modifico");
        // })
        .catch((err) => CodigoError(err));
}
