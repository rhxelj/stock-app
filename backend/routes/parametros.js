var coeficientemin = 2.15;
var coeficientemay = 1.77;
var cantminpu = 1.3; //cantidad de minutos por metro que se cobra para unir paños
// var segmetun = 120; // segundo por metro de unión de paños (no por metro de tela)

//parametros para ser usados en el cálculo de precio de lonas confeccionadas standar (de lista)
var abrojales28 = "ZR28";
var abrojales3hz = "HZ30";
var sogachicotemin = "SBN";
var sogachicotemay = "SB";
var sogadobladillo = "SNR"; //Abreviatura de soga para el dobladillo (el valor es por kilo calculando 50 mts. por kilo)
var coefgancsoga = 1.35; //Porcentaje de ganancia con soga en dobladillo
var coefganssoga = 1.30; //Porcentaje de ganancia sin soga en dobladillo
var coefganmay = 1.30; //Porcentaje de ganancia mayorista
var flete = 0.07; //valor del flete en dolares
var MOTpM2 = 1.46; //valor de la mano de obra en dolares por metro cuadrado en la confección de lonas
var codmoneda = "DLS"; //código de monedas para cálculo de flete y MOT
var costoMOT = 800; //costo en pesos de la mano de obra de una persona
var segsolpu = 120; //cantidad de segundos de una persona por metro de unión de paños

module.exports = {
  coeficientemay,
  coeficientemin,
  cantminpu,
  // segmetun,
  abrojales28,
  abrojales3hz,
  sogachicotemin,
  sogachicotemay,
  sogadobladillo,
  coefgancsoga,
  coefganssoga,
  coefganmay,
  flete,
  MOTpM2,
  codmoneda,
  costoMOT,
  segsolpu
};
