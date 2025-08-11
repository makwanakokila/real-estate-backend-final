const Blog = require('../Model/blogModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// === Multer Config ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure folder exists
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage, fileFilter });
exports.uploadBlogImage = upload.single('image');

// === Add Blog ===
exports.addBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path;

    if (!image || !title || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const blog = await Blog.create({ image, title, description });
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// === Get All Blogs ===
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// === Delete Blog ===
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Delete image from file system
    if (fs.existsSync(blog.image)) {
      fs.unlinkSync(blog.image);
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// === Update Blog ===
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const { title, description } = req.body;
    let updatedImage = blog.image;

    // Replace image if new one is uploaded
    if (req.file) {
      if (fs.existsSync(blog.image)) {
        fs.unlinkSync(blog.image); // delete old image
      }
      updatedImage = req.file.path;
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.image = updatedImage;

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
