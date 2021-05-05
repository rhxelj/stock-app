var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupbolsontanque");
  } else {
    console.log("no se conecto en presupbolsontanque");
  }
});

var datosenvio = [];

var router = express();
router.get("/", (req, res, next) => {
  var q,
    i = 0;
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      var coeficiente = 0,
        metroscuaddiam = 0.0,
        metroscuadper = 0.0,
        metroscuadtotal = 0.0,
        StkRubroAbrP = "",
        tipomedeleg = '',
        MOTarmadoAd = 0.0,
        SegundosMOTAd = 0.0,
        anchopared = 0.0;
      medida = 0;
      alto = 0.0;
      perimetro = 0.0;
      diametro = 0.0;


      datosrec = JSON.parse(req.query.datoscalculo);
      totalreg = datosrec.length


      datosrec.map(datos => {
        cantidad = datos.cantidad;
        StkRubroAbrP = datos.StkRubroAbr;
        ivasn = datos.ivasn;
        tipomedeleg = datos.tipomedeleg;
        termbordeeleg = datos.termbordeeleg;
        medida = datos.medida * 1;
        alto = datos.alto * 1;

        anchopared = datos.anchopared * 1 / 100;

        detalle = "Bolsón para tanque de "
        if (tipomedeleg == 'CC') {
          perimetro = medida * 3;
          diametro = (perimetro / 3.1416) * 1.02
          detalle = detalle + medida + ' chapas '
        } else {
          if (tipomedeleg == 'DI') {
            diametro = medida + (anchopared * 2)
            perimetro = diametro * 3.1416
            detalle = detalle + medida + ' de diámetro interno '
          }
          else {
            if (tipomedeleg == 'DE') {
              diametro = medida
              perimetro = diametro * 3.1416 + .05
              detalle = detalle + medida + ' de diámetro externo '
            }
            else {
              perimetro = medida * 1
              diametro = medida / 3.1416 + .05
              detalle = detalle + medida + ' de perímetro externo '
            }
          }
        }


        detalle = detalle + ' con pared de ' + anchopared + ' mts. y un alto de ' + alto + ' mts. en : '
        alto = alto + anchopared + 0.3
        if (alto <= 1.50) {
          alto = 1.50
        }
        else {
          if (alto > 1.50 && alto <= 2) {
            alto = 2.00
          }
          else {
            if (alto > 2 && alto <= 3) {
              alto = 3.00
            }
            else {
              alto = alto.toFixed(0) + 0.5
            }
          }
        }



        metroscuaddiam = (diametro * diametro).toFixed(0)
        metroscuadper = (alto * perimetro).toFixed(0)
        metroscuadtotal = metroscuaddiam * 1 + metroscuadper * 1



        if (StkRubroAbrP == 'POL19') {
          SegundosMOT = perimetro * 300

        }
        else {
          SegundosMOT = perimetro * 420

        }



        if (termbordeeleg == 'CFS') {
          SegundosMOT = perimetro * 510
        }
        if (termbordeeleg == 'CFC') {
          SegundosMOT = perimetro * 640
        }
        if (termbordeeleg == 'CF') {
          SegundosMOT = SegundosMOT + (perimetro * 1380)
        }

        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay
          coefMOT = result[0].coefMOTmay
          ivasn = 'CIVA'
        }
        else {
          coeficiente = result[0].coeficientemin
          coefMOT = result[0].coefMOTmin
        }



        if (diametro > 12) {
          if ((Math.floor(diametro)) === 12) {
            SegundosMOTAd =  1800
          }
          else {
            SegundosMOTAd =  ((Math.floor(diametro) - 12) * 1800)
          }


        }
        valorMOTseg = result[0].costoMOT * coefMOT / 60 / 60 * 2
        MOTarmado = valorMOTseg * SegundosMOT
        MOTarmadoAd = valorMOTseg * SegundosMOTAd




        valormcuad = ['Select ',
          'StkRubroDesc, StkRubroAbr, ',
          '((StkRubroCosto / StkRubroAncho * StkMonedasCotizacion * ', coeficiente,
          ' * ', metroscuadtotal, ')',
          ' + ', MOTarmado,
          ' ) as ImpUnitario, ',
          'StkRubroCosto, ',
          'StkMonedasCotizacion ',
          'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
          'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
          'and StkRubro.StkRubroTM = idStkMonedas '
        ].join('')





        conexion.query(
          valormcuad,
          function (err, result) {
            if (err) {
              console.log('error en mysql')
              console.log(err)
            }
            else {
              result[0].Detalle = detalle
              result[0].Largo = 0.00
              result[0].Ancho = 0.00

              if (StkRubroAbrP == 'POL19') {
                result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0) * 1.15 + MOTarmadoAd

              }
              if (ivasn == 'CIVA') {
                result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0)
              }
              else {
                result[0].ImpUnitario = result[0].ImpUnitario.toFixed(0) / 1.21
              }


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

conexion.end;
module.exports = router;
