import knex from 'knex';

//facilita encaminhamento de pastas
//dirname pega a pasta atual ou pode-se usar 'nome da pasta', 'nome do arquivo'
import path from 'path';

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    //Para incluir null num campo vazio do banco de dados
    useNullAsDefault: true,
})

export default db;

//migrations: controlam a versão do banco de dados