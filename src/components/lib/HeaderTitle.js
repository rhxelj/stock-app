import { useContext } from "react";
import { globalContext } from "../App";

export function HeaderTitle(prop) {
  const { setValor } = useContext(globalContext);
  setValor(prop);
  // return {};
}
