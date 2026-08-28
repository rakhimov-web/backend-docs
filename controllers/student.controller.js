const { Student } = require("../model/studentSchema");

const postStudent = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, lid_id, birthday, gender } =
      req.body;
    const newStudent = new Student({
      first_name,
      last_name,
      phone_number,
      lid_id,
      birthday,
      gender,
    });
    await newStudent.save();
    return res.status(201).json({
      success: true,
      message: "Talaba yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Talaba yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Students-----------------
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({
      success: true,
      message: "Barcha talabalar ro'yxati olingan.",
      innerData: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Talabalarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get student by id -----------------
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).populate("lid_id");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student found", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update student--------------------
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, lid_id, birthday, gender } =
      req.body;
    const updateStudent = await Student.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone_number,
        lid_id,
        birthday,
        gender,
      },
      { new: true },
    );
    if (!updateStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.json({
      success: true,
      message: "Student updated successfully!",
      student: updateStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(studentId);

    if (!deleteStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully", deleteStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------search student--------------------
const searchStudents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Student.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday talaba topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      message: "Server error: Failed to fetch students.",
    });
  }
};

module.exports = {
  postStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
};
