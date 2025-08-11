const Project = require('../Model/ProjectModel');
const path = require('path');
const fs = require('fs');

// --- Helper function to build project data from request ---
const buildProjectData = (body, files, existingProject = null) => {
  const data = {};

  // --- Handle Simple Fields ---
  const simpleFields = [
    'companyName', 'description', 'establishedYear', 'status', 'location', 
    'properties', 'propertyType', 'floorsRequired', 'projectTimeline', 
    'suggestion', 'projectCategory'
  ];
  simpleFields.forEach(field => {
    if (body[field] !== undefined) {
      data[field] = body[field];
    } else if (existingProject) {
      data[field] = existingProject[field];
    }
  });

  // --- Handle Nested Objects ---
  data.details = {
    overview: body['details[overview]'] || existingProject?.details?.overview,
    projectsCount: body['details[projectsCount]'] || existingProject?.details?.projectsCount,
    ongoingCount: body['details[ongoingCount]'] || existingProject?.details?.ongoingCount,
    rating: body['details[rating]'] || existingProject?.details?.rating,
  };
  data.priceRange = {
    min: body['priceRange[min]'] || existingProject?.priceRange?.min,
    max: body['priceRange[max]'] || existingProject?.priceRange?.max,
  };
  data.superArea = {
    min: body['superArea[min]'] || existingProject?.superArea?.min,
    max: body['superArea[max]'] || existingProject?.superArea?.max,
  };
  data.carpetArea = {
    min: body['carpetArea[min]'] || existingProject?.carpetArea?.min,
    max: body['carpetArea[max]'] || existingProject?.carpetArea?.max,
  };
  data.amenities = {
    parking: body['amenities[parking]'] === 'true',
    garden: body['amenities[garden]'] === 'true',
    swimmingPool: body['amenities[swimmingPool]'] === 'true',
  };
  
  // --- Handle File Uploads ---
  const handleFile = (fieldName) => {
    if (files && files[fieldName]) {
      // New file is uploaded
      data[fieldName] = `uploads/${files[fieldName][0].filename}`;
      // If updating, delete the old file
      if (existingProject && existingProject[fieldName]) {
        const oldFilePath = path.join(__dirname, '..', existingProject[fieldName]);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    } else if (body[fieldName]) {
      // Keep existing string URL if no new file is uploaded
      data[fieldName] = body[fieldName];
    } else if (existingProject) {
        // Fallback to existing project data
        data[fieldName] = existingProject[fieldName];
    }
  };

  handleFile('imageUrl');
  handleFile('brochureUrl');

  // Handle screenshots array
  if (files && files.screenshots) {
    data.screenshots = files.screenshots.map(file => `uploads/${file.filename}`);
    if (existingProject && existingProject.screenshots) {
      existingProject.screenshots.forEach(imgPath => {
        const oldFilePath = path.join(__dirname, '..', imgPath);
        if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      });
    }
  } else if (body.screenshots) {
      data.screenshots = Array.isArray(body.screenshots) ? body.screenshots : [body.screenshots];
  } else if (existingProject) {
      data.screenshots = existingProject.screenshots;
  }

  return data;
};

// --- Controller Functions ---

exports.addProject = async (req, res) => {
  try {
    const projectData = buildProjectData(req.body, req.files);
    const project = new Project(projectData);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Add Project Error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const projectData = buildProjectData(req.body, req.files, existingProject);
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true, runValidators: true }
    );
    
    res.json(updatedProject);
  } catch (error) {
    console.error('Update Project Error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const query = {};
    // Filtering logic can be added here if needed, similar to your original code
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Helper to safely delete a file
    const deleteFile = (filePath) => {
      if (filePath) {
        const fullPath = path.join(__dirname, '..', filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    };

    deleteFile(project.imageUrl);
    deleteFile(project.brochureUrl);
    if (project.screenshots && project.screenshots.length > 0) {
      project.screenshots.forEach(deleteFile);
    }
    
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete Project Error:', error);
    res.status(500).json({ message: error.message });
  }
};