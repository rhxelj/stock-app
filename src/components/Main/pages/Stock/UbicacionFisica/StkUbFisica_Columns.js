const ubicacion = {
  PAR: "PARQUE",

  RUT: "RUTA",

  GB: "GRUNBEING",
};

export const columns = [
  {
    title: "Lugar Físico",
    field: "idStkUbFisica",
  },
  {
    title: "Ub. Geográfica",
    field: "StkUbFisicaGeo",
    lookup: ubicacion,
  },
];
