const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

app.use(express.json());

const arquivo = "./contatos.json";

function lerDados(){
    const dados = fs.readFileSync(arquivo, "utf-8");

    return JSON.parse(dados);
}

function salvarDados(dados){
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
}

// Escolhe u grupo para adicionar o contato
app.get("/contatos/:grupo", (req, res) => {
    const grupo = req.params.grupo;
    const dados = lerDados();

    if(!dados[grupo]) {
        return res.status(404).json({erro: "Grupo não encontrado"});
    }

    res.json(dados[grupo]);
});

// Adiciona o contato
app.post("/contatos/:grupo", (req, res) => {
    const grupo = req.params.grupo;
    const{nome, telefone} = req.body;
    const dados = lerDados();

    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }
    if(!nome || !telefone){
        return res.status(400).json({erro: "Nome e telefone são obrigatórios"});
    }

    dados[grupo].push({nome, telefone});

    salvarDados(dados);

    res.status(201).json({
        mensagem: "Contato Adicionado com Sucesso!",
        contato: {nome, telefone}
    });

});

// Atualiza um contato
app.put("/contatos/:grupo/:index", (req, res) => {
    const grupo = req.params.grupo;
    const index = parseInt(req.params.index);
    const {nome, telefone} = req.body;

    const dados = lerDados();

    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }

    if(index < 0 || index >= dados[grupo].length){
        return res.status(404).json({erro: "Contato não encontrado"});
    }

    dados[grupo][index] = {nome, telefone};
    salvarDados(dados);

    res.json({
        mensagem: "Contato Atualizado com Sucesso!",
        contato: dados[grupo][index]
    });
});

app.delete("/contatos/:grupo/:index", (req, res) => {
    const grupo = req.params.grupo;
    const index = parseInt(req.params.index);

    const dados = lerDados();

    if(!dados[grupo]){
        return res.status(404).json({erro: "Grupo não encontrado"});
    }

    if(index < 0 || index >= dados[grupo].length){
        return res.status(404).json({erro: "Contato não encontrado"});
    }

    const removido = dados[grupo].splice(index, 1);
    salvarDados(dados);
    
    res.json({
        mensagem: "Contato Excluido com Sucesso!",
        contato: removido[0]
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});