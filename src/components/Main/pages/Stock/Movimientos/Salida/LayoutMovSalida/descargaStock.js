import request from "superagent";
import IpServidor from "../../../../VariablesDeEntorno";

export function descargaStock(props) {
  return new Promise((resolve, reject) => {
    const {
      idStkItems,
      idStkGrupo,
      idStkRubro,
      total,
      StkItemsCantDisp,
    } = props;

    console.log("descargo stock..... ");
    console.log("Contenido en descargaStock ", props);

    const url =
      IpServidor +
      "/stkitemsmoddisp/?StkItems=" +
      idStkItems +
      "&StkItemsGrupo=" +
      idStkGrupo +
      "&StkItemsRubro=" +
      idStkRubro;
    console.log("URL es : ", url);
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ total: Number(total) })
      .send({ StkItemsCantDisp: StkItemsCantDisp })
      .then((res) => {
        console.log("volvio del Backend y el valor de res es : ", res); // const total1 = JSON.parse(res.text)
        //this.setState({marcaver:true})
      });

    if (total > 0) {
      const url1 = IpServidor + "/stkmovvtaagregar";
      request
        .post(url1)
        .set("Content-Type", "application/json")
        .send({ StkMovVtaCantidad: total })
        .send({ StkMovVtaItem: idStkItems })
        .send({ StkMovVtaGrupo: idStkGrupo })
        .send({ StkMovVtaRubro: idStkRubro });
      //   .then(function(res) {
      //     // res.body, res.headers, res.status
      //   });
    }
    resolve();
  });
}
