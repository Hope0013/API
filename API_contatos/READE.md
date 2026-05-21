# Documentação da API de Contatos

### Para fazermos o GET e visualizarmos quais são os grupos e os contatos disponiveis nós:

- Abrimos o Postman(com o GET selecionado) ou o navegador e colocamos a URL: http://localhost:3000/contatos/:grupo

### Para adicionarmos contatos nós:

- Vamos para o Postman, selecionamos o POST, vamos para o body e selecionamos a opção "raw". Lá nos escrevemos no formato JSON o nome e telefone que desejamos adicionar;
- A URL é a mesma: http://localhost:3000/contatos/:grupo

### Para atualizar um contato nós:

- Mudamos de POST para PUT, continuamos no body e escrevemos da mesma forma