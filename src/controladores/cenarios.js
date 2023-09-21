const fs = require('fs/promises');



const listarCenarios = async (req, res) => {
    try {
        const lista = await fs.readFile('./src/bancodedados/cenarios.json');
        const parseLista = JSON.parse(lista);

        const cenariosValidos = parseLista.filter((p) =>{
            return p !== null
        });

        return res.status(200).json(cenariosValidos);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const addCenarios = async (req, res) => {

    const { tipo, local, epoca } = req.body

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
            tipo,
            local,
            epoca
        });



        await fs.writeFile('./src/bancodedados/cenarios.json', JSON.stringify(parseLista));

        return res.status(201).json('Cenario registrado');

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const atualizarCenarios = async (req, res) => {
    const { numero } = req.params;
    const { tipo, local, epoca } = req.body;

    try {
        const lista = await fs.readFile('./src/bancodedados/cenarios.json');
        const parseLista = JSON.parse(lista);
        const cenario = parseLista.find((p) => {
            return p.numero === Number(numero);
        });
        cenario.tipo = tipo;
        cenario.local = local;
        cenario.epoca = epoca;

        await fs.writeFile('./src/bancodedados/cenarios.json', JSON.stringify(parseLista));

        return res.status(200).json('Cenario Atualizado')

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const deletarCenarios = async (req, res) => {
    const { numero } = req.params;
    
    try {
        const lista = await fs.readFile('./src/bancodedados/cenarios.json');
        const parseLista = JSON.parse(lista);
        const cenario = parseLista.find((p) => {
            return p.numero === Number(numero);
        });

        if (!cenario) {
            return res.status(404).json('Cenario não encontrado');
        }
        
        delete parseLista [cenario.numero-1];

        await fs.writeFile('./src/bancodedados/cenarios.json', JSON.stringify(parseLista));

        return res.status(200).json()

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const sortearCenarios = async (req, res) => {

    try {
        const lista = await fs.readFile('./src/bancodedados/cenarios.json');
        const parseLista = JSON.parse(lista);

        const cenariosValidos = parseLista.filter((p) =>{
            return p !== null
        });

        const sortear = () => {
            const sorteador = Math.floor(Math.random() * (cenariosValidos.length - 1));
            return sorteador;
        }

        const sorteador = sortear();

        const cenario = cenariosValidos[sorteador];

        return res.status(200).json(cenario);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

module.exports = {listarCenarios, addCenarios, atualizarCenarios, deletarCenarios, sortearCenarios}