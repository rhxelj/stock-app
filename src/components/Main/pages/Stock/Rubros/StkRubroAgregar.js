import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function agregarRubros(props) {
  const {
    idStkRubro,
    var2,
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
        //   this.setState({ codigorubro: codigorubro })
        //   this.add(codigorubro[0].CodRubroNuevo);
        // console.log("codigorubro > ", codigorubro);
        const rubroNuevo = codigorubro[0].CodRubroNuevo;
        // console.log("rubroNuevo", rubroNuevo);
        agregarRubro(rubroNuevo);
      });
  }

  function agregarRubro(rubroNuevo) {
    const url = IpServidor + "/stkrubroagregar/";

    console.log("agregarRubro -> rubroNuevo", rubroNuevo);
    console.log("agregarRubro -> StkRubroCodGrp", StkRubroCodGrp);
    console.log("agregarRubro -> StkRubroDesc", StkRubroDesc);
    console.log("agregarRubro -> StkRubroAbr", StkRubroAbr);
    console.log("agregarRubro -> StkRubroProv", StkRubroProv);
    console.log("agregarRubro -> StkRubroAncho", StkRubroAncho);
    console.log("agregarRubro -> StkRubroPresDes", StkRubroPresDes);
    console.log("agregarRubro -> StkRubroPres", StkRubroPres);
    console.log("agregarRubro -> StkRubroUM", StkRubroUM);
    console.log("agregarRubro -> StkRubroCosto", StkRubroCosto);
    console.log("agregarRubro -> StkRubroTM", StkRubroTM);

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
      .then(function(res) {
        const var2 = "anduvo";
      })
      .catch((err) => CodigoError(err));
  }

  codigo();
}
