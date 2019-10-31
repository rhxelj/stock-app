var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stktipoproveedmodificar");
    } else {
        console.log("no se conecto en stktipoproveedmodificar");
    }
});



var router = express();



var router = express();
console.log('estamos aca');

router.post('/?:id', function(req, res, next) {
 indice = req.params.id;

 descr = req.body.StkTipoProveedDesc.toUpperCase();
 

   // conexion.query('Select * from TipoMonedas where idTipoMonedas = "' + indice + '"',
    conexion.query('UPDATE StkTipoProveed SET StkTipoProveedDesc = "' + descr + '" WHERE idStkTipoProveed = ' + indice ,
        function(err, result) {
            if (err)  {
                 if (err.errno == 1062) 
                    {
                return res.status(409).send({message : "error clave duplicada"});
                    }
                else
                 if (err.errno == 1406 || err.errno == 1264) 
                    {
                     return res.status(410).send({message : "Texto demasiado largo"});
                    }
                else
                    {
                        console.log (err.errno);
                    }
                }

             else {
                res.json(result);
                };
            });
        });


module.exports = router;