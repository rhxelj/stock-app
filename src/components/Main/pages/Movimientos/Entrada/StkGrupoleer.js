import IpServidor from "../../VariablesDeEntorno";
import { useState } from "react";
import request from "superagent";

var [stkgrupo, setstkgrupo] = useState();

const stkgrupoleer = _ => {
  const url = IpServidor + "/stkgrupoleer";
  request
    .get(url)
    .set("Content-Type", "application/json")
    .then(res => {
      const stkgrupo = JSON.parse(res.text);

      setstkgrupo({ stkgrupo: stkgrupo });
    });
  return stkgrupo;
};
export default stkgrupoleer;
