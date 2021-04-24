import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";

export function stkGrupoModificar(props) {
  const { StkGrupoAbr, StkGrupoDesc, StkGrupoContRubro, idStkGrupo } = props;

  const url = IpServidor + "/stkgrupomodificar/?id=" + idStkGrupo;
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ StkGrupoDesc: StkGrupoDesc })
    .send({ StkGrupoAbr: StkGrupoAbr })
    .send({ StkGrupoContRubro: StkGrupoContRubro }) // Esto va a ser Cero inicialmente.
    .then(function () { });
}
