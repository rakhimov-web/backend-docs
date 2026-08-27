const { Schema, model } = require("mongoose");

const stuffSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  phone_number: { type: String, required: true, trim: true },
  login: { type: String, required: true, unique: true, trim: true },
  parol: { type: String, required: true },
  is_active: { type: Boolean, default: true },
});

const Stuff = model("Stuff", stuffSchema);
module.exports = { Stuff };
