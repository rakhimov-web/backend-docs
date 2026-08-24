const { Role } = require("../model/roleSchema.js");

const postRole = async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ["admin", "teacher", "student"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Ruxsat berilmagan role kiritildi!",
      });
    }

    const newRole = new Role({ role });
    await newRole.save();

    return res.status(201).json({
      success: true,
      message: "Role muvaffaqiyatli yaratildi!",
    });
  } catch (error) {
    console.error("Error", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Role yaratishda xato yuz berdi",
    });
  }
};

module.exports = { postRole };
