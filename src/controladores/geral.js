const fs = require('fs/promises');

const sorteadorGeral = async (req, res) => {

    const bancos = [0, 1, 2];
    const sortear = Math.floor(Math.random() * bancos.length);

    try {
        if (sortear === 0) {
            const lista = await fs.readFile('./src/bancodedados/personagens.json');
            const parseLista = JSON.parse(lista);
            const sorteador = Math.floor(Math.random() * (parseLista.lenght));
            const personagem = parseLista.find((p) => {
                return p.numero === sorteador;
            });

            return res.status(200).json(personagem);
        }

        if(sortear === 1){
            const lista = await fs.readFile('./src/bancodedados/cenarios.json');
            const parseLista = JSON.parse(lista);
            const sorteador = Math.floor(Math.random() * (parseLista.lenght));
            const cenario = parseLista.find((p) => {
                return p.numero === sorteador;
            });

            return res.status(200).json(cenario);
        }

        if(sortear === 2){
            const lista = await fs.readFile('./src/bancodedados/layout.json');
            const parseLista = JSON.parse(lista);
            const sorteador = Math.floor(Math.random() * (parseLista.lenght));
            const layout = parseLista.find((p) => {
                return p.numero === sorteador;
            });

            return res.status(200).json(layout);
        }
        

    } catch (error) {
        return res.status(500).json({mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo"});
    }
}

module.exports = sorteadorGeral;