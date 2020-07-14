import request from "superagent";
import IpServidor from "../../../../VariablesDeEntorno";

export function descargaStock(props) {
  return new Promise((resolve, reject) => {
    const {
      StkItems,
      StkItemsGrupo,
      StkItemsRubro,
      total,
      StkItemsCantDisp,
    } = props;

    console.log("descargo stock..... ");
    console.log("Contenido en descargaStock ", props);
    const url =
      IpServidor +
      "/stkitemsmoddisp/?StkItems=" +
      StkItems +
      "&StkItemsGrupo=" +
      StkItemsGrupo +
      "&StkItemsRubro=" +
      StkItemsRubro;
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ total: Number(total) })
      .send({ StkItemsCantDisp: StkItemsCantDisp });
    // .then((res) => {
    //   // const total1 = JSON.parse(res.text)
    //   //this.setState({marcaver:true})
    // });

    if (total > 0) {
      const url1 = IpServidor + "/stkmovvtaagregar";
      request
        .post(url1)
        .set("Content-Type", "application/json")
        .send({ StkMovVtaCantidad: total })
        .send({ StkMovVtaItem: StkItems })
        .send({ StkMovVtaGrupo: StkItemsGrupo })
        .send({ StkMovVtaRubro: StkItemsRubro });
      //   .then(function(res) {
      //     // res.body, res.headers, res.status
      //   });
    }
    resolve();
  });
}
