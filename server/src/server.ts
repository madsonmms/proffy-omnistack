import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
//instrução para o app incluir o pacote de leitura e conversão de json para um objeto no javascript
app.use(express.json());
app.use(routes);

//localhost:3333/users = rota
//users = recursos
app.listen(3333);

//Anotações sobre json

//GET: buscar ou listar uma informação
//POST: criar alguma nova informação
//PUT: atualizar uma informação existente
//DELETE: deletar uma informação existente

//Copo (Request Body): Dados para criação ou atualização de registro
//Route Parems: Identificar qual recurso eu quero atualizar ou deletar
//Query Parems: Paginação, filtros, ordenação