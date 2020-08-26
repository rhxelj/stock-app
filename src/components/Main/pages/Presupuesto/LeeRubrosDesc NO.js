import CodigoError from '../../../lib/CodigoError';
import IpServidor from '../VariablesDeEntorno'
import request from "superagent";
// import { resolve } from "dns";

export const leerubrosdesc = () => {
  return new Promise((resolve) => {
    const url = IpServidor + "/stkrubroleerdesc";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const rubrodesc = JSON.parse(res.text);
        resolve(rubrodesc);
      });
  });
};
