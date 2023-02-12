// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('teste', 'root', 'meutel8414', {
//     host: "localhost",
//     dialect: 'mysql'
// })

// const Postagem = sequelize.define('postagens', {
//     titulo: {
//         type: Sequelize.STRING
//     },
//     conteudo: {
//         type: Sequelize.TEXT
//     }
// })
// Postagem.sync({force: true})

// Postagem.create({
//     titulo: "titulo qualquer",
//     conteudo: "conteudo qualquer"
// })

// const Usuario = sequelize.define('usuarios', {
//     nome: {
//         type: Sequelize.STRING
//     },
//     sobrenome: {
//         type: Sequelize.STRING
//     },
//     idade: {
//         type: Sequelize.STRING
//     },
//     email: {
//         type: Sequelize.STRING
//     }
// })
// Usuario.sync({force: true})
// Usuario.create({
//     nome: "Maria",
//     sobrenome: "Damo",
//     idade: "19",
//     email: "maria@email.com"
// })


// sequelize.authenticate().then(function(){ /*para conectar com o banco de dados*/
//     console.log("conectado com sucesso")

// }).catch(function(erro){
//     console.log("erro ao conectar: " + erro)   
// })
