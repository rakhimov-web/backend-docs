const { StuffRole } = require("../model/stuffRoleSchema");

const postStuffRole = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;
    const newPivot = new StuffRole({ stuff_id, role_id });
    await newPivot.save();
    return res.status(201).json({
      success: true,
      message: "Rol xodimga biriktirildi",
      innerData: newPivot,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getStuffRoles = async (req, res) => {
  try {
    const data = await StuffRole.find({});
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

const deleteStuffRole = async (req, res) => {
  try {
    const deletedPivot = await StuffRole.findByIdAndDelete(req.params.id);

    if (!deletedPivot) {
      return res.status(404).json({ message: "Birikma topilmadi" });
    }

    return res.json({ message: "Birikma o'chirildi", deletedPivot });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = { postStuffRole, getStuffRoles, deleteStuffRole };
