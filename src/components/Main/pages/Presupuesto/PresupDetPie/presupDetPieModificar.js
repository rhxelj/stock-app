import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";


export function presupDetPieModificar(props) {
<<<<<<< Updated upstream
    const {
        idPresupDetPie,
        PresupDetPieLeyenda

=======
    console.log('props en modificar   ', props)
    const {
        idPresupDetPie,
        PresupDetPieLeyenda,
        PresupDetPieSelec
>>>>>>> Stashed changes
    } = props;

    const url = IpServidor + "/presupdetpiemodificar/?id=" + idPresupDetPie;
    request
        .post(url)
        .set("Content-Type", "application/json")
        .send({ PresupDetPieLeyenda: PresupDetPieLeyenda })
<<<<<<< Updated upstream
=======
        .send({ PresupDetPieSelec: PresupDetPieSelec })
>>>>>>> Stashed changes
        .then(function (res) { });
}
