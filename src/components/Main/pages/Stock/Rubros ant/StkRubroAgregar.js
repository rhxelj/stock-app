import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function agregarRubros(props) {
  return new Promise(function(resolve, reject) {
   
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
      StkRubroTM,
    } = props;

    function codigo() {
      var url = IpServidor + "/stkrubroleeultnro/?id=" + StkRubroCodGrp;
      console.log("url =>", url);
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then((res) => {
          const codigorubro = JSON.parse(res.text);
          const rubroNuevo = codigorubro[0].CodRubroNuevo;
          agregarRubro(rubroNuevo);
        });
    }
    console.log('StkRubroAncho  ', StkRubroAncho)
    function agregarRubro(rubroNuevo) {
      const url = IpServidor + "/stkrubroagregar/";
      request
        .post(url)
        .set("Content-Type", "application/json") // .send({ idStkRubro: this.state.idStkRubro }) este lo genero en el back-end
        .send({ idStkRubro: rubroNuevo })
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
        // .then(
        // )
        .catch((err) => CodigoError(err));
      resolve();
    }
    codigo();
  });
}