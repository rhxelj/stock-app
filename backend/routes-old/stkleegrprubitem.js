var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkgrupoleercod");
    } else {
        console.log("no se conecto en stkgrupoleercod");
    }
});
var GrupoDescripcion = ''

function leegrupo(codgrupo)

{
 
  conexion.query('Select StkGrupoDesc as GrupoDesc from StkGrupo  where idStkGrupo = ' + codgrupo,
    function(err, result) {
        if (err) {
            console.log('Error LEER StkGrupo');
            console.log(err); 

        } else {
            GrupoDescripcion = result[0].GrupoDesc;
            console.log(GrupoDescripcion)
        }
    });
    return GrupoDescripcion
}

exports.GrupoDescripcion;
//exports.leegrupo=leegrupo;



