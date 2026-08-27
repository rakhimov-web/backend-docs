const { Role } = require("../model/roleSchema");

const postRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = new Role({ name });
    await newRole.save();
    return res.status(201).json({
      success: true,
      message: "Role yaratildi",
      innerData: newRole,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha rollar ro'yxati olingan",
      innerData: roles,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ success: false, message: "Role topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: role });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedRole) {
      return res.status(404).json({ success: false, message: "Role topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Role yangilandi",
      innerData: updatedRole,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);

    if (!deletedRole) {
      return res.status(404).json({ message: "Role topilmadi" });
    }

    return res.json({ message: "Role o'chirildi", deletedRole });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = { postRole, getRoles, getRoleById, updateRole, deleteRole };
