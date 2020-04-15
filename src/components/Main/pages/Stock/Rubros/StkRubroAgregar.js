import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function agregarRubros(props) {
  const {
    idStkRubro,
    StkRubroCodGrp,
    StkRubroDesc,
    StkRubroAbr,
    StkRubroProv,
    StkRubroAncho,
    StkRubroPresDes,
    StkRubroPres,
    StkRubroUM,
    StkRubroCosto,
    StkRubroTM
  } = props;

  const url = IpServidor + "/stkrubroagregar/";
  request
    .post(url)
    .set("Content-Type", "application/json") // .send({ idStkRubro: this.state.idStkRubro }) este lo genero en el back-end
    // .send({ idStkRubro: nuevorubro })
    .send({ StkRubroCodGrp: StkRubroCodGrp })
    .send({ StkRubroDesc: StkRubroDesc })
    .send({ StkRubroAbr: StkRubroAbr })
    .send({ StkRubroProv: StkRubroProv })
    .send({ StkRubroAncho: StkRubroAncho })
    .send({ StkRubroPresDes: StkRubroPresDes })
    .send({ StkRubroPres: StkRubroPres })
    .send({ StkRubroUM: StkRubroUM })
    .send({ StkRubroCosto: StkRubroCosto })
    .send({ StkRubroTM: StkRubroTM })
    .then(function(res) {})
    .catch(err => CodigoError(err));
}
