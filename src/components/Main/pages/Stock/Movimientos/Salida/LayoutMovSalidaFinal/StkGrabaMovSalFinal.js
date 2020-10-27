import request from "superagent";

import IpServidor from "../../../../VariablesDeEntorno";
import CodigoError from "../../../../../../lib/CodigoError";
// Lee Rubro por codigo de gupo

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// toast.configure();
import Mensaje from "../../../../../../lib/Mensaje";

export const stkGrabaMovSalFinal = (
  StkItemsGrupo,
  StkItemsRubro,
  idStkItems,
  nuevacantstock,
  nuevacantdisp
) => {
  const url = IpServidor + "/stkgrabamovsalfinal";
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ StkItemsGrupo: StkItemsGrupo })
    .send({ StkItemsRubro: StkItemsRubro })
    .send({ idStkItems: idStkItems })
    .send({ nuevacantstock: nuevacantstock })
    .send({ nuevacantdisp: nuevacantdisp })
    // .set("X-API-Key", "foobar")
    .then(function (res) {
      const respuesta = JSON.parse(res.text);
      if (respuesta.affectedRows !== 0)
        Mensaje("success", "Grabo Movimento Salida");
      // alert("EXITO");
      //
      else Mensaje("error", "No Grabo Movimento Salida");
    })
    .catch((err) => CodigoError(err));
};
