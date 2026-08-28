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
    });
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: To'lov yaratishda xato yuz berdi",
    });
  }
};

// -----------------Get Payments-----------------
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.json({
      success: true,
      message: "Barcha to'lovlar ro'yxati olingan.",
      innerData: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: To'lovlarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get payment by id -----------------
const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId).populate("student_id");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment found", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update payment--------------------
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
    const updatePayment = await Payment.findByIdAndUpdate(
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
    if (!updatePayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
    res.json({
      success: true,
      message: "Payment updated successfully!",
      payment: updatePayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete Payment
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const deletePayment = await Payment.findByIdAndDelete(paymentId);

    if (!deletePayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment deleted successfully", deletePayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------search payment--------------------
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

    res.json(result);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      message: "Server error: Failed to fetch payments.",
    });
  }
};

module.exports = {
  postPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  searchPayments,
};
