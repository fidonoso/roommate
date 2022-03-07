const fs = require('fs');
//ESTRUCTURA DE LOS DATOS (solo usado para desarrollar las funcionalidades. No afecta el funcionamiento)

// let listagastos = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
// let listaroommates=JSON.parse(fs.readFileSync('roommates.json', 'utf8'))
let listagastos={
  gastos: [
    { roommate: 'Livio Picard', descripcion: 'Articulos de limpieza', monto: 1000, id_roommate: '1fe188', id: 'a83bf9' },
    { roommate: 'Johnni Turner', descripcion: 'segundo gasto', monto: 6500, id_roommate: '46660e', id: 'fcb387' },
    { roommate: 'Dâni Pinto', descripcion: 'otro gasto', monto: 500, id_roommate: 'd38a16', id: 'bfce5d' },
    { roommate: 'Livio Picard', descripcion: 'segundo', monto: 2500, id_roommate: '1fe188', id: '54ee67' }
  ]
}
let listaroommates={
  roommates: [
    { id: '1fe188', nombre: 'Livio Picard', correo: 'livio.picard@example.com', debe: -14000, recibe: 3500 },
    { id: '46660e', nombre: 'Johnni Turner', correo: 'johnni.turner@example.com', debe: -11000, recibe: 6500 },
    { id: '86f582', nombre: 'Ludo Van Emmerik', correo: 'ludo.vanemmerik@example.com', debe: -17500, recibe: '-' },
    { id: 'd38a16', nombre: 'Dâni Pinto', correo: 'dani.pinto@example.com', debe: -17000, recibe: 500 }
  ]
}

