const { Stuff } = require("../model/stuffSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postStuff = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const hashedPassword = await bcrypt.hash(parol, 10);
    const existingStuff = await Stuff.findOne({ login });
    console.log(existingStuff);

    if (existingStuff) {
      return res.status(400).json({
        success: false,
        message: "Bunday login mavjud",
      });
    } else {
      const newStuff = new Stuff({
        first_name,
        last_name,
        phone_number,
        login,
        parol: hashedPassword,
        is_active,
      });
      await newStuff.save();
      return res.status(201).json({
        success: true,
        message: "Stuff muvaffaqiyatli qo'shildi",
      });
    }
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Stuff qo'shishda xato yuz berdi",
    });
  }
};

// -----------------Get Stuffs-----------------
const getStuffs = async (req, res) => {
  try {
    const stuffs = await Stuff.find({}).select("-parol");
    res.json({
      success: true,
      message: "Barcha stufflar ro'yxati olingan.",
      innerData: stuffs,
    });
  } catch (error) {
    console.error("Error fetching stuffs:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Stufflarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get stuff by id -----------------
const getStuffById = async (req, res) => {
  try {
    const stuffId = req.params.id;
    const stuff = await Stuff.findById(stuffId).select("-parol");

    if (!stuff) {
      return res.status(404).json({ message: "Stuff not found" });
    }
    return res.status(200).json({ message: "Stuff found", stuff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update stuff--------------------
const updateStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const updateStuff = await Stuff.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone_number,
        login,
        parol,
        is_active,
      },
      { new: true },
    ).select("-parol");
    if (!updateStuff) {
      return res.status(404).json({
        success: false,
        message: "Stuff not found",
      });
    }
    res.json({
      success: true,
      message: "Stuff updated successfully!",
      stuff: updateStuff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Stuff
const deleteStuff = async (req, res) => {
  try {
    const stuffId = req.params.id;
    const deleteStuff = await Stuff.findByIdAndDelete(stuffId);

    if (!deleteStuff) {
      return res.status(404).json({ message: "Stuff not found" });
    }

    res.json({ message: "Stuff deleted successfully", deleteStuff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------search stuff--------------------
const searchStuffs = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Stuff.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
        { login: { $regex: query, $options: "i" } },
      ],
    }).select("-parol");

    if (result.length === 0) {
      return res.json({ message: "Bunday stuff topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching stuffs:", error);
    res.status(500).json({ message: "Server error: Failed to fetch stuffs." });
  }
};

// -----------------Login-----------------
const loginStuff = async (req, res) => {
  try {
    const { login, parol } = req.body;

    const stuff = await Stuff.findOne({ login });
    console.log(stuff);
    if (!stuff) {
      return res.status(401).json({
        success: false,
        message: "Login is invalid!",
      });
    }

    const passwordMatch = await bcrypt.compare(parol, stuff.parol);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Login or password is invalid!",
      });
    }

    const token = jwt.sign({ login: stuff.login }, "secret");
    return res.json({
      message: "Token",
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: An error occurred during the login process.",
    });
  }
};

module.exports = {
  postStuff,
  getStuffs,
  getStuffById,
  updateStuff,
  deleteStuff,
  searchStuffs,
  loginStuff,
};
