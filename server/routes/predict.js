const express = require("express");
const path = require("path");
const tf = require("@tensorflow/tfjs-node");

const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const canvas = require("canvas");

let model;

async () => {
  try {
    const modelPath = path.resolve(
      __dirname,
      "./cropnoses/cropnoses/model.json"
    );
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("✅ Model loaded from:", modelPath);
  } catch (error) {
    console.error("❌ Failed to load model:", error);
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/predict", upload.single("image"), async (req, res) => {
  try {
    // Check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Get the uploaded image buffer
    const imageBuffer = req.file.buffer;

    // Decode the image buffer to a tensor (RGB)
    const imageTensor = tf.node.decodeImage(imageBuffer, 3); // RGB channels

    // Preprocess the image: resize and normalize the pixel values
    const resized = tf.image
      .resizeBilinear(imageTensor, [224, 224]) // Resize to model input size
      .div(255.0) // Normalize to [0, 1]
      .expandDims(0); // Add batch dimension

    // Make the prediction using your model
    const prediction = model.predict(resized);
    const result = prediction.arraySync();

    // Send the result as JSON
    res.json({ prediction: result });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;
