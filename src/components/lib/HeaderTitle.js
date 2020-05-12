import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { globalContext } from "../App";

export function HeaderTitle(prop) {
  const { valor, setValor } = useContext(globalContext);
  setValor(prop);
  // return {};
}
