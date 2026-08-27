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
      innerData: newLesson,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha darslar ro'yxati olingan",
      innerData: lessons,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

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

    return res.json(result);
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Dars topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: lesson });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { lesson_theme, lesson_number, group_id, lesson_date },
      { new: true },
    );

    if (!updatedLesson) {
      return res.status(404).json({ success: false, message: "Dars topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Dars yangilandi",
      innerData: updatedLesson,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!deletedLesson) {
      return res.status(404).json({ message: "Dars topilmadi" });
    }

    return res.json({ message: "Dars o'chirildi", deletedLesson });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postLesson,
  getLessons,
  searchLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
};
