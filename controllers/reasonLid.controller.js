const { ReasonLid } = require("../model/reasonLidSchema");

const postReasonLid = async (req, res) => {
  try {
    const { reason_lid } = req.body;
    const newReason = new ReasonLid({ reason_lid });
    await newReason.save();
    return res.status(201).json({
      success: true,
      message: "Sabab yaratildi",
      innerData: newReason,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getReasonLids = async (req, res) => {
  try {
    const reasons = await ReasonLid.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha sabablar ro'yxati olingan",
      innerData: reasons,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getReasonLidById = async (req, res) => {
  try {
    const reason = await ReasonLid.findById(req.params.id);

    if (!reason) {
      return res
        .status(404)
        .json({ success: false, message: "Sabab topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: reason });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateReasonLid = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason_lid } = req.body;

    const updatedReason = await ReasonLid.findByIdAndUpdate(
      id,
      { reason_lid },
      { new: true },
    );

    if (!updatedReason) {
      return res
        .status(404)
        .json({ success: false, message: "Sabab topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Sabab yangilandi",
      innerData: updatedReason,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteReasonLid = async (req, res) => {
  try {
    const deletedReason = await ReasonLid.findByIdAndDelete(req.params.id);

    if (!deletedReason) {
      return res.status(404).json({ message: "Sabab topilmadi" });
    }

    return res.json({ message: "Sabab o'chirildi", deletedReason });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postReasonLid,
  getReasonLids,
  getReasonLidById,
  updateReasonLid,
  deleteReasonLid,
};
