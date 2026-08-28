const { Schema, model } = require("mongoose");
const { Student } = require("./studentSchema");
const { Group } = require("./groupSchema");

const studentGroupSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: Student, required: true },
  group_id: { type: Schema.Types.ObjectId, ref: Group, required: true },
});

const StudentGroup = model("StudentGroup", studentGroupSchema);
module.exports = { StudentGroup };
