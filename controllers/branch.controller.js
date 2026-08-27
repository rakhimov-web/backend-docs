const { Branch } = require("../model/branchSchema");

const postBranch = async (req, res) => {
  try {
    const { name, address, call_number } = req.body;

    const newBranch = new Branch({ name, address, call_number });
    await newBranch.save();
    return res.status(201).json({
      success: true,
      message: "Filial yaratildi",
      innerData: newBranch,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha filiallar ro'yxati olingan",
      innerData: branches,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Filial topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: branch });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, call_number } = req.body;

    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      { name, address, call_number },
      { new: true },
    );

    if (!updatedBranch) {
      return res
        .status(404)
        .json({ success: false, message: "Filial topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Filial yangilandi",
      innerData: updatedBranch,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const deletedBranch = await Branch.findByIdAndDelete(req.params.id);

    if (!deletedBranch) {
      return res.status(404).json({ message: "Filial topilmadi" });
    }

    return res.json({ message: "Filial o'chirildi", deletedBranch });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
