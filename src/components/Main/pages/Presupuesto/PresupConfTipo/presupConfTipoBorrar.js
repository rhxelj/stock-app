import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import CodigoError from "../../../../lib/CodigoError";

export function presupConfTipoBorrar(props) {
    const { idPresupConfTipo } = props;
    const url = IpServidor + "/presupconftipoborrar/" + idPresupConfTipo;
    request
        .delete(url)
        .set("Content-Type", "application/json")
        .then(function () { })
        .catch((err) => CodigoError(err));
}
