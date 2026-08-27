const { StudentLesson } = require("../model/studentLessonSchema");

const postStudentLesson = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;
    const newPivot = new StudentLesson({
      lesson_id,
      student_id,
      is_there,
      reason,
      be_paid,
    });
    await newPivot.save();
    return res.status(201).json({
      success: true,
      message: "Davomat saqlandi",
      innerData: newPivot,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getStudentLessons = async (req, res) => {
  try {
    const data = await StudentLesson.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha davomatlar ro'yxati olingan",
      innerData: data,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateStudentLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;

    const updatedPivot = await StudentLesson.findByIdAndUpdate(
      id,
      { lesson_id, student_id, is_there, reason, be_paid },
      { new: true },
    );

    if (!updatedPivot) {
      return res
        .status(404)
        .json({ success: false, message: "Davomat yozuvi topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Davomat yangilandi",
      innerData: updatedPivot,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

module.exports = { postStudentLesson, getStudentLessons, updateStudentLesson };
