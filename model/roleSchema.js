const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  role: { type: String, enum: ["student", "teacher", "admin"] },
});

const Role = model("role", roleSchema);

module.exports = { Role };
