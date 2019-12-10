var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");
var param = require("../parametros");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en presuppu");
  } else {
    console.log("no se conecto en presuppu");
  }
});

var datosenvio = [];

var datosenvio1 = [];
var router = express();
router.get("/", (req, res, next) => {
  var q,
    i = 0;
  var coeficiente = 0,
    cantidad = 0,
    StkRubroAbrP = "",
    largo = 0,
    ancho = 0.0;
  var enteroancho = 0,
    decimancho = 0.0;
  datosrec = JSON.parse(req.query.datoscalculo);
  totalreg = datosrec.length;

  datosrec.map(datos => {
    cantidad = datos.cantidad;
    StkRubroAbrP = datos.StkRubroAbr;
    // largo = datos.largo + 0.12;
    // ancho = datos.ancho + 0.12;
    // enteroancho = Math.trunc(ancho / 1.5);
    // decimancho = ancho / 1.5 - enteroancho;
    // if (decimancho < 0.5) {
    //   ancho = enteroancho + 0.5;
    // } else {
    //   ancho = enteroancho + 1;
    // }
    if (datos.minmay == 1) {
      coeficiente = param.coeficientemay;
      tipoojal = param.abrojales28;
      sogachicote = param.sogachicotemay;
    } else {
      coeficiente = param.coeficientemin;
      tipoojal = param.abrojales3hz;
      sogachicote = param.sogachicotemin;
    }
    minutosunion = (datos.ancho + 0.12) * largo * 5;
    sogadobladillo = param.sogadobladillo;
    valorflete = param.flete;
    valorMOT = param.MOTpM2;

    mcuadcob = [
      "Select ",
      "StkRubroDesc, ",
      "(StkRubroCosto * StkMonedasCotizacion / 1.50 * 1.02 ) as CostoCobMC, ",
      "(StkRubroCosto * StkMonedasCotizacion * 0.20 / 11 ) as CostoRefuerzo",
      " from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
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
      "(StkRubroCosto * StkMonedasCotizacion / 125) as CostoOjalM2 ",
      "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
      "where StkRubro.StkRubroAbr = '",
      tipoojal,
      "'",
      " and StkRubro.StkRubroTM = idStkMonedas"
    ].join("");

    conexion.query(mcuadcob, function(err, result) {
      if (err) {
        console.log("error en mysql");
        console.log(err);
      } else {
        datosenvio.push(result);
      }
    });

    conexion.query(msogachicote, function(err, result) {
      if (err) {
        console.log("error en mysql");
        console.log(err);
      } else {
        datosenvio.push(result);
      }
    });

    conexion.query(msogadobladillo, function(err, result) {
      if (err) {
        console.log("error en mysql");
        console.log(err);
      } else {
        datosenvio.push(result);
      }
    });

    conexion.query(ojales, function(err, result) {
      if (err) {
        console.log("error en mysql");
        console.log(err);
      } else {
        datosenvio.push(result);
        i++;
        if (i === totalreg) {
          for (var j = 0; j < i; j++) {
            console.log(datosenvio[j].StkRubroDesc);
          }
          res.json(datosenvio);
          datosenvio = [];
        }
      }
    });
  });
});

conexion.end;
module.exports = router;
