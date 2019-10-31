var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkitemsmodstock");
    } else {
        console.log("no se conecto en stkitemsmodstock");
    }
});

/*
idStkItems
*/

var router = express();



router.post('/', async function(req, res, next) {
 //?:id/?:id2
var CantDisp = 0.00
var idStkItems = req.query.id1;
var StkItemsGrupo = req.query.id2;
var StkItemsRubro = req.query.id3;
var StkRubroPres = req.body.StkRubroPres;
var cantidad = req.body.cantidad;

var total = Number(cantidad) * Number(StkRubroPres)
CantDisp = Number(req.body.StkItemsCantDisp) + total
Cantidads = Number(req.body.StkItemsCantidad) + total

var d = new Date()
finalDate = d.toISOString().split('T')[0]
var StkItemsFAct = finalDate;
// Desde Postman http://localhost:4000/stkitemsmodificar?id1=1&id2=1&id3=1
 
    conexion.query('UPDATE StkItems SET StkItemsCantDisp = ' + CantDisp + 
                                        ', StkItemsCantidad = ' + Cantidads + 
                                        ', StkItemsFAct = "'+ StkItemsFAct + 
                                      '" WHERE idStkItems = ' + idStkItems + ' and  StkItemsGrupo = ' + StkItemsGrupo + ' and  StkItemsRubro = ' + StkItemsRubro,
        function(err, result) {
            if (err) 
    {
   if (err.errno == 1054) 
        {
   return res.status(414).send({message : "Faltan datos para ingresar la mercadería"});
       }
   else {
       console.log('error en stkitemsmodstock');
       console.log(err.errno);
   }}
    else {
       res.json(result.rows);
   }
});
})

module.exports = router;