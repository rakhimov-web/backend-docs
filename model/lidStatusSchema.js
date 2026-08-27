const { Schema, model } = require("mongoose");

const lidStatusSchema = new Schema({
  status: { type: String, required: true, trim: true },
});

const LidStatus = model("LidStatus", lidStatusSchema);
module.exports = { LidStatus };
