const { Stage } = require("../model/stageSchema");

const postStage = async (req, res) => {
  try {
    const { name } = req.body;
    const newStage = new Stage({ name });
    await newStage.save();
    return res.status(201).json({
      success: true,
      message: "Bosqich yaratildi",
      innerData: newStage,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getStages = async (req, res) => {
  try {
    const stages = await Stage.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha bosqichlar ro'yxati olingan",
      innerData: stages,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getStageById = async (req, res) => {
  try {
    const stage = await Stage.findById(req.params.id);

    if (!stage) {
      return res
        .status(404)
        .json({ success: false, message: "Bosqich topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: stage });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedStage = await Stage.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );

    if (!updatedStage) {
      return res
        .status(404)
        .json({ success: false, message: "Bosqich topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Bosqich yangilandi",
      innerData: updatedStage,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteStage = async (req, res) => {
  try {
    const deletedStage = await Stage.findByIdAndDelete(req.params.id);

    if (!deletedStage) {
      return res.status(404).json({ message: "Bosqich topilmadi" });
    }

    return res.json({ message: "Bosqich o'chirildi", deletedStage });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postStage,
  getStages,
  getStageById,
  updateStage,
  deleteStage,
};
