var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkitemsmodificar");
    } else {
        console.log("no se conecto en stkitemsmodificar");
    }
});

/*
idStkItems
*/

var router = express();



router.post('/', async function(req, res, next) {
   var d = new Date()
   finalDate = d.toISOString().split('T')[0]
var idStkItems = req.query.id1;
var StkItemsGrupo = req.query.id2;
var StkItemsRubro = req.query.id3;
var StkItemsDesc = req.body.StkItemsDesc;
var StkItemsCantidad = req.body.StkItemsCantidad;
var StkItemsCantDisp = req.body.StkItemsCantDisp;
var StkItemsFAct = finalDate;
var StkItemsMin = req.body.StkItemsMin;
var StkItemsMax = req.body.StkItemsMax;

    conexion.query('UPDATE StkItems SET StkItemsDesc = "' + StkItemsDesc +
                                     '", StkItemsCantidad = ' + StkItemsCantidad + 
                                     ', StkItemsCantDisp = ' + StkItemsCantDisp + 
                                     ', StkItemsFAct = "' + StkItemsFAct + 
                                     '", StkItemsMin = ' + StkItemsMin + 
                                     ', StkItemsMax = ' + StkItemsMax +
                                     ' WHERE idStkItems = ' + idStkItems + ' and StkItemsGrupo = ' + StkItemsGrupo + ' and  StkItemsRubro = ' + StkItemsRubro,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                };
            });
        });


module.exports = router;