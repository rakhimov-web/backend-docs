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
      innerData: newStudent,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha talabalar ro'yxati olingan",
      innerData: students,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

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

    return res.json(result);
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Talaba topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: student });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, lid_id, birthday, gender } =
      req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { first_name, last_name, phone_number, lid_id, birthday, gender },
      { new: true },
    );

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Talaba topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Talaba yangilandi",
      innerData: updatedStudent,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Talaba topilmadi" });
    }

    return res.json({ message: "Talaba o'chirildi", deletedStudent });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postStudent,
  getStudents,
  searchStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
