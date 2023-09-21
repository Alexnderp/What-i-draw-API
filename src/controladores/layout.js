const fs = require('fs/promises');



const listarLayout = async (req, res) => {
    try {
        const lista = await fs.readFile('./src/bancodedados/layout.json');
        const parseLista = JSON.parse(lista);
        
        const layoutsValidos = parseLista.filter((p) =>{
            return p !== null
        });

        return res.status(200).json(layoutsValidos);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

const addLayout = async (req, res) => {

    const { tipo, tema } = req.body

    try {
        const lista = await fs.readFile('./src/bancodedados/layout.json');
        const parseLista = JSON.parse(lista);

        parseLista.push({
            numero: parseLista.length+1,
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
        
        delete parseLista[layout.numero-1];

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

        const layoutsValidos = parseLista.filter((p) =>{
            return p !== null
        });

        const sortear = () => {
            const sorteador = Math.floor(Math.random() * (layoutsValidos.length - 1));
            return sorteador;
        }

        const sorteador = sortear();

        const layout = layoutsValidos[sorteador];

        return res.status(200).json(layout);

    } catch (error) {
        return res.status(500).json({ mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo" });
    }
}

module.exports = { addLayout, listarLayout, atualizarLayout, deletarLayout, sortearLayout }