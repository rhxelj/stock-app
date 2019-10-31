var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


var http = require('http');
conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkenvaseleeimp");
    } else {
        console.log("no se conecto en stkenvaseleeimp");
    }
});

/*
idStkItems
*/

var router = express();




router.get('/', function(req, res, next) {
    //?:id/?:id2
    StkEnvaseUbG = req.query.id;
  // conexion.query('Select idStkEnvase, StkGrupo.StkGrupoDesc, StkRubro.StkRubroDesc, StkItems.StkItemsDesc, StkEnvaseCant, StkEnvaseFechaAct, StkEnvaseUb, StkEnvaseObserv from StkEnvase, StkItems, StkGrupo, StkRubro where (StkEnvase.StkEnvaseGrupo = StkGrupo.idStkGrupo) and (StkEnvase.StkEnvaseRubro = StkRubro.idStkRubro) and (StkEnvase.StkEnvaseItem = StkItems.idStkItems) and  (StkEnvaseImprimio = "N")' , 
  conexion.query('select idStkEnvase, StkEnvaseGrupo, StkEnvaseRubro, StkEnvaseItem, StkGrupo.StkGrupoDesc,  StkRubro.StkRubroDesc, StkItems.StkItemsDesc, StkEnvasePartida, StkEnvaseUbG, StkEnvaseUbF,  date_format(StkEnvaseFechaAct, "%d-%m-%Y") as stkenvasefecha, StkEnvaseCant, StkEnvaseImprimio, StkEnvaseObserv  from StkEnvase, StkItems, StkGrupo, StkRubro' + 
  ' where (StkEnvase.StkEnvaseGrupo = StkGrupo.idStkGrupo)' +
  ' and (StkEnvase.StkEnvaseRubro = StkRubro.idStkRubro)' +
  ' and (StkEnvase.StkEnvaseItem = StkItems.idStkItems)' +
  ' and (StkRubro.StkRubroCodGrp = StkGrupo.idStkGrupo)' + 
  ' and (StkItems.StkItemsRubro = StkRubro.idStkRubro)' +
  ' and (StkItems.StkItemsGrupo = StkGrupo.idStkGrupo)' +
  ' and StkEnvaseImprimio = "N"' +
  ' and StkEnvaseUbG = "' + StkEnvaseUbG + '"',
  // conexion.query('Select * from StkEnvase where StkEnvaseImprimio = "N" ',
  function(err, result) {
    if (err) {
        console.log(err);
    } else {
        res.json(result);
    }
    }); 
    


})
module.exports = router;
