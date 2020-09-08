const contactsFunctions = require("./contacts.model");
const { contactsValadation } = require("./contacts.validation");

exports.listContacts = (req, res) => {
  const contacts = contactsFunctions.listContacts();
  return res.status(200).json(contacts);
};

exports.findContact = (req, res) => {
  let id = req.params.contactId;
  const contact = contactsFunctions.getContactById(id);

  if (contact.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

exports.addContacts = (req, res) => {
  const { error } = contactsValadation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const contacts = contactsFunctions.addContact(
    req.body.name,
    req.body.email,
    req.body.phone
  );

  return res.status(201).json(contacts);
};

exports.deleteContacts = (req, res) => {
  let id = req.params.contactId;
  const contacts = contactsFunctions.removeContact(id);
  if (contacts) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
};

exports.patchContact = (req, res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  let id = req.params.contactId;
  const contact = contactsFunctions.updateContact(id, req.body);

  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};
