const nodemailer = require("nodemailer");
const fs = require("fs");
var moment = require('moment');
//función para enviar correos cada vez que se ingresa un nuevo gasto
function enviar(obj) {
  console.log("Enviando correos via Nodemailer....");
  let listadecorreos = JSON.parse(fs.readFileSync("roommates.json", "utf8")).roommates.map((el) => el.correo)
  let listadegastos=JSON.parse(fs.readFileSync("gastos.json", "utf8")).gastos
  listadecorreos.push("fidonoso@gmail.com"); //ingresa mi correo personal para verificar esta funcionalidad
  let cabecera=
  `<h2>Nuevo gasto ingresado:</h2>
  <p>${obj.roommate} a registrado un gasto de $${obj.monto} por concepto de ${obj.descripcion}</p>
  <h4>Fecha: ${(moment().format('MMMM Do YYYY, h:mm:ss a'))}</h4>`
  let tplthead=
  `<tr>
    <th> N° </th>
    <th> Roommate </th>
    <th> Descripción </th>
    <th> Gasto ($) </th>
  </tr>`
  let tplbody=''
  listadegastos.forEach((el, index)=>{
    tplbody=tplbody + `
      <tr>
        <td>${index+1}</td>
        <td>${el.roommate}</td>
        <td>${el.descripcion}</td>
        <td>${el.monto}</td>
      </tr>`
  })
  let tpltable=
  `${cabecera}
  <table border="1">
  ${tplthead}
  ${tplbody}
  </table><br>
  <footer>Desafío Latam - Prueba módulo 6 - Desarrollo backend en Node </footer>`
  let asunto = "Nuevo gasto registrado !";
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "desafidolatam@gmail.com",
      pass: "191107Ft",
    },
  });

  let mailOptions = {
    from: "desafidolatam@gmail.com",
    to: listadecorreos,
    subject: asunto,
    html: tpltable
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(`${err} - Algo salió mal en el metodo sendMail`);
    if (data) {
      console.log("Correos enviados correctamente");
    }
  });
}

module.exports = { enviar };
