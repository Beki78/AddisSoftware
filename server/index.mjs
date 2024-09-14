  import express from "express";
  import dotenv from "dotenv";
  import mongoose from "mongoose";
  import Music from "./models/music.models.js";
  import cors from "cors";
  import multer from "multer";
  import path from "path"; // Required for handling file paths
  import { fileURLToPath } from "url";

  dotenv.config();

  const app = express();
  app.use(express.json());
  app.use(cors());

  // Set the PORT
  const PORT = process.env.PORT || 3001;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Configure Multer for image upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
      ); // Unique filename
    },
  });

  const upload = multer({ storage: storage });

  // POST route with image upload
  app.post("/", upload.single("image"), async (req, res) => {
    const { title, artist } = req.body;
    const image = req.file?.path; // Use req.file for the uploaded file

    try {
      if (!title || !artist || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const music = await Music.create({ title, artist, image });
      res.status(200).json({ music });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });


  // GET all music entries
  app.get("/", async (req, res) => {
    try {
      const music = await Music.find({});
      res.status(200).json({ music });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // GET a single music entry by ID
  app.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const music = await Music.findById(id);
      if (!music) {
        return res.status(404).json({ message: "Music not found" });
      }
      res.status(200).json({ music });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // PUT (update) a music entry
  app.put("/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;
    const { title, artist } = req.body;
    const image = req.file?.path; // File path from Multer if a new image is uploaded

    try {
      // Find the music entry and update it
      const music = await Music.findByIdAndUpdate(
        id,
        { title, artist, ...(image && { image }) }, // Update image if provided
        { new: true }
      );

      if (!music) {
        return res.status(404).json({ message: "Music not found" });
      }

      res.status(200).json({ music });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // DELETE a music entry
  app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const music = await Music.findByIdAndDelete(id);
      if (!music) {
        return res.status(404).json({ message: "Music not found" });
      }
      res.status(200).json({ message: "Music deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Connect to MongoDB and start the server
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
