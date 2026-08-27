const { Schema, model } = require("mongoose");

const groupStuffSchema = new Schema({
  group_id: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  stuff_id: { type: Schema.Types.ObjectId, ref: "Stuff", required: true },
});

const GroupStuff = model("GroupStuff", groupStuffSchema);
module.exports = { GroupStuff };
