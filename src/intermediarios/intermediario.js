const verificarPersonagem = (req, res, next) =>{
    const { nome, idade, personalidade, ocupacao, descricao } = req.body;

    if(!nome){
       return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    
    if(!idade){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    
    if(!personalidade){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    if(!ocupacao){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }
    
    if(!descricao){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    next();
}

const verificarCenario = (req, res, next) =>{
    const { tipo, local, epoca } = req.body;

    if(!tipo){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    if(!local){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    if(!epoca){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    next();
}

const verificarLayout = (req, res, next) =>{
    const { tipo, tema } = req.body;

    if(!tipo){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    if(!tema){
        return res.status(400).json({mensagem: "todos os campos são obrigatorios"})
    }

    next();
}

const verificarUp = (req, res, next) =>{
    const {numero} = req.params;

    if(!numero){
        return res.status(400).json({mensagem: "Favor informar o id"});
    }

    next();
}

module.exports = {verificarCenario, verificarLayout, verificarPersonagem, verificarUp}