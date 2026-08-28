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
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Guruh yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Groups-----------------
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.json({
      success: true,
      message: "Barcha guruhlar ro'yxati olingan.",
      innerData: groups,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Guruhlarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get group by id -----------------
const getGroupById = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findById(groupId)
      .populate("group_stage_id")
      .populate("branch_id");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.status(200).json({ message: "Group found", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update group--------------------
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
    const updateGroup = await Group.findByIdAndUpdate(
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
    if (!updateGroup) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }
    res.json({
      success: true,
      message: "Group updated successfully!",
      group: updateGroup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Group
const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const deleteGroup = await Group.findByIdAndDelete(groupId);

    if (!deleteGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ message: "Group deleted successfully", deleteGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------search group--------------------
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

    res.json(result);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Server error: Failed to fetch groups." });
  }
};

module.exports = {
  postGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  searchGroups,
};
