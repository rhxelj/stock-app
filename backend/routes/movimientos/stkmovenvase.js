var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkmvenvase");
    } else {
        console.log("no se conecto en stkmvenvase");
    }
});

/*
idStkItems
*/

var router = express();



router.post('/', async function(req, res, next) {
 //?:id/?:id2
var idStkItems = req.query.id1;
var StkItemsGrupo = req.query.id2;
var StkItemsRubro = req.query.id3;
var envase = req.query.id4;

var cantidad = req.body.cantidad2;
var cantidad1 = req.body.cantidad3;
var cantmod =  (cantidad * cantidad1 * -1);
var d = new Date()
finalDate = d.toISOString().split('T')[0]
var StkItemsFAct = finalDate;
// Desde Postman http://localhost:4000/stkmovsalfinal?id1=1&id2=1&id3=1
 
 

        conexion.query('UPDATE StkEnvase SET StkEnvaseCant = (StkEnvaseCant + ' + cantmod + 
                                     '), StkEnvaseFechaAct = "'+ StkItemsFAct + 
                                      '" WHERE  idStkEnvase = ' + envase + ' and StkEnvaseItem = ' + idStkItems + ' and  StkEnvaseGrupo = ' + StkItemsGrupo + ' and  StkEnvaseRubro = ' + StkItemsRubro,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                };
            });


        });
    //    UPDATE `BaseStock`.`StkEnvase` SET `StkEnvaseCant`='10.00' WHERE `idStkEnvase`='153' and`StkEnvaseGrupo`='1' and`StkEnvaseRubro`='1' and`StkEnvaseItem`='1';

module.exports = router;