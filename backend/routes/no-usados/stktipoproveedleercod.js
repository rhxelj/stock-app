var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos en stktipoproveedleercod");
    } else {
        console.log("no se conecto en stktipoproveedleercod");
    }
});




var router = express();

router.get('/?:id', function(req, res, next) {
    indice = req.params.id;
    conexion.query('Select * from StkTipoProveed where idStkTipoProveed = ' + indice, 
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
  

});

module.exports = router;