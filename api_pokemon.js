const prompt = require('prompt-sync')();

// Função para consultar um Pokémon usando a PokeAPI
function consultarPokemon(){
    // Trim para remover espaços e lower case para deixar tudo minusculo e não dar erro quando formos pesquisar por um pokémon da api
    let pokemon = prompt("Digite o Nome do Pokémon: ").trim().toLowerCase();
    // Pegamos a url para encontrar um pokemon e adicionamos o nome digitado pelo usúario
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    
    // Usamos o fetch par abuscar os dados externos da API
    fetch(url)
        // Se o pokémon não for encontrado dará mensagem de erro
        .then((resposta) => {
            if(!resposta.ok){
                throw new Error("Pokémon não Encontrado");
            }
            return resposta.json();
        })

        // Se o pokémon for encontrado, suas caracteristicas aparecerão aqui
        .then((dados) => {
            console.log("\n---Dados do Pokémon---");
            console.log("Nome: ", dados.name);
            // O tipo e as habilidades tem um link próprio, são separadas do pokémon. 
            // Então para acharmos as habilidades e tipos específicos daquele pokémon precisamos usar o map, 
            // para mapear as habilidades/tipos pelo nome do pokémon
            const tipos = dados.types.map(info => info.type.name).join(', ');
            console.log("Tipo(s): ", tipos);
            const habilidades = dados.abilities.map(info => info.ability.name).join(', ');
            console.log("Habilidades: ", habilidades);

            // Aqui puxamos peso e altura, que estão presentes na url do pokémon então não precisamos mapear
            console.log("Peso: ", dados.weight /10, "kg")
            console.log("Altura: ", dados.height /10, "m")
            // A API coloca peso em hectogramas e altura em decimetros, 
            // então dicidi por 10 para ficar mais familiar para o usúario e não haver confusão
        })
        
        .catch((erro) => {
            console.log("\n[ERRO]:", erro.message);
        });
}

// Inicia a função
consultarPokemon();