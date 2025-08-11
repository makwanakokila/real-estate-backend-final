const express = require('express');
const router = express.Router();
const projectController = require('../Controller/ProjectController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Correctly point to the 'uploads' directory at the project root
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// This defines which fields can accept files and how many
const uploadFields = upload.fields([
  { name: 'imageUrl', maxCount: 1 },
  { name: 'brochureUrl', maxCount: 1 },
  { name: 'screenshots', maxCount: 10 }
]);

// --- Project Routes ---
router.post('/projects', uploadFields, projectController.addProject);
router.get('/projects', projectController.getProjects);
router.get('/projects/:id', projectController.getProjectById);
router.put('/projects/:id', uploadFields, projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;