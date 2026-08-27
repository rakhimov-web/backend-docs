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
      innerData: newLid,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getLids = async (req, res) => {
  try {
    const lids = await Lid.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha lidlar ro'yxati olingan",
      innerData: lids,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

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

    return res.json(result);
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

const getLidById = async (req, res) => {
  try {
    const lid = await Lid.findById(req.params.id);

    if (!lid) {
      return res.status(404).json({ success: false, message: "Lid topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: lid });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

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

    const updatedLid = await Lid.findByIdAndUpdate(
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

    if (!updatedLid) {
      return res.status(404).json({ success: false, message: "Lid topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Lid yangilandi",
      innerData: updatedLid,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteLid = async (req, res) => {
  try {
    const deletedLid = await Lid.findByIdAndDelete(req.params.id);

    if (!deletedLid) {
      return res.status(404).json({ message: "Lid topilmadi" });
    }

    return res.json({ message: "Lid o'chirildi", deletedLid });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postLid,
  getLids,
  searchLids,
  getLidById,
  updateLid,
  deleteLid,
};
