const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Função para manipular
const requestHandler = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'aplication/json');

    if(req.url === '/hello' && req.method === 'GET'){
        res.end(JSON.stringify({
            message: 'Olá Mundo!'
        }));
    }else{
        res.statusCode = 404;
        res.end(JSON.stringify({
            error: 'Rota não Encontrada'
        }));
    }
};

const server = http.createServer(requestHandler);

server.listen(port, hostname, () => {
    console.log(`Servidor rodado em http>//${hostname}:${port}/`)
});