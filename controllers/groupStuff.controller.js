const { GroupStuff } = require("../model/groupStuffSchema");

const postGroupStuff = async (req, res) => {
  try {
    const { group_id, stuff_id } = req.body;
    const newPivot = new GroupStuff({ group_id, stuff_id });
    await newPivot.save();
    return res.status(201).json({
      success: true,
      message: "Xodim guruhga biriktirildi",
      innerData: newPivot,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getGroupStuffs = async (req, res) => {
  try {
    const data = await GroupStuff.find({});
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

const deleteGroupStuff = async (req, res) => {
  try {
    const deletedPivot = await GroupStuff.findByIdAndDelete(req.params.id);

    if (!deletedPivot) {
      return res.status(404).json({ message: "Birikma topilmadi" });
    }

    return res.json({ message: "Birikma o'chirildi", deletedPivot });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = { postGroupStuff, getGroupStuffs, deleteGroupStuff };
