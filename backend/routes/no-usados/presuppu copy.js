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
  var coeficiente = 0, cantidad = 0.00, StkRubroAbrP = '', largo = 0, valorMOTmup = 0.00, impunion = 0.00

  datosrec = JSON.parse(req.query.datoscalculo)
  totalreg = datosrec.length

  datosrec.map(datos => {
    cantidad = datos.cantidad;
    StkRubroAbrP = datos.StkRubroAbr;
    largo = datos.largo
    if (datos.minmay == 'my') {
      coeficiente = param.coeficientemay

    }
    else {
      coeficiente = param.coeficientemin
    }
    minutosunion = param.cantminpu
    //cálculo de cantidad de metros de soldadura
    console.log('coeficiente  ', coeficiente)
    console.log('param.costoMOT  ', param.costoMOT)
    console.log('param.segsolpu  ', param.segsolpu)
    valorMOTmup = param.costoMOT * coeficiente
    console.log(valorMOTmup)
    valorMOTmup = param.costoMOT * coeficiente / 60 / 60
    console.log(valorMOTmup)
    valorMOTmup = param.costoMOT * coeficiente / 60 / 60 * param.segsolpu
    console.log(valorMOTmup)

    if ((cantidad - Math.trunc(cantidad)) > 0) {
      impunion = ((((Math.trunc(cantidad))) * largo + 0.75)) * valorMOTmup
    }
    else {
      impunion = ((cantidad - 1) * largo) * valorMOTmup
    }

    console.log('valorMOTmup   ', valorMOTmup)
    //if (cantidad )
    q = ['Select',
      'StkRubroDesc, StkRubroAbr, ',
      '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
      ' * ', cantidad,
      ' * ', largo, ' ) + ' + impunion + ') as ImpItem, ',
      // '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
      // '+ (REPValorMOT / 60 * 2 *', minutosunion, ')) ',
      // ' * ', cantidad,
      // ' * ', largo, ' ) as ImpPañoUnidoRec, ',
      'StkRubroCosto,',
      'StkMonedasCotizacion ',
      // 'REPValorMOT',
      'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
      // 'reparacion.parametrosrep ',
      'where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" ',
      'and StkRubro.StkRubroTM = idStkMonedas '
    ].join(' ')
    console.log(q)
    // q = ['Select',
    //   'StkRubroDesc, ',
    //   '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
    //   '+ (REPValorMOT / 60 * ', minutosunion, ')) ',
    //   ' * ', cantidad,
    //   ' * ', largo, ' ) as ImpItem, ',
    //   '(((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, ')',
    //   '+ (REPValorMOT / 60 * 2 *', minutosunion, ')) ',
    //   ' * ', cantidad,
    //   ' * ', largo, ' ) as ImpPañoUnidoRec, ',
    //   'StkRubroCosto,',
    //   'StkMonedasCotizacion,',
    //   'REPValorMOT',
    //   'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ',
    //   'reparacion.parametrosrep ',
    //   'where StkRubro.StkRubroAbr = "' + StkRubroAbrP + '" ',
    //   'and StkRubro.StkRubroTM = idStkMonedas '
    // ].join(' ')
    conexion.query(
      q,
      function (err, result) {
        if (err) {
          console.log('error en mysql')
          console.log(err)
        }
        else {
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


conexion.end
module.exports = router;