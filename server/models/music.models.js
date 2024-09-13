import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store the image path
      required: true,
    },
  },
  { timestamps: true }
);

const Music = mongoose.model("music", MusicSchema);
export default Music;
