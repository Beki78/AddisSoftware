import mongoose from "mongoose"

const MusicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

const Music = mongoose.model("music", MusicSchema)
export default Music
