const express = require('express');
const router = express.Router();
const { uploadVideo, getVideos, getVideoById, updateVideo, deleteVideo } = require('../Controller/VideoController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'), false);
        }
    }
});

// Enhanced /upload route with error handling
router.post('/upload', (req, res, next) => {
    upload.fields([{ name: 'video', maxCount: 1 }, { name: 'videoTitle' }, { name: 'subTitle' }])(req, res, (err) => {
        if (err) {
            return res.status(400).send('File upload error: ' + err.message);
        }
        if (!req.files || !req.files['video'] || req.files['video'].length === 0) {
            return res.status(400).send('No video file uploaded');
        }
        next();
    });
}, uploadVideo);

router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', upload.single('video'), updateVideo);
router.delete('/videos/:id', deleteVideo);

module.exports = router;