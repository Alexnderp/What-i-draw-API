const express = require('express');
const rota = express.Router();
const {addPersonagem,listarPersonagens, atualizarPersonagem, deletarPersonagem, sortearPersonagem} = require('../controladores/personagens');
const {listarCenarios, addCenarios, atualizarCenarios, deletarCenarios, sortearCenarios} = require('../controladores/cenarios');
const {listarLayout, addLayout, atualizarLayout, deletarLayout, sortearLayout} = require('../controladores/layout');
const sorteadorGeral = require('../controladores/geral');
const {verificarCenario, verificarLayout, verificarPersonagem, verificarUp} = require('../intermediarios/intermediario');


rota.get('/', sorteadorGeral);

rota.get('/personagem', listarPersonagens);
rota.get('/personagem/sorteador', sortearPersonagem);
rota.post('/personagem',verificarPersonagem, addPersonagem );
rota.put('/personagem/:numero',verificarUp, verificarPersonagem, atualizarPersonagem);
rota.delete('/personagem/:numero', verificarUp, deletarPersonagem);

rota.get('/cenario', listarCenarios);
rota.get('/cenario/sorteador', sortearCenarios);
rota.post('/cenario',verificarCenario, addCenarios );
rota.put('/cenario/:numero',verificarUp, verificarCenario, atualizarCenarios);
rota.delete('/cenario/:numero', verificarUp, deletarCenarios);

rota.get('/layout', listarLayout);
rota.get('/layout/sorteador', sortearLayout);
rota.post('/layout',verificarLayout, addLayout );
rota.put('/layout/:numero',verificarUp, verificarLayout, atualizarLayout);
rota.delete('/layout/:numero', verificarUp, deletarLayout);


module.exports = rota;