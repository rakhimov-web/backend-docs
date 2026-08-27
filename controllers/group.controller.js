const { Group } = require("../model/groupSchema");

const postGroup = async (req, res) => {
  try {
    const {
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_id,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    } = req.body;

    const newGroup = new Group({
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_id,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    });
    await newGroup.save();
    return res.status(201).json({
      success: true,
      message: "Guruh yaratildi",
      innerData: newGroup,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha guruhlar ro'yxati olingan",
      innerData: groups,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const searchGroups = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Group.find({
      group_name: { $regex: query, $options: "i" },
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday guruh topilmadi" });
    }

    return res.json(result);
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ success: false, message: "Guruh topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: group });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      group_name,
      lesson_start_time,
      lesson_continuous,
      lesson_week_day,
      group_stage_id,
      room_number,
      room_floor,
      branch_id,
      lessons_quant,
      is_active,
    } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      {
        group_name,
        lesson_start_time,
        lesson_continuous,
        lesson_week_day,
        group_stage_id,
        room_number,
        room_floor,
        branch_id,
        lessons_quant,
        is_active,
      },
      { new: true },
    );

    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: "Guruh topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Guruh yangilandi",
      innerData: updatedGroup,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Guruh topilmadi" });
    }

    return res.json({ message: "Guruh o'chirildi", deletedGroup });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postGroup,
  getGroups,
  searchGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
