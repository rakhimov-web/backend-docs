const { Lid } = require("../model/lidSchema");

const postLid = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    } = req.body;
    const newLid = new Lid({
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    });
    await newLid.save();
    return res.status(201).json({
      success: true,
      message: "Lid yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Lid yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Lids-----------------
const getLids = async (req, res) => {
  try {
    const lids = await Lid.find({});
    res.json({
      success: true,
      message: "Barcha lidlar ro'yxati olingan.",
      innerData: lids,
    });
  } catch (error) {
    console.error("Error fetching lids:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Lidlarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get lid by id -----------------
const getLidById = async (req, res) => {
  try {
    const lidId = req.params.id;
    const lid = await Lid.findById(lidId)
      .populate("lid_stage_id")
      .populate("trial_lesson_group_id")
      .populate("lid_status_id")
      .populate("cancel_reason_id");

    if (!lid) {
      return res.status(404).json({ message: "Lid not found" });
    }
    return res.status(200).json({ message: "Lid found", lid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update lid--------------------
const updateLid = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone_number,
      lid_stage_id,
      test_date,
      trial_lesson_date,
      trial_lesson_time,
      trial_lesson_group_id,
      lid_status_id,
      cancel_reason_id,
    } = req.body;
    const updateLid = await Lid.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone_number,
        lid_stage_id,
        test_date,
        trial_lesson_date,
        trial_lesson_time,
        trial_lesson_group_id,
        lid_status_id,
        cancel_reason_id,
      },
      { new: true },
    );
    if (!updateLid) {
      return res.status(404).json({
        success: false,
        message: "Lid not found",
      });
    }
    res.json({
      success: true,
      message: "Lid updated successfully!",
      lid: updateLid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Lid
const deleteLid = async (req, res) => {
  try {
    const lidId = req.params.id;
    const deleteLid = await Lid.findByIdAndDelete(lidId);

    if (!deleteLid) {
      return res.status(404).json({ message: "Lid not found" });
    }

    res.json({ message: "Lid deleted successfully", deleteLid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------search lid--------------------
const searchLids = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Lid.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday lid topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching lids:", error);
    res.status(500).json({ message: "Server error: Failed to fetch lids." });
  }
};

module.exports = {
  postLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
  searchLids,
};
