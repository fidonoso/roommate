const fs = require('fs');
const url = require("url");
const http = require("http");
const {nuevousuario, guardarUsuario}=require('./roommates.js')
const {ingresoGasto, editarGasto, eliminargasto}= require('./gastos.js');
const {enviar}=require('./enviarcorreos.js')

//EJECUTAR npm start    o   node index.js   para ejecutar.

// luego, ir a http://localhost:3000 para acceder a la aplicacion
// http://localhost:3000/roommate   ==>Devuelve todos los roommates almacenados.
// http://localhost:3000/gastos   ==>Devuelve el historial con todos los gastos registrados.

//Al registrar un nuevo gasto se envía un correo a todos los roommates y a mi cuenta personal 'fidonoso@gmail.com' para verificar la funcionalidad
// Se puede usar el archivo resetJson.js para resetear los archivos roommates.json y gastos.json. solo ejecutar node resetJson.js
// Dev.js solo se usó para desarrollar la app, ya que, solo tiene un ejemplo del modelo de datos de los archivos roommates.json y gastos.json
// se implementaron test para las respuestas de la api en /roommate y /gastos

let miservidor=http.createServer((req, res)=>{
// GET: Debe devolver el documento HTML disponibilizado en el apoyo.
    if (req.url =="/" && req.method == "GET"){
        res.setHeader('content-type', 'text/html')
        fs.readFile('index.html', 'utf8', (err, data) => {
           if(err){
            res.statusCode=500;
            res.end()
           }
           res.statusCode=200
           res.end(data)
        })
    
    }
//roommate POST: Almacena un nuevo roommate ocupando random user.
    if (req.url.startsWith("/roommate") && req.method == "POST") {
        nuevousuario().then(async (usuario)=>{
            guardarUsuario(usuario)
            res.statusCode=201
            res.end(JSON.stringify(usuario))
        }).catch(e=>{
            res.statusCode=500
            res.end(),
            console.log("error en el registro de un usuario random",e)
        });
    };
//roommate GET: Devuelve todos los roommates almacenados.
    if (req.url.startsWith("/roommate") && req.method == "GET") {
        res.setHeader('content-type', 'application/json')
        res.statusCode=200
        res.end( fs.readFileSync('roommates.json', 'utf8'))
    }
//gastos GET: Devuelve el historial con todos los gastos registrados.
    if (req.url.startsWith("/gastos") && req.method == "GET") {
        res.setHeader('content-type', 'application/json')
        res.statusCode=200
        res.end(fs.readFileSync('gastos.json', 'utf8'))
    }
//gasto/POST: Recibe el payload con los datos del gasto y los almacena en un archivo JSON (gastos.json).
    if (req.url.startsWith("/gasto") && req.method == "POST") {
        let body="";
        req.on("data", (chunk)=>{
            body=chunk.toString();
        });
        req.on("end",()=>{
            const nuevoGasto=JSON.parse(body)
            const GT= ingresoGasto(nuevoGasto)
            enviar(nuevoGasto)
            res.statusCode=201
            res.end(JSON.stringify(GT))
        })
    };

//gasto PUT: Edita los datos de un gasto.
    if (req.url.startsWith("/gasto?id=") && req.method == "PUT") {
        let body="";
        req.on("data", (chunk)=>{
            body=chunk.toString();
        });
        req.on("end",async ()=>{
            try{
                const editGasto=JSON.parse(body)
                const ED=editarGasto(editGasto, req.url.slice(10,16))
                res.statusCode=201
                res.end()
            }catch(err){
                res.statusCode=500
                console.log(`Error en el servidor : ${err}`)
            }
        })
    };
//gasto/DELETE: Recibe el id del gasto usando las Query Strings y la elimine del historial de gastos (gastos.json).
    if (req.url.startsWith("/gasto?id=") && req.method == "DELETE") {
        let body="";
        req.on("data", (chunk)=>{
            body=chunk.toString();
        });
        req.on("end",async ()=>{
            try{
                eliminargasto(req.url.slice(10,16))
                res.statusCode=200
                res.end()
            }catch(err){
                res.statusCode=500
                res.end()
                console.log(`Error en el servidor : ${err}`)
            }
        })
    }


}).listen(3000, ()=>{
    console.log(`Servidor corriendo en el puerto 3000 con el PID ${process.pid}`)
})

module.exports={miservidor}