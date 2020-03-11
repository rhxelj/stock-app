import request from "superagent";
import React, { useState, useEffect } from "react";
import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleecodgryrb = (idStkGrupo, idStkRubro) => {
  return new Promise(resolve => {
    if (idStkGrupo !== 0 && idStkRubro !== 0) {
      const url =
        IpServidor +
        "/stkrubroleecodgryrb/?idStkRubro=" +
        idStkRubro +
        "&idStkGrupo=" +
        idStkGrupo;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then(res => {
          const stkrubroele = JSON.parse(res.text);
          resolve(stkrubroele);
        });
    }
  });
};
