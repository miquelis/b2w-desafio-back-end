"use strict";

const express = require("express");
const router = express.Router();
const planet = require("../controllers/planetController");

router.get("/", planet.list);
router.get("/:id", planet.listId);
router.post("/", planet.create);
router.put("/:id", planet.update);
router.delete("/:id", planet.delete);

module.exports = router;
