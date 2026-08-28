const { StudentGroup } = require("../model/studentGroupSchema");

const postStudentGroup = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;
    const newStudentGroup = new StudentGroup({ student_id, group_id });
    await newStudentGroup.save();
    return res.status(201).json({
      success: true,
      message: "Talaba guruhga biriktirildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Biriktirishda xato yuz berdi",
    });
  }
};

// -----------------Get StudentGroups-----------------
const getStudentGroups = async (req, res) => {
  try {
    const studentGroups = await StudentGroup.find({});
    res.json({
      success: true,
      message: "Barcha birikmalar ro'yxati olingan.",
      innerData: studentGroups,
    });
  } catch (error) {
    console.error("Error fetching student groups:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Birikmalarni olishda xato yuz berdi.",
    });
  }
};

// Delete StudentGroup
const deleteStudentGroup = async (req, res) => {
  try {
    const studentGroupId = req.params.id;
    const deleteStudentGroup =
      await StudentGroup.findByIdAndDelete(studentGroupId);

    if (!deleteStudentGroup) {
      return res.status(404).json({ message: "Student group not found" });
    }

    res.json({
      message: "Student group deleted successfully",
      deleteStudentGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { postStudentGroup, getStudentGroups, deleteStudentGroup };
