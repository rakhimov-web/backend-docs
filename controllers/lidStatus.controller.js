const { LidStatus } = require("../model/lidStatusSchema");

const postLidStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const newLidStatus = new LidStatus({ status });
    await newLidStatus.save();
    return res.status(201).json({
      success: true,
      message: "Lid statusi yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Lid statusi yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get LidStatuses-----------------
const getLidStatuses = async (req, res) => {
  try {
    const lidStatuses = await LidStatus.find({});
    res.json({
      success: true,
      message: "Barcha lid statuslari ro'yxati olingan.",
      innerData: lidStatuses,
    });
  } catch (error) {
    console.error("Error fetching lid statuses:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Lid statuslarini olishda xato yuz berdi.",
    });
  }
};

// -----------------Get lid status by id -----------------
const getLidStatusById = async (req, res) => {
  try {
    const lidStatusId = req.params.id;
    const lidStatus = await LidStatus.findById(lidStatusId);

    if (!lidStatus) {
      return res.status(404).json({ message: "Lid status not found" });
    }
    return res.status(200).json({ message: "Lid status found", lidStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update lid status--------------------
const updateLidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateLidStatus = await LidStatus.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updateLidStatus) {
      return res.status(404).json({
        success: false,
        message: "Lid status not found",
      });
    }
    res.json({
      success: true,
      message: "Lid status updated successfully!",
      lidStatus: updateLidStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete LidStatus
const deleteLidStatus = async (req, res) => {
  try {
    const lidStatusId = req.params.id;
    const deleteLidStatus = await LidStatus.findByIdAndDelete(lidStatusId);

    if (!deleteLidStatus) {
      return res.status(404).json({ message: "Lid status not found" });
    }

    res.json({
      message: "Lid status deleted successfully",
      deleteLidStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postLidStatus,
  getLidStatuses,
  getLidStatusById,
  updateLidStatus,
  deleteLidStatus,
};
