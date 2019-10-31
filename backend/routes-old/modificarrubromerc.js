var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada");
    } else {
        console.log("no se conecto");
    }
});



var router = express();



var router = express();


router.post('/?:id', function(req, res, next) {
 indice = req.params.id;

 descr = req.body.RubroMercDesc;
 

console.log('indice  ', indice);
   // conexion.query('Select * from TipoMonedas where idTipoMonedas = "' + indice + '"',
    conexion.query('UPDATE RubroMerc SET RubroMercDesc = "' + descr + '" WHERE idRubroMerc = ' + indice ,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
                };
            });
        });


module.exports = router;