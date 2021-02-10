var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

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
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length

      datosrec.map(datos => {
        //  cantidad = datos.cantidad;
        StkRubroAbrP = datos.StkRubroAbr;
        largo = datos.largo * 1 + 0.12
        ancho = datos.ancho * 1 + 0.12
        minutosunion = ancho * largo * 5
        enteroancho = Math.trunc(ancho / 1.50)
        decimancho = (ancho / 1.5) - enteroancho
        if (decimancho < 0.50) {
          ancho = enteroancho + 0.50
        }
        else {
          ancho = enteroancho + 1
        }
        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
        }
        else {
          coeficiente = result[0].coeficientemin
        }
        // minutosunion = (datos.ancho + 0.12) * datos.largo * 5
        // minutosunion = ancho * largo * 5
        if (datos.minmay == 'my') {
          q = ['Select ',
            'StkRubroDesc, StkRubroAbr, ',
            '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
            //         ' * ', cantidad,
            ' * ', ancho,
            ' * ', largo, ')',
            '+ (REPValorMOT / 60 * ', minutosunion, ')',
            ') as ImpUnitario, ',
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
            ') as ImpUnitario, ',
            'StkRubroCosto, ',
            'StkMonedasCotizacion,',
            'REPValorMOTLA ',
            'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ',
            'reparacion.parametrosrep ',
            'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
            'and StkRubro.StkRubroTM = idStkMonedas '
          ].join('')
        }
        conexion.query(
          q,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              result[0].Detalle = "Lona con fajas en el perímetro en : "
              result[0].Largo = largo
              result[0].Ancho = ancho
              datosenvio.push(result)
              i++
              if (i === totalreg) {
                res.json(datosenvio)
                datosenvio = []
              }
            }
          })
      })
    })
});


conexion.end
module.exports = router;