const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

// Resolvers populate data
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const auth = require("./utils/auth");

var PORT = process.env.PORT || 3001;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-3o0afhwh.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://whispering-chamber-76792.herokuapp.com/",
  issuer: "https://dev-3o0afhwh.us.auth0.com/",
  algorithms: ["RS256"],
});

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  playground: true,
});

server.start().then((res) => {
  server.applyMiddleware({ app });

  // Middleware to convert objects served as objects
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(jwtCheck);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

  app.get("/authorized", function (req, res) {
    res.send("Secured Resource");
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
});
