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
  var coeficiente = 0, cantidad = 0.00, StkRubroAbrP = '', largo = 0, valorMOTmup = 0.00, impunion = 0.00
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }


      datosrec = JSON.parse(req.query.datoscalculo)
      totalreg = datosrec.length

      datosrec.map(datos => {
        cantidad = datos.cantidad;
        StkRubroAbrP = datos.StkRubroAbr;
        largo = datos.largo
        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
        }
        else {
          coeficiente = result[0].coeficientemin
        }

        //  minutosunion = result[0].cantminpu
        //cálculo de cantidad de metros de soldadura

        // valorMOTmup = result[0].costoMOT * coeficiente
        // valorMOTmup = result[0].costoMOT * coeficiente / 60 / 60

        //corte de la tela 120 segundos por paño independiente del largo

        //unión de los paños 150 segundos por metro de soldadura
        valorMOTmup = result[0].costoMOT * coeficiente / 60 / 60 * result[0].segsolpu

        if ((cantidad - Math.trunc(cantidad)) > 0) {
          impunion = ((((Math.trunc(cantidad))) * largo + 0.75)) * valorMOTmup
        }
        else {
          impunion = ((cantidad - 1) * largo) * valorMOTmup
        }

        q = ['Select',
          'StkRubroDesc, StkRubroAbr, ',
          '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
          ' * ', cantidad,
          ' * ', largo, ' ) + ' + impunion + ') as ImpUnitario, ',
          // ' * ', largo, ' ) + ' + impunion + ') as ImpItem, ',

          'StkRubroCosto,',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join(' ')
        conexion.query(
          q,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              result[0].Detalle = "Paños Unidos en : "
              result[0].Largo = largo
              result[0].Ancho = 0
              datosenvio.push(result)
              i++
              if (i === totalreg) {
                res.json(datosenvio)
                datosenvio = []
              }
            }
          })
      })
    });
});


conexion.end
module.exports = router;