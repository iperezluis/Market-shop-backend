const { Schema, model, Model, models } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, minLength: 3, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minLength: 5, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        default: "client",
        required: true,
      },
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        refer: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

module.exports = User;
