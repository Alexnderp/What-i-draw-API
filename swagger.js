const swaggerAutogen = require('swagger-autogen');

const outputFile = 'swagger_output.json'
const rota = ['./src/rotas/rota'];


swaggerAutogen(outputFile, rota).then(() =>{
    require('./src/index');
});