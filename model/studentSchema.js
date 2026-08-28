const { Schema, model } = require("mongoose");
const { Lid } = require("./lidSchema");

const studentSchema = new Schema({
  lid_id: { type: Schema.Types.ObjectId, ref: Lid, required: true },
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  phone_number: { type: String, required: true, trim: true },
  birthday: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
});

const Student = model("Student", studentSchema);
module.exports = { Student };
