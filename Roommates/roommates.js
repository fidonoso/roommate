const axios =require('axios')
const fs = require('fs');
const{ v4:uuidv4}=require('uuid');
// funcion para ingresar nuevos roommates
const nuevousuario =async ()=>{
    try{
        const {data} = await axios.get("http://randomuser.me/api");
        const usuario =data.results[0];
        const user ={
            id: uuidv4().slice(30),
            nombre : `${usuario.name.first} ${usuario.name.last}`,
            correo: usuario.email,
            debe: '-',
            recibe: 17500
        }
        return user
    }catch(e){
        console.log(`Error: ${e}`) 
    }
}
const guardarUsuario = (usuario)=>{
    const compa = JSON.parse(fs.readFileSync('roommates.json','utf8'))
    compa.roommates.push(usuario)
    fs.writeFileSync("roommates.json", JSON.stringify(compa))
}
module.exports = {nuevousuario, guardarUsuario}