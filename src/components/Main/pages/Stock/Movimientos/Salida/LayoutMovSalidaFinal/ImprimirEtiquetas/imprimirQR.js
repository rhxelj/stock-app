import request from "superagent";
import IpServidor from "../../../../../VariablesDeEntorno";
import "react-table/react-table.css";

// import CodigoError from "../../../../../../../lib/CodigoError";
export function imprimirQr(props) {
  return new Promise(function (resolve) {
    //   const { idStkRubro, StkRubroCodGrp } = props;
    const ubicaG = props;
    // stkenvaseleeimp = (_) => {
    // const url = IpServidor + "/stkenvaseleeimp/?id=" + this.props.ubicaG;
    const url = IpServidor + "/stkenvaseleeimp/?id=" + ubicaG;
    console.log("ubicacion a imprimir", ubicaG);
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const envaseimp = JSON.parse(res.text);
        // this.setState({envaseimp: envaseimp})
        // console.log("envaseimp dendtro de stkenvaseleeimp : ");
        console.log(envaseimp);
        // this.setState(() => {
        //   return { envaseimp: envaseimp };
        // });
      });
    //   .catch((err) => CodigoError(err));
    console.log("envio la impresion ......");
    resolve();
  });
}
