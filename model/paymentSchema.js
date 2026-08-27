const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  payment_last_date: { type: Date, required: true },
  payment_date: { type: Date, required: true },
  price: { type: Number, required: true },
  is_paid: { type: Boolean, default: false },
  total_attent: { type: Number, default: 0 },
});

const Payment = model("Payment", paymentSchema);
module.exports = { Payment };
