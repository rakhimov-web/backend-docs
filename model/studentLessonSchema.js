const { Schema, model } = require("mongoose");

const studentLessonSchema = new Schema({
  lesson_id: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
  student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  is_there: { type: Boolean, default: false },
  reason: { type: String, required: true, default: "" },
  be_paid: { type: Boolean, required: true, default: false },
});

const StudentLesson = model("StudentLesson", studentLessonSchema);
module.exports = { StudentLesson };
