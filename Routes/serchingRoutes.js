// // module.exports = router;
// const express = require('express');
// const mongoose = require('mongoose');
// const sanitize = require('mongo-sanitize');
// const router = express.Router();

// // Import Project model
// const Project = require('../Model/ProjectModel');
// const media = require("../Model/mediaModel")
// const blog = require("../Model/blogModel")

// // Search endpoint (POST)
// router.post('/search', async (req, res) => {
//   try {
//     // Sanitize and validate query from request body
//     let searchQuery = sanitize(req.body.companyName || '');
//     if (!searchQuery) {
//       return res.status(400).json({ error: 'Search query (companyName) is required' });
//     }

//     // Pagination parameters from request body
//     const page = parseInt(req.body.page) || 1;
//     const limit = parseInt(req.body.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Search Projects using regex
//     let projectResults = [];
//     let projectCount = 0;
//     try {
//       projectResults = await Project.find({
//         $or: [
//           { companyName: { $regex: searchQuery, $options: 'i' } },
//           { description: { $regex: searchQuery, $options: 'i' } }
//         ]
//       })
//         .skip(skip)
//         .limit(limit)
//         .select('companyName description details location propertyType priceRange status')
//         .lean();
//       projectCount = await Project.countDocuments({
//         $or: [
//           { companyName: { $regex: searchQuery, $options: 'i' } },
//           { description: { $regex: searchQuery, $options: 'i' } }
//         ]
//       });
//     } catch (err) {
//       console.warn('Project search failed:', err.message);
//       return res.status(500).json({ error: 'Search failed due to database issue' });
//     }

//     // Format results
//     const results = projectResults.map(item => ({ ...item, type: 'project' }));

//     // Pagination
//     const total = projectCount;

//     res.json({
//       results,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error('Search error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const router = express.Router();

// Import models
const Project = require('../Model/ProjectModel');
const Media = require('../Model/mediaModel');
const Blog = require('../Model/blogModel');

// Search endpoint (POST)
router.post('/search', async (req, res) => {
  try {
    // Sanitize and validate query from request body
    let searchQuery = sanitize(req.body.companyName || '');
    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query (companyName) is required' });
    }

    // Pagination parameters from request body
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * limit;

    // Initialize results and counts
    let projectResults = [];
    let mediaResults = [];
    let blogResults = [];
    let projectCount = 0;
    let mediaCount = 0;
    let blogCount = 0;

    // Search Projects
    try {
      projectResults = await Project.find({
        $or: [
          { companyName: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ],
      })
        .skip(skip)
        .limit(limit)
        .select('companyName description details location propertyType priceRange status')
        .lean();
      projectCount = await Project.countDocuments({
        $or: [
          { companyName: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ],
      });
    } catch (err) {
      console.warn('Project search failed:', err.message);
    }

    // Search Media
    try {
      mediaResults = await Media.find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ],
      })
        .skip(skip)
        .limit(limit)
        .select('title description url')
        .lean();
      mediaCount = await Media.countDocuments({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ],
      });
    } catch (err) {
      console.warn('Media search failed:', err.message);
    }

    // Search Blogs
    try {
      blogResults = await Blog.find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } },
        ],
      })
        .skip(skip)
        .limit(limit)
        .select('title content author')
        .lean();
      blogCount = await Blog.countDocuments({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } },
        ],
      });
    } catch (err) {
      console.warn('Blog search failed:', err.message);
    }

    // Combine results
    const results = [
      ...projectResults.map(item => ({ ...item, type: 'project' })),
      ...mediaResults.map(item => ({ ...item, type: 'media' })),
      ...blogResults.map(item => ({ ...item, type: 'blog' })),
    ];

    // Sort by relevance (basic sorting by collection order, can be enhanced)
    // Limit combined results to respect pagination
    const paginatedResults = results.slice(skip, skip + limit);

    // Total count for pagination
    const total = projectCount + mediaCount + blogCount;

    res.json({
      results: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;