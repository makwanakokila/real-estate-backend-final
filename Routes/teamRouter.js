// teamRouter.js
const express = require("express");
const router = express.Router();
const teamController = require("../Controller/teamController");

router.post("/team", teamController.addTeam);
router.get("/team", teamController.getTeam);
router.put("/team/:id", teamController.updateTeam);
router.delete("/team/:id", teamController.deleteTeam);

module.exports = router;