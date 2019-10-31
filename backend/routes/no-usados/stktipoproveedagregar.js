var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('./conexion');


moment.locale('es');

//router = express();
conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stktipoproveedagregar");
    } else {
        console.log("no se conecto en stktipoproveedagregar");
    }
});



router.post('/', function(req, res) {

  var registro = {
//    idStkTipoProveed : req.body.idStkTipoProveed,
    StkTipoProveedDesc : req.body.StkTipoProveedDesc.toUpperCase(),
   

  }
    console.log(registro);
    var saludo = '';



        conexion.query('INSERT INTO StkTipoProveed SET ?', registro, 
        function(err, result) {
            if (err) {
                if (err.errno == 1062) 
                     {
                        return res.status(409).send({message : "error clave duplicada"});
                    }
                else
                if (err.errno == 1406 || err.errno == 1264) 
                {
                    return res.status(410).send({message : "Texto demasiado largo"});
                   }
               {
                   console.log (err.errno);
               }
        }
            else {
                res.json(result.rows);
            }
        });
});




module.exports = router;