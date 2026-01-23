const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// allow frontend to read X-Total-Count
server.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

server.use(router);

server.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
