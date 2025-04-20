const { Schema, model } = require("mongoose");

const packageSchema = new Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    destination: { type: String, required: true },
    weight: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Package", packageSchema);
