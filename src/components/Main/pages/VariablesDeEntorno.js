// Variables de entorno para usar en todos mis componentes
// NODE_OPTIONS = --max_old_space_size : 4096
// en package.json estaba
// "build": "react-scripts build", 
// en lugar de "build": "react-scripts --max_old_space_size=4096 build",
// las opciones de incremento son :
// node --max-old-space-size=1024 index.js #increase to 1gb
// node --max-old-space-size=2048 index.js #increase to 2gb
// node --max-old-space-size=3072 index.js #increase to 3gb
// node --max-old-space-size=4096 index.js #increase to 4gb
// node --max-old-space-size=5120 index.js #increase to 5gb
// node --max-old-space-size=6144 index.js #increase to 6gb
// node --max-old-space-size=7168 index.js #increase to 7gb
// node --max-old-space-size=8192 index.js #increase to 8gb
//const IpServidor = "http://localhost:4000"; //IP para desarrollo local
const IpServidor = "http://192.168.2.11:4000"; // IP del Servidor de producción
export default IpServidor;


