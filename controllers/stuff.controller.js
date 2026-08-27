const { Stuff } = require("../model/stuffSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postStuff = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;
    const existingStuff = await Stuff.findOne({ login });

    if (existingStuff) {
      return res.status(400).json({
        success: false,
        message: "Bunday login mavjud",
      });
    }

    const hashedPassword = await bcrypt.hash(parol, 10);
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
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getStuffs = async (req, res) => {
  try {
    const stuffs = await Stuff.find({}).select("-parol");
    return res.status(200).json({
      success: true,
      message: "Barcha stufflar ro'yxati olingan",
      innerData: stuffs,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

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

    return res.json(result);
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

const getStuffById = async (req, res) => {
  try {
    const stuff = await Stuff.findById(req.params.id).select("-parol");

    if (!stuff) {
      return res.status(404).json({ success: false, message: "Stuff topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: stuff });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updateStuff = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, login, parol, is_active } =
      req.body;

    const updateData = {
      first_name,
      last_name,
      phone_number,
      login,
      is_active,
    };

    if (parol) {
      updateData.parol = await bcrypt.hash(parol, 10);
    }

    const updatedStuff = await Stuff.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-parol");

    if (!updatedStuff) {
      return res.status(404).json({ success: false, message: "Stuff topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "Stuff yangilandi",
      innerData: updatedStuff,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deleteStuff = async (req, res) => {
  try {
    const deletedStuff = await Stuff.findByIdAndDelete(req.params.id);

    if (!deletedStuff) {
      return res.status(404).json({ message: "Stuff topilmadi" });
    }

    return res.json({ message: "Stuff o'chirildi", deletedStuff });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

const loginStuff = async (req, res) => {
  try {
    const { login, parol } = req.body;
    const stuff = await Stuff.findOne({ login });

    if (!stuff) {
      return res.status(401).json({
        success: false,
        message: "Login yoki parol noto'g'ri",
      });
    }

    const passwordMatch = await bcrypt.compare(parol, stuff.parol);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Login yoki parol noto'g'ri",
      });
    }

    const token = jwt.sign({ login: stuff.login }, "secret");
    return res.json({
      message: "Token",
      token: token,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = {
  postStuff,
  getStuffs,
  searchStuffs,
  getStuffById,
  updateStuff,
  deleteStuff,
  loginStuff,
};
