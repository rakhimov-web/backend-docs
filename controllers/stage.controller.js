const { Stage } = require("../model/stageSchema");

const postStage = async (req, res) => {
  try {
    const { name } = req.body;
    const newStage = new Stage({ name });
    await newStage.save();
    return res.status(201).json({
      success: true,
      message: "Bosqich yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Bosqich yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Stages-----------------
const getStages = async (req, res) => {
  try {
    const stages = await Stage.find({});
    res.json({
      success: true,
      message: "Barcha bosqichlar ro'yxati olingan.",
      innerData: stages,
    });
  } catch (error) {
    console.error("Error fetching stages:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Bosqichlarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get stage by id -----------------
const getStageById = async (req, res) => {
  try {
    const stageId = req.params.id;
    const stage = await Stage.findById(stageId);

    if (!stage) {
      return res.status(404).json({ message: "Stage not found" });
    }
    return res.status(200).json({ message: "Stage found", stage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update stage--------------------
const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateStage = await Stage.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (!updateStage) {
      return res.status(404).json({
        success: false,
        message: "Stage not found",
      });
    }
    res.json({
      success: true,
      message: "Stage updated successfully!",
      stage: updateStage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Stage
const deleteStage = async (req, res) => {
  try {
    const stageId = req.params.id;
    const deleteStage = await Stage.findByIdAndDelete(stageId);

    if (!deleteStage) {
      return res.status(404).json({ message: "Stage not found" });
    }

    res.json({ message: "Stage deleted successfully", deleteStage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postStage,
  getStages,
  getStageById,
  updateStage,
  deleteStage,
};
