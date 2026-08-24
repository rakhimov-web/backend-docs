const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  role: { type: String, enum: ["Student", "Teacher", "Admin"] },
});
