const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  img: Buffer,
  contentType: String,
});

module.exports = mongoose.model("Image", ImageSchema);
