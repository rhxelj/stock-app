import React, {useEffect, useState}  from 'react';
import { stkgrupoleerredrubro } from '../Grupos/StkGrupoLeerRedRubro'
import StkRubroB from './StkRubroB'

export default function StkRubro() {

const [lookconst, setLookconst] = useState()

async function stkgrupoleerredrubros() {
  const result = await stkgrupoleerredrubro();
  var obj = result.reduce(function(acc, cur, i) {
    acc[cur.StkRubroCodGrp] = cur.StkGrupoDesc;
    return acc;
    }, {});
    setLookconst(obj)
  }

  useEffect(() => {
    stkgrupoleerredrubros();
  }, []);

  return (
    <div>
      {lookconst && 
      <StkRubroB lookconst = {lookconst}></StkRubroB>}
      </div>
  );
}
