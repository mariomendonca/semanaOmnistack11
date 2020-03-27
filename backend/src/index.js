const express = require('express') 
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(3333)

//express.json vai no corpo da requisiçao e vai converter o json em algo intendivel 

/*
    metodos HTTP:
    GET: buscar info do back-end
    POST: criar info do back-end
    PUT: alterar info do back-end
    DELETE: deletar info do back-end
*/

/*
    tipos de parametros:
    Query Params: parametros nomeado envidaos na rota apos o "?" (filtros, paginaçao) 
    Route Params: Parametros para utilizados para identificar recursos "/:id"
    Request Body: corpo da requisiçao utilizado para criar ou alterar recursos
*/

/*
    SQL: MySql, SQLite, Oracle
    NoSQL: MongoDB, CouchDB
*/

/*
    Driver: SELECT * FROM users
    Query Builder: table('users').selct('*').where()
*/

    // const params = req.query  ex: /users?name=Mario
    // const params = req.params ex: /1
    // const body = req.body