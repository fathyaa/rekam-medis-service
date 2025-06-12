const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers.js');
const db = require('./models');
const path = require('path');
const app = express();

// ✅ Serve file HTML & aset statis dari folder /public
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Tambahkan context agar resolvers bisa akses db
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ db })
});

async function start() {
  await server.start();
  server.applyMiddleware({ app });

  // Sync database
  db.sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database synced');
  });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

start();