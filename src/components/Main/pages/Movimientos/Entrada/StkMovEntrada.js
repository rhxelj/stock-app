import React, { useState, useEffect } from "react";
import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

function StkMovEntrada() {
  const [state, setState] = useState();

  useEffect(() => {
    console.log("corri useeffect");
    stkgrupoleer();
  }, []);

  // Lee Grupo
  const stkgrupoleer = _ => {
    const url = IpServidor + "/stkgrupoleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkgrupo = JSON.parse(res.text);
        setState({ ...state, stkgrupo: stkgrupo });
      });
  };

  const grupo = state.map(grupo => {
    return <h1>{grupo}</h1>;
  });
  return (
    <div>
      Refactoring!!!!! Contenido de Grupo
      <br></br>
      {JSON.stringify(state)}
      {/* {JSON.stringify(state.stkgrupo)} */}
      {/* {state.stkgrupo[0][0]} */}
    </div>
  );
}

export default StkMovEntrada;
