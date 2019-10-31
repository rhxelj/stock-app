var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('./conexion');
var mysql = require('mysql');

var router = express();
conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stktipoproveedborrar");
    } else {
        console.log("no se conecto en stktipoproveedborrar");
    }
});


router.delete('/?:id', function(req, res, next) {
    indice = req.params.id;


  conexion.query('delete from StkTipoProveed where idStkTipoProveed = ' + indice, 
                                         function(err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                res.json(result.rows);
                                            }
                                        }); 
                                    });   

module.exports = router;
