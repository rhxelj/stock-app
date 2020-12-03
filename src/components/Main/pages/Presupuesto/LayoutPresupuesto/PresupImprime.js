import request from "superagent";

import IpServidor from '../../VariablesDeEntorno'
import CodigoError from '../../../../lib/CodigoError'
// Lee Rubro por codigo de gupo

export const PresupImprime = (props) => {
    console.log('props ', props)

    //     ImpItem: 313.632
    // ImpItemCAnexos: 0
    // ImpUnitario: 313.632
    // PresupAncho: 0
    // PresupCantidad: 1
    // PresupLargo: 0
    // StkRubroDesc:
    const url = IpServidor + "/imppresup";
    console.log('vino a impresion ', url)
    request
        .post(url)
        .set("Content-Type", "application/json")
        .send({ datospresup: props })
        .catch((err) => CodigoError(err));


    // .then((res) => {
    //     const respuesta = JSON.parse(res.text);
    // });

}
