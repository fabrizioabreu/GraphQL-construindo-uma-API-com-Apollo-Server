const { ApolloServer } = require('apollo-server')
const userSchema = require('./user/schema/user.graphql')
const userResolvers = require('./user/resolvers/userResolver')

const typeDefs = [userSchema]
const resolvers = [userResolvers] 

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`Servidor rodando na porta ${url}`)
})

// Caso queira rodar em outra porta que não seja a padrão do graphQL, usar o camando abaixo
// server.listen({port: 4001}).then(({}) => {
//   console.log(`Servidor rodando na porta ${url}`)
// })