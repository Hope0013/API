const prompt = require('prompt-sync')();

function consultarCEP(){
    // 1. Solicita o CEP
    let cep = prompt("Digite o CEP (somente números): ");
    cep = cep.trim();
    //2. Monta a URL
    const url = `http://viacep.com.br/ws/${cep}/json/`
    //3. Faz a req (GET)
    fetch(url)
    .then((resposta) => {
        return resposta.json();
    })
    .then((dados)=> {
        if(dados.erro){
            console.log("CEP não encontrado!");
            return;
        }
    //4. Retorna os dados
    console.log("\nDados do CEP: ");
    console.log("CEP: ", dados.cep);
    console.log("Logradouro: ", dados.logradouro);
    console.log("Bairro: ", dados.bairro);
    console.log("Cidade: ", dados.localidade);
    console.log("UF: ", dados.uf);
    })
    .catch((erro) => {
        console.log("Erro ao acessar API: ");
        console.log(erro.message);
    });
}

consultarCEP();