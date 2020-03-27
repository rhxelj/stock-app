import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";
import CodigoError from "../../../../../lib/CodigoError";
import React, { useEffect } from "react";

import { stkitemsmodstock } from '../../Items/StkItemsModStock';
import {stkenvaseagregar } from '../../../Stock/Envase/StkEnvaseAgregar';
import {stkitemsleedisp } from '../../../Stock/Items/StkItemsLeeDisp';
// export const agregaStock = _ => {


export function agregaStock(state) {
  // async function stkitemsmodifstock(state) {
  //   const result = await stkitemsmodstock(state);
  // }
  
  const modificarstock = async state => {
    stkitemsmodstock(state);
    
  };
  

  const agregaenvase = async state => {
    stkenvaseagregar(state);
    
  };

  const leedisponibilidad = async state => {
   
    const disponibilidad = await  stkitemsleedisp(state);
 
  };
  const actions = {
    modificarstock: () => modificarstock(state).then(console.log("Cambio efectuado")),
    agregaenvase: () => agregaenvase(state), //cancelar(state)
    leedisponibilidad: () => leedisponibilidad(state)
  };


  // const url =
  //   IpServidor +
  //   "/stkitemsmodstock/?idStkItems=" +
  //   state.idStkItems +
  //   "&idStkGrupo=" +
  //   state.idStkGrupo +
  //   "&idStkRubro=" +
  //   state.idStkRubro;

  // request
  //   .post(url)
  //   .set("Content-Type", "application/json")
  //   .send({ cantidad: state.cantidad })
  //   .send({ StkRubroPres: state.StkRubroPres })
  //   .send({ StkEnvaseUbG: state.StkEnvaseUbG })
  //   .catch(err => {CodigoError(err)});
 

  // const url1 =
 
  //   IpServidor +
  //   "/stkenvaseagregar/?idStkItems=" +
  //   state.idStkItems +
  //   "&idStkGrupo=" +
  //   state.idStkGrupo +
  //   "&idStkRubro=" +
  //   state.idStkRubro;
  
  // request
  //   .post(url1)
  //   .set("Content-Type", "application/json")
  //   .send({ cantidad: state.cantidad })
  //   .send({ StkRubroPres: state.StkRubroPres })
  //   .send({ StkEnvasePartida: state.StkEnvasePartida })
  //   .send({ StkEnvaseUbG: state.StkEnvaseUbG })
  //   .send({ StkEnvaseUbF: state.StkEnvaseUbF })
  //   .send({ StkEnvaseObserv: state.StkEnvaseObserv })
   
  //   .then(res => {
  //   })
  //   .catch(err => {CodigoError(err)});
  
 return(
  <  >
  {/* <Grid container item spacing={2} justify="flex-end"> */}
  <div actions={actions}></div>
  {/* </Grid> */}
</>
); 
 
}
