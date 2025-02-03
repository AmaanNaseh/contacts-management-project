const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // It's id generated in Register in User schema & not written by user in this schema
      // as it is not our id but mongodb created id so access like this instead of _id as it's model not controller
      required: true,
      ref: "users", // the one we declare when doing mongoose.model("collectionName", Schema)
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("contacts", ContactSchema);

module.exports = ContactModel;
