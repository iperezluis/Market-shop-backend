const { Schema, model, Model, models } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, minLength: 5, required: true },
    description: { type: String, minLength: 7, required: true },
    price: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", productSchema);

module.exports = Product;
