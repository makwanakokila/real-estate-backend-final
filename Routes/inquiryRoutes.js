const express = require("express");
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  deleteInquiry,
} = require("../Controller/inquiryController");
router.post("/inquiry", createInquiry);
router.get("/inquiry", getInquiries);
router.delete("/inquiry/:id", deleteInquiry);

module.exports = router;