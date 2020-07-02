var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var param = require('../parametros')

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuppu");
  } else {
    console.log("no se conecto en presuppu");
  }
});

var datosenvio = []
var router = express();
router.get('/', (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = '', largo = 0.00, ancho = 0.00
  var enteroancho = 0, decimancho = 0.00
  datosrec = JSON.parse(req.query.datoscalculo)
  totalreg = datosrec.length

  datosrec.map(datos => {
    //  cantidad = datos.cantidad;
    StkRubroAbrP = datos.StkRubroAbr;
    largo = datos.largo * 1 + 0.12
    ancho = datos.ancho * 1 + 0.12
    minutosunion = ancho * largo * 5
    console.log(datos.largo)
    console.log(datos.ancho)
    console.log(largo)
    console.log(ancho)
    enteroancho = Math.trunc(ancho / 1.50)
    decimancho = (ancho / 1.5) - enteroancho
    if (decimancho < 0.50) {
      ancho = enteroancho + 0.50
    }
    else {
      ancho = enteroancho + 1
    }
    if (datos.minmay == 'my') {
      coeficiente = param.coeficientemay
    }
    else {
      coeficiente = param.coeficientemin
    }
    // minutosunion = (datos.ancho + 0.12) * datos.largo * 5
    // minutosunion = ancho * largo * 5
    console.log('minutosunion  ', minutosunion)
    console.log(ancho)
    console.log(largo)
    if (datos.minmay == 'my') {
      q = ['Select ',
        'StkRubroDesc, StkRubroAbr, ',
        '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
        //         ' * ', cantidad,
        ' * ', ancho,
        ' * ', largo, ')',
        '+ (REPValorMOT / 60 * ', minutosunion, ')',
        ') as ImpItem, ',
        'StkRubroCosto, ',
        'StkMonedasCotizacion,',
        'REPValorMOT ',
        'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ',
        'reparacion.parametrosrep ',
        'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
        'and StkRubro.StkRubroTM = idStkMonedas '
      ].join('')
    }
    else {
      q = ['Select ',
        'StkRubroDesc, ',
        '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
        //     ' * ', cantidad,
        ' * ', ancho,
        ' * ', largo, ') ',
        '+ (REPValorMOTLA / 60 * ', minutosunion, ')',
        ') as ImpItem, ',
        'StkRubroCosto, ',
        'StkMonedasCotizacion,',
        'REPValorMOTLA ',
        'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ',
        'reparacion.parametrosrep ',
        'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
        'and StkRubro.StkRubroTM = idStkMonedas '
      ].join('')
    }
    console.log(q)
    conexion.query(
      q,
      function (err, result) {
        if (err) {
          console.log('error en mysql')
          console.log(err)
        }
        else {
          datosenvio.push(result)
          console.log(result)
          i++
          if (i === totalreg) {
            res.json(datosenvio)
            console.log('datosenvio  ', datosenvio)
            datosenvio = []
          }
        }
      })
  })
});


conexion.end
module.exports = router;