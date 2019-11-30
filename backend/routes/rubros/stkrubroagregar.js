var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('../conexion');
var gencodrubro = require('./stkgennrorubro');
// var ultnrorubro = require('./stkleeultnrorubro')


moment.locale('es');

conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en stkrubroagregar");
    } else {
        console.log("no se conecto en stkrubroagregar");
    }
});

router.all('/',  function(req, res) {
    // codgrupo = req.query.id;
 // ultnrorubro.codigorubronuevo(codgrupo)
  codrubro = req.body.StkRubroCodGrp
   
  var registro = {
      idStkRubro        : req.body.idStkRubro,
      StkRubroCodGrp    : req.body.StkRubroCodGrp,
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
    var q = ['INSERT INTO StkRubro SET ?', registro
            ].join(' ')
      conexion.query(q, 
        function(err, result) {
            if (err) {
                if (err.errno == 1062) 
                     {
                         return res.status(460).send({message : "error clave duplicada"});
                        }
                  else 
                  if (err.errno == 1406 || err.errno == 1264) 
                     {
                         console.log(err.errno)
                         return res.status(410).send({message : "Abreviatura con más de cinco letras"});
                        }
                    {
                        console.log ('en stkrubroagregar err.errno');
                        console.log (err.errno);
                        
                    }
                }
            else {
                res.json(result);
                // return res.status(200).send({message : "Todo OK"});
            }
        });
        gencodrubro.buscacodigo(codgrupo)   
       
});

conexion.end;
module.exports = router;

