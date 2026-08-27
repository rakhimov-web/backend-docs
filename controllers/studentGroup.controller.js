const { StudentGroup } = require("../model/studentGroupSchema");

const postStudentGroup = async (req, res) => {
  try {
    const { student_id, group_id } = req.body;
    const newPivot = new StudentGroup({ student_id, group_id });
    await newPivot.save();
    return res.status(201).json({
      success: true,
      message: "Talaba guruhga biriktirildi",
      innerData: newPivot,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getStudentGroups = async (req, res) => {
  try {
    const data = await StudentGroup.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha birikmalar ro'yxati olingan",
      innerData: data,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteStudentGroup = async (req, res) => {
  try {
    const deletedPivot = await StudentGroup.findByIdAndDelete(req.params.id);

    if (!deletedPivot) {
      return res.status(404).json({ message: "Birikma topilmadi" });
    }

    return res.json({ message: "Birikma o'chirildi", deletedPivot });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = { postStudentGroup, getStudentGroups, deleteStudentGroup };
