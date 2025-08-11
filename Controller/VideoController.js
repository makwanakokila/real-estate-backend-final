
const VideoModel = require('../Model/videoModel');
const fs = require('fs');
const path = require('path');

// Upload a new video
const uploadVideo = async (req, res) => {
    try {
        console.log('Request files:', req.files); // Debug log for files
        console.log('Request body:', req.body); // Debug log for body
        const { videoTitle, subTitle } = req.body;
        const videoFile = req.files && req.files['video'] && req.files['video'].length > 0 ? req.files['video'][0] : null;
        const videoPath = videoFile ? `/uploads/${videoFile.filename}` : null;

        if (!videoTitle || !subTitle || !videoPath) {
            return res.status(400).send('All fields (videoTitle, subTitle, video) are required');
        }

        const video = new VideoModel({
            videoTitle,
            subTitle,
            video: videoPath
        });

        await video.save();
        res.status(201).send('Video uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading video: ' + error.message);
    }
};

// Get all videos
const getVideos = async (req, res) => {
    try {
        const videos = await VideoModel.find();
        res.json(videos);
    } catch (error) {
        res.status(500).send('Error retrieving videos: ' + error.message);
    }
};

// Get a specific video by ID
const getVideoById = async (req, res) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        if (!video) {
            return res.status(404).send('Video not found');
        }
        res.json(video);
    } catch (error) {
        res.status(500).send('Error retrieving video: ' + error.message);
    }
};

// Update a video
const updateVideo = async (req, res) => {
    try {
        const { videoTitle, subTitle } = req.body;
        const videoFile = req.files && req.files['video'] && req.files['video'].length > 0 ? req.files['video'][0] : null;
        const videoPath = videoFile ? `/uploads/${videoFile.filename}` : undefined;

        const updateData = { videoTitle, subTitle };
        if (videoPath) updateData.video = videoPath;

        const video = await VideoModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!video) {
            return res.status(404).send('Video not found');
        }
        res.json(video);
    } catch (error) {
        res.status(500).send('Error updating video: ' + error.message);
    }
};

// Delete a video
const deleteVideo = async (req, res) => {
    try {
        const video = await VideoModel.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).send('Video not found');
        }
        const filePath = path.join(__dirname, '../uploads', video.video.split('/').pop());
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.send('Video deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting video: ' + error.message);
    }
};

module.exports = {
    uploadVideo,
    getVideos,
    getVideoById,
    updateVideo,
    deleteVideo
};