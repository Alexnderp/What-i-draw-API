const fs = require('fs/promises');



const listarLayout = async (req, res) => {
    try {
        const lista = await fs.readFile('./src/bancodedados/layout.json');
        const parseLista = JSON.parse(lista);

        return res.status(200).json(parseLista);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const addLayout = async (req, res) => {

    const { tipo, tema } = req.body

    try {
        const lista = await fs.readFile('./src/bancodedados/layout.json');
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
            tema
        });



        await fs.writeFile('./src/bancodedados/layout.json', JSON.stringify(parseLista));

        return res.status(201).json('Layout registrado');

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const atualizarLayout = async (req, res) => {
    const { numero } = req.params;
    const { tipo, tema } = req.body;

    try {
        const lista = await fs.readFile('./src/bancodedados/layout.json');
        const parseLista = JSON.parse(lista);
        const layout = parseLista.find((p) => {
            return p.numero === Number(numero);
        });
        layout.tipo = tipo;
        layout.tema = tema;
        

        await fs.writeFile('./src/bancodedados/layout.json', JSON.stringify(parseLista));

        return res.status(203).json('Layout Atualizado')

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const deletarLayout = async (req, res) => {
    const { numero } = req.params;
    
    try {
        const lista = await fs.readFile('./src/bancodedados/layout.json');
        const parseLista = JSON.parse(lista);
        const layout = parseLista.find((p) => {
            return p.numero === Number(numero);
        });

        if (!layout) {
            return res.status(404).json('Personagem não encontrado');
        }
        
        parseLista.splice(layout.numero-1, 1);

        await fs.writeFile('./src/bancodedados/layout.json', JSON.stringify(parseLista));

        return res.status(200).json()

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const sortearLayout = async (req, res) => {

    try {
        const lista = await fs.readFile('./src/bancodedados/layout.json');
        const parseLista = JSON.parse(lista);

        const sortear = () =>{
            const sorteador = Math.floor(Math.random() * (parseLista.length));
            return sorteador;
        }
        
        const sorteador = sortear();

        const layout = parseLista.find((p) => {
            return p.numero === sorteador;
        });

        return res.status(200).json(layout);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

module.exports = { addLayout, listarLayout, atualizarLayout, deletarLayout, sortearLayout }