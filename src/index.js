const express=require('express');
const app = express();
const rota = require('./rotas/rota');

app.use(express.json());
app.use(rota);



app.listen(8000);