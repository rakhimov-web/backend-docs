const { StudentLesson } = require("../model/studentLessonSchema");

const postStudentLesson = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;
    const newStudentLesson = new StudentLesson({
      lesson_id,
      student_id,
      is_there,
      reason,
      be_paid,
    });
    await newStudentLesson.save();
    return res.status(201).json({
      success: true,
      message: "Davomat saqlandi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Davomat saqlashda xato yuz berdi",
    });
  }
};

// -----------------Get StudentLessons-----------------
const getStudentLessons = async (req, res) => {
  try {
    const studentLessons = await StudentLesson.find({});
    res.json({
      success: true,
      message: "Barcha davomatlar ro'yxati olingan.",
      innerData: studentLessons,
    });
  } catch (error) {
    console.error("Error fetching student lessons:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Davomatlarni olishda xato yuz berdi.",
    });
  }
};

// -------------------------Update student lesson--------------------
const updateStudentLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;
    const updateStudentLesson = await StudentLesson.findByIdAndUpdate(
      id,
      { lesson_id, student_id, is_there, reason, be_paid },
      { new: true },
    );
    if (!updateStudentLesson) {
      return res.status(404).json({
        success: false,
        message: "Student lesson not found",
      });
    }
    res.json({
      success: true,
      message: "Student lesson updated successfully!",
      studentLesson: updateStudentLesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { postStudentLesson, getStudentLessons, updateStudentLesson };
