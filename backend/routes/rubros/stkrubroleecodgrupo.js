var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkrubroleecodgrupo");
    } else {
        console.log("no se conecto en stkrubroleecodgrupo");
    }
});




var router = express();

router.get('/?:id', function(req, res, next) {
    indice = req.params.id;
    conexion.query('Select * from StkRubro where StkRubroCodGrp = ' + indice, 
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
  

});

module.exports = router;