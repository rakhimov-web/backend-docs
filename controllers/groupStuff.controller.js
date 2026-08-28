const { GroupStuff } = require("../model/groupStuffSchema");

const postGroupStuff = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;
    const newGroupStuff = new GroupStuff({ group_id, stuff_id });
    await newGroupStuff.save();
    return res.status(201).json({
      success: true,
      message: "Xodim guruhga biriktirildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Biriktirishda xato yuz berdi",
    });
  }
};

// -----------------Get GroupStuffs-----------------
const getGroupStuffs = async (req, res) => {
  try {
    const groupStuffs = await GroupStuff.find({});
    res.json({
      success: true,
      message: "Barcha birikmalar ro'yxati olingan.",
      innerData: groupStuffs,
    });
  } catch (error) {
    console.error("Error fetching group stuffs:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Birikmalarni olishda xato yuz berdi.",
    });
  }
};

// Delete GroupStuff
const deleteGroupStuff = async (req, res) => {
  try {
    const groupStuffId = req.params.id;
    const deleteGroupStuff = await GroupStuff.findByIdAndDelete(groupStuffId);

    if (!deleteGroupStuff) {
      return res.status(404).json({ message: "Group stuff not found" });
    }

    res.json({
      message: "Group stuff deleted successfully",
      deleteGroupStuff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { postGroupStuff, getGroupStuffs, deleteGroupStuff };
