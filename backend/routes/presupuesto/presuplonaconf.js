var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

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
      // var enteroancho = 0,
      //   decimancho = 0.0;
      datosrec = JSON.parse(req.query.datoscalculo);
      // totalreg = datosrec.length;

      datosrec.map(datos => {
        cantidad = datos.cantidad;
        tipoconf = datos.tipoconf;
        tipoojale = datos.tipoojale;
        StkRubroAbrP = datos.StkRubroAbr;
        largoreal = (datos.largo * 1)
        anchoreal = (datos.ancho * 1)
        largo = (datos.largo * 1) + 0.08;
        ancho = (datos.ancho * 1) + 0.08;
        // enteroancho = Math.trunc(ancho / 1.5);
        // decimancho = ancho / 1.5 - enteroancho;
        // if (decimancho < 0.5) {
        //   ancho = enteroancho + 0.5;
        // } else {
        //   ancho = enteroancho + 1;
        // }

        if (tipoconf == 'cs') {
          detalle = "Lona con ojales reforzados, chicotes y soga en dobladillo";
          ganancia = result[0].coefgancsoga
        } else {
          detalle = "Lona con ojales reforzados, chicotes sin soga en dobladillo";
          ganancia = result[0].coefganssoga
        }
        if (datos.minmay == 'my') {
          coeficiente = result[0].coeficientemay;
          tipoojal = result[0].abrojales28;
          sogachicote = result[0].sogachicotemay;
          ganancia = result[0].coefganmay
        }
        else {
          coeficiente = result[0].coeficientemin;
          sogachicote = result[0].sogachicotemin;
          if (tipoojale == 'hz') {
            tipoojal = result[0].abrojales3hz
            detalle = detalle + ' en : '
          }
          else {
            tipoojal = result[0].abrojales3b
            detalle = detalle + ' c/ojales de bronce en : '
          }
        }
        minutosunion = (datos.ancho + 0.08) * largo * 5;
        sogadobladillo = result[0].sogadobladillo;
        valorflete = result[0].flete;
        valorMOT = result[0].MOTpM2;
        codmoneda = result[0].codmoneda;
        coefimpuesto = result[0].coefimpuestos

        mcuadcob = [
          "Select ",
          "StkRubroDesc, StkRubroAbr, ",
          //      "(StkRubroCosto * StkMonedasCotizacion / 1.50 * 1.02 ) as CostoCobMC, ",
          "(StkRubroCosto * StkMonedasCotizacion / StkRubroAncho * 1.02 ) as CostoCobMC, ",
          "(StkRubroCosto * StkMonedasCotizacion * 0.20 / 11 ) as CostoRefuerzo ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          'where StkRubro.StkRubroAbr = "',
          StkRubroAbrP,
          '" ',
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        msogachicote = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion  * 1.65) as CostoMSChicote ",
          "from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
          "where StkRubro.StkRubroAbr = '",
          sogachicote,
          "'",
          "and StkRubro.StkRubroTM = idStkMonedas"
        ].join("");

        msogadobladillo = [
          "Select ",
          "(StkRubroCosto * StkMonedasCotizacion) as CostoMSDobladillo ",
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
              costooriginal = costooriginal * ganancia * coefimpuesto;

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
              // datosenvio[0][0]['ImpItem'] = costooriginal
              datosenvio[0][0]['ImpUnitario'] = costooriginal
              datosenvio[0][0]['Detalle'] = detalle
              datosenvio[0][0]['Largo'] = largoreal
              datosenvio[0][0]['Ancho'] = anchoreal
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
