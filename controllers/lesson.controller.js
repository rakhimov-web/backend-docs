const { Lesson } = require("../model/lessonSchema");

const postLesson = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;
    const newLesson = new Lesson({
      lesson_theme,
      lesson_number,
      group_id,
      lesson_date,
    });
    await newLesson.save();
    return res.status(201).json({
      success: true,
      message: "Dars yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Dars yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Lessons-----------------
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    res.json({
      success: true,
      message: "Barcha darslar ro'yxati olingan.",
      innerData: lessons,
    });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Darslarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get lesson by id -----------------
const getLessonById = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findById(lessonId).populate("group_id");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    return res.status(200).json({ message: "Lesson found", lesson });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update lesson--------------------
const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;
    const updateLesson = await Lesson.findByIdAndUpdate(
      id,
      { lesson_theme, lesson_number, group_id, lesson_date },
      { new: true },
    );
    if (!updateLesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }
    res.json({
      success: true,
      message: "Lesson updated successfully!",
      lesson: updateLesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Lesson
const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const deleteLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deleteLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ message: "Lesson deleted successfully", deleteLesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------search lesson--------------------
const searchLessons = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Lesson.find({
      lesson_theme: { $regex: query, $options: "i" },
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday dars topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Server error: Failed to fetch lessons." });
  }
};

module.exports = {
  postLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
  searchLessons,
};
