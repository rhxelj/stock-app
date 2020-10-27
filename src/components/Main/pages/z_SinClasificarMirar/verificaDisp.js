import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";

export function verificaDisp(props) {
  const TConfec = props.indice;
  const { cantidad, largo, ancho, StkItemsCantDisp } = props;
  return new Promise((resolve, reject) => {
    // var cant = Number(this.state.cantidad);
    // var larg = Number(this.state.largo);
    // var anch = Number(this.state.ancho);
    const url = IpServidor + "/stkverificadisp";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cant: Number(cantidad) }) //Le agrego Number(cantidad) en vez de cantidad por viene como texto y lo necesito com numero
      .send({ larg: Number(largo) })
      .send({ anch: Number(ancho) })
      .send({ StkItemsCantDisp: StkItemsCantDisp })
      .send({ TConfec: TConfec })
      .then((res) => {
        const faltantev = JSON.parse(res.text);
        //   this.setState({ datostraid: faltantev });
        //   this.setState({ marcaver: true });
        //   this.setState({ faltante: this.state.datostraid[0] });
        //   this.setState({ total: this.state.datostraid[1] });
        console.log("faltantev en verificaDisp => ");
        console.log(faltantev);
        resolve(faltantev);
      });
  });

  //   console.log("props en verificaDisp");
  //   console.log(props);

  //   console.log("cantidad = ");
  //   console.log(typeof Number(cantidad));
}
