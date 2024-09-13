import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Music from "./models/music.models.js";
import cors from "cors"
import multer from "multer";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3001;


// app.use("/uploads", express.static("uploads"));

// // Configure Multer for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/upload", upload.single("photo"), (req, res) => {
//   // Return the file URL
//   res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
// });

// POST route with image upload
// app.post("/", upload.single("image"), async (req, res) => {
//   const { title, artist } = req.body;
//   const image = req.file?.path; // File path from Multer

//   try {
//     if (!title || !artist || !image) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const music = await Music.create({ title, artist, image });
//     res.status(200).json({ music });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

app.post("/", async (req, res) => {
  const body = req.body;
  try {
    if (!body) {
      return res.status(400).json({ message: "error" });
    }
    const music = await Music.create(body);
    res.status(200).json({ music });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/", async (req, res) => {
  const body = req.body;
  try {
    if (!body) {
      return res.status(400).json({ message: "error" });
    }
    const music = await Music.find(body);
    res.status(200).json({ music });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "id not found" });
    }
    const music = await Music.findById(id);
    res.status(200).json({ music });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findByIdAndUpdate(id, req.body);
    if (!music) {
      return res.status(400).json({ message: "music not found" });
    }
    const newMusic = await Music.findById(music);
    res.status(200).json({ newMusic });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "music not found" });
    }
    const music = await Music.findByIdAndDelete(id);
    res.status(200).json({ music });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB is connected");
    app.listen(PORT, () => {
      console.log(`server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
