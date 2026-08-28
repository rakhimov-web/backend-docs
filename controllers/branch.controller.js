const { Branch } = require("../model/branchSchema");

const postBranch = async (req, res) => {
  try {
    const { name, address, call_number } = req.body;
    const newBranch = new Branch({ name, address, call_number });
    await newBranch.save();
    return res.status(201).json({
      success: true,
      message: "Filial yaratildi",
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Filial yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Branches-----------------
const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.json({
      success: true,
      message: "Barcha filiallar ro'yxati olingan.",
      innerData: branches,
    });
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Filiallarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get branch by id -----------------
const getBranchById = async (req, res) => {
  try {
    const branchId = req.params.id;
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    return res.status(200).json({ message: "Branch found", branch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update branch--------------------
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, call_number } = req.body;
    const updateBranch = await Branch.findByIdAndUpdate(
      id,
      { name, address, call_number },
      { new: true },
    );
    if (!updateBranch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }
    res.json({
      success: true,
      message: "Branch updated successfully!",
      branch: updateBranch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Branch
const deleteBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const deleteBranch = await Branch.findByIdAndDelete(branchId);

    if (!deleteBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.json({ message: "Branch deleted successfully", deleteBranch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
