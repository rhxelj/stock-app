var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('../conexion');

var nroitem = 0;


moment.locale('es');

conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkitemsagregar");
    } else {
        console.log("no se conecto en stkitemsagregar");
    }
});


//SELECT max(idStkItems) FROM BasesGenerales.StkItems  where StkItemsRubro = 10 and StkItemsGrupo = 1;
//select hecho en mysql para buscar el item más grande y agregar 1

router.post('/', async function(req, res) {
    var StkItemsGrupo = req.query.id2;
    var StkItemsRubro = req.query.id3;
 
  conexion.query('Select max(idStkItems) as UltItem from StkItems where StkItemsGrupo  = ' + StkItemsGrupo  + ' and  StkItemsRubro  = ' + StkItemsRubro, 
  function(err, result) {
    if (err) {
        if (err.errno === 1054) {
            nroitem = 1;
        }
        else {
        console.log('error al buscar el último  ' + err.errno);
        console.log(err);}
    } else {
        res.json(result);
      nroitem = result[0].UltItem + 1;
     }

     var d = new Date()
     finalDate = d.toISOString().split('T')[0]
     //+' '+d.toTimeString().split(' ')[0];

      var registro = {
        idStkItems : nroitem,
        StkItemsGrupo : StkItemsGrupo,
        StkItemsRubro : StkItemsRubro,
        StkItemsDesc : req.body.StkItemsDesc.toUpperCase(),
        StkItemsCantidad : req.body.StkItemsCantidad,
        StkItemsCantDisp : req.body.StkItemsCantidad,
        StkItemsFAct : finalDate,
        StkItemsMin : req.body.StkItemsMin,
        StkItemsMax: req.body.StkItemsMax,
      
    }
    conexion.query('INSERT INTO StkItems SET ?', registro, 
        function(err, result) {
            if (err) {
                console.log('ERROR ');
                console.log(err.errno);
            } else {
                res.json(result.rows);
            
            }
        });
    })
});




module.exports =router;