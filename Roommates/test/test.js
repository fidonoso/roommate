const chai = require("chai");
const chaiHttp = require('chai-http')
const {miservidor} = require('../index.js')

chai.use(chaiHttp)
describe('Probando API REST con Mocha - Chai', function () {
    it('Probando GET - /roommate  - debe entregar un arreglo con la propiedad roommates', function () {
        chai
            .request(miservidor)
            .get('/roommate')
            .end(function (err, res) {
            let data = JSON.parse(res.text)
            chai.expect(data).to.have.property('roommates')
            chai.expect(data.roommates).to.be.an('array')
            })
    }),
    it('Probando GET - /gastos  - debe entregar un arreglo con la propiedad gastos', function () {
        chai
            .request(miservidor)
            .get('/gastos')
            .end(function (err, res) {
            let data = JSON.parse(res.text)
            chai.expect(data).to.have.property('gastos')
            chai.expect(data.gastos).to.be.an('array')
            })
    })
})