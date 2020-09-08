const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./contacts/contacts.routers");

module.exports = class UsersServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
    this.server.use(morgan("combined"));
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:3000/" }));
  }

  initRoutes() {
    this.server.use("/api", userRouter);
  }

  startListening() {
    this.server.listen(3000, () => {
      console.log("Start listening on port 3000");
    });
  }
};
