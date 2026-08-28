const { StuffRole } = require("../model/stuffRoleSchema");

const postStuffRole = async (req, res) => {
  try {
    const { stuff_id, role_id } = req.body;
    const newStuffRole = new StuffRole({ stuff_id, role_id });
    await newStuffRole.save();
    return res.status(201).json({
      success: true,
      message: "Rol xodimga biriktirildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Biriktirishda xato yuz berdi",
    });
  }
};

// -----------------Get StuffRoles-----------------
const getStuffRoles = async (req, res) => {
  try {
    const stuffRoles = await StuffRole.find({});
    res.json({
      success: true,
      message: "Barcha birikmalar ro'yxati olingan.",
      innerData: stuffRoles,
    });
  } catch (error) {
    console.error("Error fetching stuff roles:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Birikmalarni olishda xato yuz berdi.",
    });
  }
};

// Delete StuffRole
const deleteStuffRole = async (req, res) => {
  try {
    const stuffRoleId = req.params.id;
    const deleteStuffRole = await StuffRole.findByIdAndDelete(stuffRoleId);

    if (!deleteStuffRole) {
      return res.status(404).json({ message: "Stuff role not found" });
    }

    res.json({
      message: "Stuff role deleted successfully",
      deleteStuffRole,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { postStuffRole, getStuffRoles, deleteStuffRole };
