const fs = require('fs/promises');

const listarPersonagens = async (req, res) => {
    try {
        const lista = await fs.readFile('./src/bancodedados/personagens.json');
        const parseLista = JSON.parse(lista);

        return res.status(200).json(parseLista);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const addPersonagem = async (req, res) => {

    const { nome, idade, personalidade, ocupacao, descricao } = req.body

    try {
        const lista = await fs.readFile('./src/bancodedados/personagens.json');
        const parseLista = JSON.parse(lista);

        const id = () => {
            if (parseLista.length === 0) {
                return 1;
            }
            if (parseLista.length >= 1) {
                const novoId = parseLista.findLast((ultimo) => {
                    return ultimo;
                });

                return novoId.numero + 1;
            }
        }

        parseLista.push({
            numero: id(),
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
        
        parseLista.splice(personagem.numero-1, 1);

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

        const sortear = () =>{
            const sorteador = Math.floor(Math.random() * (parseLista.length));
            return sorteador;
        }
        
        const sorteador = sortear();

        const personagem = parseLista.find((p) => {
            return p.numero === sorteador;
        });

        return res.status(200).json(personagem);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

module.exports = { addPersonagem, listarPersonagens, atualizarPersonagem, deletarPersonagem, sortearPersonagem }