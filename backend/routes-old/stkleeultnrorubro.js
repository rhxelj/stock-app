var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('./conexion');

moment.locale('es');

conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkleeultnrorubro");
    } else {
        console.log("no se conecto en stkleeultnrorubro");
    }
});

function codigorubronuevo(codigogen) {
   conexion.query('Select StkGrupoContRubro as CuentaRubro from StkGrupo where idStkGrupo = ' + codigogen,
  function(err, result) {
      if (err) {
        console.log('Error  Select StkGrupoContRubro as CuentaRubro from StkGrupo');
          console.log(err);
      } else {
        codrubro = result[0].CuentaRubro;
      }
    });
    return codrubro;
    
}
exports.codigorubronuevo=codigorubronuevo;
