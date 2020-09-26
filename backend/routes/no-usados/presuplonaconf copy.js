var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
var param = require("../parametros");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuppu");
  } else {
    console.log("no se conecto en presuppu");
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

      console.log('result[0]  ', result[0])

      /*
      idPresupParam: 1,
  coeficientemin: 2.15,
  coeficientemay: 1.77,
  costoMOT: 800,
  segsolpu: 120,
  cantminpu: 1.3,
  abrojales28: 'ZR28',
  abrojales3hz: 'HZ30',
  sogachicotemin: 'SBN',
  sogachicotemay: 'SB',
  sogadobladillo: 'SNR',
  coefgancsoga: 1.35,
  coefganssoga: 1.3,
  coefganmay: 1.3,
  flete: 0.07,
  MOTpM2: 1.46,
  codmoneda: 'DLS'  */
      var costooriginal = 0;
      var coeficiente = 0,
        cantidad = 0,
        metroscuad = 0,
        StkRubroAbrP = "",
        largo = 0,
        ancho = 0.0;
      var enteroancho = 0,
        decimancho = 0.0;
      datosrec = JSON.parse(req.query.datoscalculo);
      // totalreg = datosrec.length;

      datosrec.map(datos => {
        cantidad = datos.cantidad;
        tipoconf = datos.tipoconf;
        StkRubroAbrP = datos.StkRubroAbr;
        largoreal = (datos.largo * 1)
        anchoreal = (datos.ancho * 1)
        largo = (datos.largo * 1) + 0.08;
        ancho = (datos.ancho * 1) + 0.08;
        enteroancho = Math.trunc(ancho / 1.5);
        decimancho = ancho / 1.5 - enteroancho;
        if (decimancho < 0.5) {
          ancho = enteroancho + 0.5;
        } else {
          ancho = enteroancho + 1;
        }
        if (tipoconf == 'cs') {
          ganancia = param.coefgancsoga
        } else {
          ganancia = param.coefganssoga
        }
        if (datos.minmay == 'my') {
          coeficiente = param.coeficientemay;
          tipoojal = param.abrojales28;
          sogachicote = param.sogachicotemay;
          ganancia = param.coefganmay
        } else {
          coeficiente = param.coeficientemin;
          tipoojal = param.abrojales3hz;
          sogachicote = param.sogachicotemin;
        }
        minutosunion = (datos.ancho + 0.08) * largo * 5;
        sogadobladillo = param.sogadobladillo;
        valorflete = param.flete;
        valorMOT = param.MOTpM2;
        codmoneda = param.codmoneda;

        mcuadcob = [
          "Select ",
          "StkRubroDesc, StkRubroAbr, ",
          "(StkRubroCosto * StkMonedasCotizacion / 1.50 * 1.02 ) as CostoCobMC, ",
          "(StkRubroCosto * StkMonedasCotizacion * 0.20 / 11 ) as CostoRefuerzo ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          'where StkRubro.StkRubroAbr = "',
          StkRubroAbrP,
          '" ',
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        msogachicote = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion / 1000 * 1.65) as CostoMSChicote ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogachicote,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        msogadobladillo = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion / 50) as CostoMSDobladillo ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogadobladillo,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        ojales = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion / 144) as CostoOjalM2 ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          tipoojal,
          "'",
          " and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        cotizacion = [
          "Select ",
          "StkMonedasCotizacion ",
          "from   BaseStock.StkMonedas ",
          "where  StkMonedas.idStkMonedas = '",
          codmoneda,
          "'"
        ].join("");

        conexion.query(mcuadcob, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });

        conexion.query(msogachicote, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });
        if (tipoconf === 'cs') {
          conexion.query(msogadobladillo, function (err, result) {
            if (err) {
              console.log("error en mysql");
              console.log(err);
            } else {
              datosenvio.push(result);
            }
          });
        }

        conexion.query(cotizacion, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
          }
        });

        conexion.query(ojales, function (err, result) {
          if (err) {
            console.log("error en mysql");
            console.log(err);
          } else {
            datosenvio.push(result);
            // i++
            //  if (i === totalreg) {
            j = 0;
            // fin = totalreg * 4;
            // while (j < fin) {

            while (j < 4) {
              costooriginal =
                datosenvio[j][0].CostoCobMC + datosenvio[j][0].CostoRefuerzo;
              j++;
              costooriginal = costooriginal + datosenvio[j][0].CostoMSChicote;
              if (tipoconf === 'cs') {
                j++;
                costooriginal = costooriginal + datosenvio[j][0].CostoMSDobladillo;
              }

              j++;
              costooriginal =
                costooriginal +
                datosenvio[j][0].StkMonedasCotizacion * valorflete +
                +(datosenvio[j][0].StkMonedasCotizacion * valorMOT);
              j++;
              costooriginal = costooriginal + datosenvio[j][0].CostoOjalM2;
              j++;
              costooriginal = costooriginal * ganancia * 1.245;

              metroscuad = anchoreal * largoreal
              costooriginal = costooriginal * metroscuad
              if (metroscuad < 22 && metroscuad >= 16) {
                costooriginal = costooriginal * 1.0325
              }
              if (metroscuad < 16 && metroscuad >= 12) {
                costooriginal = costooriginal * 1.0325
                costooriginal = costooriginal * 1.0325
              }
              if (metroscuad < 12) {
                costooriginal = costooriginal * 1.0325
                costooriginal = costooriginal * 1.0325
                costooriginal = costooriginal * 1.0325
              }
              datosenvio[0][0]['ImpItem'] = costooriginal
              costooriginal = 0;
            }
            res.json(datosenvio);
            datosenvio = [];
          }
          // }
        });
      });
    })
});
/*
 StkRubroDesc: 'ZONDA 900',
      ImpItem: 5255.542499967552,
      StkRubroCosto: 243.25,
      StkMonedasCotizacion: 1,
      REPValorMOTLA: 1450 }*/
conexion.end;
module.exports = router;
