const fs = require('fs');
const{ v4:uuidv4}=require('uuid');

// funciones para inresar, modificar y elimnar gastos
const ingresoGasto=(objG)=>{
    let gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
    let roommate=JSON.parse(fs.readFileSync('roommates.json', 'utf8'))
    let roommateId=roommate.roommates.filter(el=>el.nombre==objG.roommate)
    objG.id_roommate=roommateId[0].id
    objG.id=uuidv4().slice(30)
    gastosJSON.gastos.push(objG)
    let idB=objG.id_roommate
    let monto=objG.monto
    let objN= roommate.roommates.map(ele=> {
        if(ele.id==idB){
        ele.debe=='-'? ele.debe=monto*(-1): ele.debe=ele.debe-monto;
        ele.recibe=ele.recibe-monto
        return ele
        }else{
            return ele
        }
    })
    let ob2={
        roommates: objN
    }
    fs.writeFileSync('roommates.json', JSON.stringify(ob2),'utf8')
    fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON), 'utf8')
    return gastosJSON
}

const editarGasto=async (objG, idG)=>{
    try{
    let gastosJSON = await JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
    let roommate=  await JSON.parse(fs.readFileSync('roommates.json', 'utf8'))
    let roommateId=roommate.roommates.filter(el=>el.nombre==objG.roommate) 
    let idroommater=roommateId[0].id
    const ediG=gastosJSON.gastos.map(ele=>{
        if(ele.id==idG){
            ele.roommate=objG.roommate
            ele.descripcion = objG.descripcion
            ele.monto= objG.monto
            ele.id_roommate=idroommater
            return ele
        }else{
            return ele
        }
    })
    let gastoseditados={
        gastos: ediG
    }
    fs.writeFileSync('gastos.json', JSON.stringify(gastoseditados),'utf8')
    let listaGastos=gastosJSON.gastos 
    let listaroommate=roommate.roommates
    let arr=[] //arreglo de gastos por cada roommate
    let arr2=[] // arreglo del total 'debe' y total 'recibe' por cada roommate
    let arr3=[] // reemplaza el 'debe' y 'recibe' de cada roommate para el HTML
    listaroommate.map(el=>el.id).forEach(el=>{
        arr.push(listaGastos.filter(ele=>ele.id_roommate==el))
      })
    arr.forEach(el=>{
    if(el.length>0){
    let el2=el.map(x=>x.monto).reduce((acc, y)=> acc+y,0)
    let ob={
        id: el[0].id_roommate,
        nombre: el[0].roommate,
        debe: el2*(-1), //total acumulado
        recibe: 17500-el2 //total acumulado
    }
    arr2.push(ob)
    }
    })
        listaroommate.map(el=>{
        arr2.forEach(ele=>{
            if(ele.id==el.id){
                el.debe=ele.debe
                el.recibe=ele.recibe         
            }
        })
        arr3.push(el)
        })
      let newroommate={
        roommates: arr3
      }
        fs.writeFileSync('roommates.json', JSON.stringify(newroommate),'utf8')
        return gastoseditados
    }catch(e){
        console.log(`Error en funcion de edicion de gastos al inicializar vacio el archivo gastos.json: ${e}`)
        console.log("servidor sigue operando")
    }

}

const eliminargasto=(idB)=>{
    let gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
    let roommateJSON=JSON.parse(fs.readFileSync('roommates.json', 'utf8'))
    let monto=gastosJSON .gastos.filter(x=>x.id==idB)[0].monto
    let updateroommate=gastosJSON.gastos.filter(x=>x.id==idB)[0].id_roommate
    let newlistagastos={
    gastos: gastosJSON .gastos.filter(x=>x.id!==idB)
    }
    fs.writeFileSync('gastos.json',JSON.stringify(newlistagastos), 'utf8' )
    let newlistaroommates= {
    roommates: roommateJSON.roommates.map(el=>{
        if(el.id==updateroommate){
            el.recibe=el.recibe+monto
            el.debe=el.debe+monto
            return el
        }else{
            return el
        }
    })
    }
    fs.writeFileSync('roommates.json',JSON.stringify(newlistaroommates), 'utf8' )
}

module.exports = {ingresoGasto, editarGasto,eliminargasto}