const { Role } = require("../model/roleSchema");

const postRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = new Role({ name });
    await newRole.save();
    return res.status(201).json({
      success: true,
      message: "Role yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Role yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Roles-----------------
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json({
      success: true,
      message: "Barcha rollar ro'yxati olingan.",
      innerData: roles,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Rollarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get role by id -----------------
const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    return res.status(200).json({ message: "Role found", role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update role--------------------
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateRole = await Role.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (!updateRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }
    res.json({
      success: true,
      message: "Role updated successfully!",
      role: updateRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Role
const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deleteRole = await Role.findByIdAndDelete(roleId);

    if (!deleteRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({ message: "Role deleted successfully", deleteRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { postRole, getRoles, getRoleById, updateRole, deleteRole };
