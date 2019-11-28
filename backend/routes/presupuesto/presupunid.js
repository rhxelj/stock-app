var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var param = require('../parametros')

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupunid");
  } else {
    console.log("no se conecto en presupunid");
  }
});

var datosenvio = []
var router = express();
router.get('/',  (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = ''
  datosrec = JSON.parse(req.query.datoscalculo)
  totalreg = datosrec.length

datosrec.map(datos => {  
      cantidad = datos.cantidad;
      StkRubroAbrP = datos.StkRubroAbr;
      if (datos.minmay == 1) 
        {
          coeficiente = param.coeficientemay
        }
        else 
        {
          coeficiente = param.coeficientemin
        }
     
        q = ['Select',
                      'StkRubroDesc, ',
                      '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ' ) as ImpUnitario, ', 
                      '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ' * ', cantidad, ' ) as ImpItem, ', 
                      'StkRubroCosto,',
                      'StkMonedasCotizacion',
                      'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ', 
                      'reparacion.parametrosrep ',
                      'where StkRubro.StkRubroAbr = "', StkRubroAbrP,'" ', 
                      'and StkRubro.StkRubroTM = idStkMonedas',
           ].join(' ')  
        conexion.query(
                 q,              
                      function(err, result) {
                      if (err) {
                          console.log('error en mysql')
                          console.log(err)
                          } 
                          else {
                           datosenvio.push(result)
                           i++ 
                            if (i === totalreg)
                            {
                              res.json(datosenvio)
                              datosenvio = []
                            }
                          }
                  })
  })
});


conexion.end
module.exports = router;