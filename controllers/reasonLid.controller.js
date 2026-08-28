const { ReasonLid } = require("../model/reasonLidSchema");

const postReasonLid = async (req, res) => {
  try {
    const { reason_lid } = req.body;
    const newReasonLid = new ReasonLid({ reason_lid });
    await newReasonLid.save();
    return res.status(201).json({
      success: true,
      message: "Sabab yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Sabab yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get ReasonLids-----------------
const getReasonLids = async (req, res) => {
  try {
    const reasonLids = await ReasonLid.find({});
    res.json({
      success: true,
      message: "Barcha sabablar ro'yxati olingan.",
      innerData: reasonLids,
    });
  } catch (error) {
    console.error("Error fetching reason lids:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Sabablarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get reason lid by id -----------------
const getReasonLidById = async (req, res) => {
  try {
    const reasonLidId = req.params.id;
    const reasonLid = await ReasonLid.findById(reasonLidId);

    if (!reasonLid) {
      return res.status(404).json({ message: "Reason lid not found" });
    }
    return res.status(200).json({ message: "Reason lid found", reasonLid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update reason lid--------------------
const updateReasonLid = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason_lid } = req.body;
    const updateReasonLid = await ReasonLid.findByIdAndUpdate(
      id,
      { reason_lid },
      { new: true },
    );
    if (!updateReasonLid) {
      return res.status(404).json({
        success: false,
        message: "Reason lid not found",
      });
    }
    res.json({
      success: true,
      message: "Reason lid updated successfully!",
      reasonLid: updateReasonLid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete ReasonLid
const deleteReasonLid = async (req, res) => {
  try {
    const reasonLidId = req.params.id;
    const deleteReasonLid = await ReasonLid.findByIdAndDelete(reasonLidId);

    if (!deleteReasonLid) {
      return res.status(404).json({ message: "Reason lid not found" });
    }

    res.json({
      message: "Reason lid deleted successfully",
      deleteReasonLid,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postReasonLid,
  getReasonLids,
  getReasonLidById,
  updateReasonLid,
  deleteReasonLid,
};
