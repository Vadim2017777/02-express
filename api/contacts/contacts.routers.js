// const { Router } = require("express");

const express = require("express");
const userRouter = express.Router();
const {
  listContacts,
  findContact,
  addContacts,
  deleteContacts,
  patchContact,
} = require("./contacts.controller");

module.exports = userRouter.get("/contacts", listContacts);
module.exports = userRouter.get("/contacts/:contactId", findContact);
module.exports = userRouter.post("/contacts", addContacts);
module.exports = userRouter.delete("/contacts/:contactId", deleteContacts);
module.exports = userRouter.patch("/contacts/:contactId", patchContact);
