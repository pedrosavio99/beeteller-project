const request = require("supertest")
const app = require('./server')

//testes unitários
describe('Testando minhas rotas',  ()=>{
    it('Devo reber a rota principal', async ()=>{
        const res = await request(app).get('/')

        expect(res.body).toHaveProperty('message')
    })
    it('Devo reber uma resposta a requiição cotação do dolar', async ()=>{
        const res = await request(app).get('/api/usdbrl')

        expect(res.statusCode).toEqual(200)
    })
    it('Devo reber uma resposta a requiição cotação do BTC-USD', async ()=>{
        const res = await request(app).get('/api/btcusd')

        expect(res.statusCode).toEqual(200)
    })
    it('Devo reber uma resposta a requiição cotação do BTC-EUR', async ()=>{
        const res = await request(app).get('/api/btceur')

        expect(res.statusCode).toEqual(200)
    })
})