// const express = require("express");
// const paymentRouter = express.Router();
// const { userAuth } = require("../middlewares/auth");
// const razorpayInstance = require("../utils/razorpay");
// const Payment = require("../models/payment");
// const { memberShipAmount } = require("../utils/constant");
// const {
//   validateWebHookSignature,
// } = require("razorpay/dist/utils/razorpay-utils");
// const User = require("../models/user");

// paymentRouter.post("/payment/create", userAuth, async (req, res) => {
//   try {
//     const { memberShipType } = req.body;
//     const { firstName, lastName, emailId } = req.user;

//     const order = await razorpayInstance.orders.create({
//       amount: memberShipAmount[membershipType] * 100,
//       currency: "INR",
//       receipt: "receipt#1",
//       notes: {
//         firstName,
//         lastName,
//         emailId,
//         membershipType: memberShipType,
//       },
//     });

//     const payment = new Payment({
//       userId: req.user._id,
//       orderId: order.id,
//       status: order.status,
//       amount: order.amount,
//       currency: order.currency,
//       receipt: order.receipt,
//       notes: order.notes,
//     });
//     const savedPayment = await payment.save();

//     res.json({ ...savedPayment.toJSON(), keyId: process.env.YOUR_KEY_ID });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

// paymentRouter.post("/payment/webhook", async (req, res) => {
//   try {
//     const webhookSignature = req.get("X-Razorpay-Signature");
//     //* This line will validate the webhook signature
//     const isWebHookValid = await validateWebHookSignature(
//       JSON.stringify(req.body),
//       webhookSignature,
//       process.env.RAZORPAY_WEBHOOK_SECRET,
//     );

//     if (!isWebHookValid) {
//       return res.status(400).json({ mes: "Weebhook Signature is invalid " });
//     }

//     //* Update my payment status  in DB
//     const paymentDetails = req.body.payload.payment.entity;

//     const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
//     payment.status = paymentDetails.status;
//     await payment.save();

//     const user = await User.findOne({_id : payment.userId});
//     user.isPremium = true
//     user.membershipType = payment.notes.membershipType
//     await user.save()

//     //* Update the user to premium

//     // if (req.body.event == "payment.capture") {
//     // }
//     // if (req.body.event == "payment.failed") {
//     // }

//     //* return sucess response to razorpay

//     return res.status(200).json({ mes: "Webhook recieved successfully.." });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

// module.exports = paymentRouter;
