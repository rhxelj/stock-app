var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var param = require('../parametros')

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupgraba");
  } else {
    console.log("no se conecto en presupgraba");
  }
});

function mostrarPropiedades(objeto, nombreObjeto) {
  var resultado = ``;
  for (var i in objeto) {
    //objeto.hasOwnProperty se usa para filtrar las propiedades del objeto
    if (objeto.hasOwnProperty(i)) {
        resultado += `${nombreObjeto}.${i} = ${objeto[i]}\n`;
    }
  }
  return resultado;
}

var datosenvio = []
var router = express();
router.post('/',  (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = '', largo = 0
  datosrec = (req.body.renglon)
 // datosrec = JSON.parse(req.body.renglon)
  totalreg = datosrec.length
console.log('datosrec["0"]["0"].StkRubroDesc')
console.log(datosrec["0"]["0"].StkRubroDesc)
console.log('datosrec[1]')
console.log(datosrec[1])
// var resultado = ``;
//   for (var i in datosrec) {
//     //objeto.hasOwnProperty se usa para filtrar las propiedades del objeto
//     if (datosrec.hasOwnProperty(i)) {
//         resultado += `${'datosrec'}.${i} = ${datosrec[i]}\n`;
//     }
//   }
//   console.log('resultado')
//   console.log(resultado)

  console.log(mostrarPropiedades(datosrec, "datosrec") );
datosrec.map(datos => {  
  console.log(datos)

      // cantidad = datos.cantidad;
      // StkRubroAbrP = datos.StkRubroAbr;
      // largo = datos.largo
      // coeficiente = param.coeficientemay
      // minutosunion = param.cantminpu
   
        // q = ['Select',
        //               'StkRubroDesc, ',
        //               '(((StkRubroCosto * StkMonedasCotizacion * ' + coeficiente + ')',
        //               '+ (REPValorMOT / 60 * ' + minutosunion + ')) ',
        //               ' * ' + cantidad,
        //               ' * ' + largo + ' ) as ImpPañoUnido, ', 
        //               '(((StkRubroCosto * StkMonedasCotizacion * ' + coeficiente + ')',
        //               '+ (REPValorMOT / 60 * 2 *' + minutosunion + ')) ',
        //               ' * ' + cantidad,
        //               ' * ' + largo + ' ) as ImpPañoUnidoRec, ',
        //               'StkRubroCosto,',
        //               'StkMonedasCotizacion,',
        //               'REPValorMOT',
        //               'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ', 
        //               'reparacion.parametrosrep ',
        //               'where StkRubro.StkRubroAbr = "' + StkRubroAbrP +'" ', 
        //               'and StkRubro.StkRubroTM = idStkMonedas',
        //    ].join(' ')  
        //    console.log(q)
        // conexion.query(
        //          q,              
        //               function(err, result) {
        //               if (err) {
        //                   console.log('error en mysql')
        //                   console.log(err)
        //                   } 
        //                   else {
        //                    datosenvio.push(result)
        //                    i++ 
        //                     if (i === totalreg)
        //                     {
        //                       res.json(datosenvio)
        //                       datosenvio = []
        //                     }
        //                   }
        //           })
  })
});


conexion.end
module.exports = router;