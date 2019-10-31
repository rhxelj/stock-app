var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('./conexion');
var gencodrubro = require('./stkgennrorubro');
var ultnrorubro = require('./stkleeultnrorubro')


moment.locale('es');

conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkrubroagregar");
    } else {
        console.log("no se conecto en stkrubroagregar");
    }
});

router.all('/', function(req, res) {
    codgrupo = req.query.id;
  
    gencodrubro.buscacodigo(codgrupo);
    ultnrorubro.codigorubronuevo(codgrupo);
  var registro = {
      idStkRubro        : codrubro,
      StkRubroCodGrp    : codgrupo,
      StkRubroDesc      : req.body.StkRubroDesc.toUpperCase(),
      StkRubroAbr       : req.body.StkRubroAbr.toUpperCase(),
      StkRubroProv      : req.body.StkRubroProv,
      StkRubroAncho     : req.body.StkRubroAncho,
      StkRubroPresDes   : req.body.StkRubroPresDes.toUpperCase(),
      StkRubroPres      : req.body.StkRubroPres,
      StkRubroUM        : req.body.StkRubroUM,
      StkRubroCosto     : req.body.StkRubroCosto,
      StkRubroTM        : req.body.StkRubroTM
    }
      conexion.query('INSERT INTO StkRubro SET ?', registro, 
        function(err, result) {
            if (err) {
                if (err.errno == 1062) 
                     {
                         return res.status(460).send({message : "error clave duplicada"});
                        }
                  else 
                  if (err.errno == 1406 || err.errno == 1264) 
                     {
                         return res.status(410).send({message : "Abreviatura con más de cinco letras"});
                        }
                    {
                        console.log (err.errno);
                    }
                }
            else {
                res.json(result);
            }
        });
     
       
});


module.exports = router;
