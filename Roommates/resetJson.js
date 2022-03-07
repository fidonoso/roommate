//resetear archivos roommates.json y gastos.json
// node resetJson.js
const fs = require('fs');

let roommates={
    roommates : []
}
fs.writeFileSync('roommates.json', JSON.stringify(roommates), 'utf8')

let gastos={
    gastos : []
}
fs.writeFileSync('gastos.json', JSON.stringify(gastos), 'utf8')