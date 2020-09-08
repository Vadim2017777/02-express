const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "../../db/contacts.json");
const DataBase = require(contactsPath);

const listContacts = () => DataBase;

const getContactById = (contactId) =>
  DataBase.filter((contact) => contact.id === Number(contactId));

const removeContact = (contactId) => {
  let contacts = DataBase.filter((contact) => contact.id !== Number(contactId));
  if (DataBase.length === contacts.length) {
    return false;
  }
  fs.writeFile(contactsPath, JSON.stringify(contacts), function (err) {
    if (err) throw err;
  });
  return true;
};

const addContact = (name, email, phone) => {
  fs.readFile(contactsPath, function (err, data) {
    let json = JSON.parse(data);
    let lastId = json.length + 1;
    json.push({ id: lastId, name, email, phone });

    fs.writeFile(contactsPath, JSON.stringify(json), function (err, data) {
      if (err) throw err;
    });
  });
  return DataBase.pop();
};

const updateContact = (id, reqBody) => {
  const targetContact = DataBase.findIndex(
    (contact) => contact.id === Number(id)
  );

  if (targetContact === -1) {
    return false;
  }
  const updateContact = (DataBase[targetContact] = {
    ...DataBase[targetContact],
    ...reqBody,
  });

  fs.writeFile(contactsPath, JSON.stringify(DataBase), function (err) {
    if (err) throw err;
  });
  return DataBase[targetContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
