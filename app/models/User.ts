import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    roomno: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    requestType: {
      type: [String], // Now an array to allow multiple selections
      enum: ["Cleaning", "Maintenance"], // Removed "Nothing", as an empty array represents no request
      default: [], // Default to an empty array (no requests)
    },
    status: {
      cleaning: {
        type: String,
        enum: ["pending", "completed", "not_requested"],
        default: "not_requested",
      },
      maintenance: {
        type: String,
        enum: ["pending", "completed", "not_requested"],
        default: "not_requested",
      },
    },
    image: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
