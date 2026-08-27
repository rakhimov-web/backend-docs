const { LidStatus } = require("../model/lidStatusSchema");

const postLidStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const newStatus = new LidStatus({ status });
    await newStatus.save();
    return res.status(201).json({
      success: true,
      message: "Lid statusi yaratildi",
      innerData: newStatus,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getLidStatuses = async (req, res) => {
  try {
    const statuses = await LidStatus.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha lid statuslari ro'yxati olingan",
      innerData: statuses,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getLidStatusById = async (req, res) => {
  try {
    const status = await LidStatus.findById(req.params.id);

    if (!status) {
      return res
        .status(404)
        .json({ success: false, message: "Lid statusi topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: status });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateLidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedStatus = await LidStatus.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Lid statusi topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Lid statusi yangilandi",
      innerData: updatedStatus,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteLidStatus = async (req, res) => {
  try {
    const deletedStatus = await LidStatus.findByIdAndDelete(req.params.id);

    if (!deletedStatus) {
      return res.status(404).json({ message: "Lid statusi topilmadi" });
    }

    return res.json({ message: "Lid statusi o'chirildi", deletedStatus });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postLidStatus,
  getLidStatuses,
  getLidStatusById,
  updateLidStatus,
  deleteLidStatus,
};
