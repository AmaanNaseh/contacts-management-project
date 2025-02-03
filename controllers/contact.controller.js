const asyncHandler = require("express-async-handler");
const ContactModel = require("../models/contact.model");

/*
Route:          /api/contacts
Description:    Get all contacts
Access:         Private
Parameter:      NONE
Methods:        GET
*/

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactModel.find({ user_id: req.user.id }); // find all contacts of particular user based on succesful jwt auth & particilar userid
  res.status(200).json({ allContacts: contacts });
});

/*
Route:          /api/contacts/:id
Description:    Get a contact based on id
Access:         Private
Parameter:      id
Methods:        GET
*/

const getContact = asyncHandler(async (req, res) => {
  // const contact = await ContactModel.findOne({ _id: req.params.id }); // old
  const contact = await ContactModel.findById(req.params.id); // it's unique so no need of jwt auth as user manually fills it instead of accessToken.

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({ oneContact: contact });
});

/*
Route:          /api/contacts
Description:    Create new contact
Access:         Private
Parameter:      NONE
Methods:        POST
*/

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await ContactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  }); // no need of equating LHS to RHS key as same name

  res.status(201).json({ newContact: contact });
});

/*
Route:          /api/contacts/:id
Description:    Update a contact based on id
Access:         Private
Parameter:      id
Methods:        PUT
*/

const updateContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Before updation check if matches or not
  // This block is causing error

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other User's contact"
    );
  }

  // precaution as directly accessing mongodb data in mongodb datatype ObjectId so convert to string for comparing both value and datatype

  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

/*
Route:          /api/contacts/:id
Description:    Delete a contact based on id
Access:         Private
Parameter:      id
Methods:        DELETE
*/

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findOne({ _id: req.params.id });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // this block is causing delete error

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to delete other User's contact"
    );
  }

  await ContactModel.deleteOne({ _id: req.params.id }); // faster

  // await ContactModel.findByIdAndDelete(req.params.id); // faster

  // await ContactModel.remove(); // as id in param so it deletes specifically.

  res.status(200).json({ msg: "Contact is deleted" });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
