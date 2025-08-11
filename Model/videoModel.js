const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    videoTitle: { type: String, required: true },
    subTitle: { type: String, required: true },
    video: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const VideoModel = mongoose.model("Video", VideoSchema);

module.exports = VideoModel;