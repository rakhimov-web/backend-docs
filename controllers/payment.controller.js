const { Payment } = require("../model/paymentSchema");

const postPayment = async (req, res) => {
  try {
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    } = req.body;

    const newPayment = new Payment({
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    });
    await newPayment.save();
    return res.status(201).json({
      success: true,
      message: "To'lov yaratildi",
      innerData: newPayment,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    return res.status(200).json({
      success: true,
      message: "Barcha to'lovlar ro'yxati olingan",
      innerData: payments,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const searchPayments = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Payment.find({ student_id: query });

    if (result.length === 0) {
      return res.json({ message: "Bunday to'lov topilmadi" });
    }

    return res.json(result);
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "To'lov topilmadi" });
    }

    return res.status(200).json({ success: true, innerData: payment });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      student_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        student_id,
        payment_last_date,
        payment_date,
        price,
        is_paid,
        total_attent,
      },
      { new: true },
    );

    if (!updatedPayment) {
      return res
        .status(404)
        .json({ success: false, message: "To'lov topilmadi" });
    }

    return res.status(200).json({
      success: true,
      message: "To'lov yangilandi",
      innerData: updatedPayment,
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "To'lov topilmadi" });
    }

    return res.json({ message: "To'lov o'chirildi", deletedPayment });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  postPayment,
  getPayments,
  searchPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
