const fs = require('fs/promises');

const listarPersonagens = async (req, res) => {
    try {
        const lista = await fs.readFile('./src/bancodedados/personagens.json');
        const parseLista = JSON.parse(lista);
        const personagensValidos = parseLista.filter((p) =>{
            return p !== null
        });

        return res.status(200).json(personagensValidos);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const addPersonagem = async (req, res) => {

    const { nome, idade, personalidade, ocupacao, descricao } = req.body

    try {
        const lista = await fs.readFile('./src/bancodedados/personagens.json');
        const parseLista = JSON.parse(lista);

        

        parseLista.push({
            numero: parseLista.length+1,
            nome,
            idade,
            personalidade,
            ocupacao,
            descricao
        });



        await fs.writeFile('./src/bancodedados/personagens.json', JSON.stringify(parseLista));

        return res.status(201).json('Personagem registrado');

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const atualizarPersonagem = async (req, res) => {
    const { numero } = req.params;
    const { nome, idade, personalidade, ocupacao, descricao } = req.body;

    try {
        const lista = await fs.readFile('./src/bancodedados/personagens.json');
        const parseLista = JSON.parse(lista);
        const personagem = parseLista.find((p) => {
            return p.numero === Number(numero);
        });
        personagem.nome = nome;
        personagem.idade = idade;
        personagem.personalidade = personalidade;
        personagem.ocupacao = ocupacao;
        personagem.descricao = descricao;

        await fs.writeFile('./src/bancodedados/personagens.json', JSON.stringify(parseLista));

        return res.status(200).json('Personagem Atualizado')

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const deletarPersonagem = async (req, res) => {
    const { numero } = req.params;

    try {
        const lista = await fs.readFile('./src/bancodedados/personagens.json');
        const parseLista = JSON.parse(lista);
        const personagem = parseLista.find((p) => {
            return p.numero === Number(numero);
        });

        if (!personagem) {
            return res.status(404).json('Personagem não encontrado');
        }

        delete parseLista[personagem.numero -1];

        await fs.writeFile('./src/bancodedados/personagens.json', JSON.stringify(parseLista));

        return res.status(200).json()

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const sortearPersonagem = async (req, res) => {

    try {
        const lista = await fs.readFile('./src/bancodedados/personagens.json');
        const parseLista = JSON.parse(lista);

        const personagensValidos = parseLista.filter((p) =>{
            return p !== null
        });

        const sortear = () => {
            const sorteador = Math.floor(Math.random() * (personagensValidos.length - 1));
            return sorteador;
        }

        const sorteador = sortear();

        const personagem = personagensValidos[sorteador];

        return res.status(200).json(personagem);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

module.exports = { addPersonagem, listarPersonagens, atualizarPersonagem, deletarPersonagem, sortearPersonagem }