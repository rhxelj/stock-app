import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";
import CodigoError from "../../../../lib/CodigoError";

export function presupConfTipoModificar(props) {
    const {
        idPresupConfTipo,
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

    const url = IpServidor + "/presupconftipomodificar/?id=" + idPresupConfTipo;
    request
        .post(url)
        .set("Content-Type", "application/json")
        .send({ PresupConfTipoAnexo: PresupConfTipoAnexo })
        .send({ PresupConfTipoLargo: PresupConfTipoLargo })
        .send({ PresupConfTipoAncho: PresupConfTipoAncho })
        .send({ PresupConfTipoM2: PresupConfTipoM2 })
        .send({ PresupConfTipoCant: PresupConfTipoCant })
        .send({ PresupConfTipoDesc: PresupConfTipoDesc })
        .send({ PresupConfTipoRubro: PresupConfTipoRubro })
        .send({ PresupConfTipoImprime: PresupConfTipoImprime })
        .send({ PresupConfTipoMinMOT: PresupConfTipoMinMOT })
        .then(function () { })
        .catch((err) => CodigoError(err));
}
