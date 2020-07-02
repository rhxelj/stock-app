var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require('../conexion');

var nrovta = 1;

moment.locale("es");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupgraba");
  } else {
    console.log("no se conecto en presupgraba");
  }
});

router.post("/", async function (req, res) {
  console.log('esta en grabar')
  console.log('DatosPresup  ', req.body.DatosPresup)
  console.log('req.body.DatosPresup.idClientes  ', req.body.idClientes)
  console.log('req.body.DatosPresup.nomCliente  ', req.body.nomCliente)
  var d = new Date();
  finalDate = d.toISOString().split("T")[0];
  var cliente = ''
  var i = 0;
  if (req.body.idClientes != 0) {
    cliente = req.body.idClientes
  }
  else {
    cliente = req.body.nomCliente
  }

  while (i < req.body.DatosPresup.datos.length) {
    //   totalpresup = totalpresup + props.data[i].ImpItem
    //   i++
    console.log('DatosPresup en while ', req.body.DatosPresup.datos)
    var registro1 = {
      idPresupRenglon = i + 1,
      PresupRenglonNroPresup
    }
      `idPresupRenglon`, `PresupRenglonNroPresup`, `PresupRenglonTipo`, `PresupRenglonCant`, `PresupRenglonLargo`, `PresupRenglonAncho`, `PresupRenglonImpUnit`, `PresupRenglonImpItem`
    i++
  }


  var registro = {
    PresupEncabFecha: finalDate,
    PresupEncabCliente: cliente,
    PresupEncabTotal: req.body.DatosPresup.suma,
    PresupEncabMayMin: req.body.DatosPresup.maymin
  }

  console.log('registro  ', registro)

  conexion.query("INSERT INTO BasePresup.PresupEncab SET ?", registro, function (err, result) {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log("ERROR ");
        console.log(err.errno);
      }
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
