var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


var http = require('http');
conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkenvaseleeimp");
    } else {
        console.log("no se conecto en stkenvaseleeimp");
    }
});

/*
idStkItems
*/

var router = express();




router.post('/', async function(req, res, next) {
    //?:id/?:id2
    StkEnvaseUbG = req.query.id;
 console.log('StkEnvaseUbG ')
 console.log(StkEnvaseUbG)
    conexion.query('UPDATE StkEnvase SET StkEnvaseImprimio = "S"  WHERE StkEnvaseImprimio = "N"' +
            ' and StkEnvaseUbG = "' + StkEnvaseUbG + '"',
            function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
    }); 
    


})
module.exports = router;
