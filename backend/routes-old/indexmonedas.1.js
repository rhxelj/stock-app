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

router.get('/', function(req, res, next) {
//where idProveedores = 110 
var suma = 0.00;
var total = 1.00;
var totalreg = 0;
    conexion.query('select count(*) as total from BasesGenerales.TipoMonedas',
    function(err, result) {
        if (err) {
            console.log(err);
        } else {
            totalreg = result[0].total;
            console.log('total  ' + result[0].total);
        }
    });
    conexion.query('Select * from TipoMonedas order by idTipoMonedas ' ,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
            
                for (paso = 0; paso < totalreg; paso++)   {
                    console.log(result[paso].idTipoMonedas);
                    suma = suma + result[paso].TipoMonedasCotizacion;
                };
                res.json(result);
                console.log(suma);

            }
        });
    conexion.query('select sum(TipoMonedasCotizacion) as total from BasesGenerales.TipoMonedas' ,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {

             console.log((JSON.parse(JSON.stringify(result[0].total))));
      

            }
        }); 

});

module.exports = router;