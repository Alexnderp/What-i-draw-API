const fs = require('fs/promises');

const sorteadorGeral = async (req, res) => {

    const bancos = [0, 1, 2];
    const sortear = Math.floor(Math.random() * bancos.length -1);

    try {
        if (sortear === 0) {
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
        }

        if(sortear === 1){
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
        }

        if(sortear === 2){
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
        }
        

    } catch (error) {
        return res.status(500).json({mensagem: "Ops!, ocorreu probleminha e em breve estaremos resolvendo"});
    }
}

module.exports = sorteadorGeral;