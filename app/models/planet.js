"use strict";

const mongoose = require("../database");

const Planetchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  climate: {
    type: String,
    required: true
  },
  terrain: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

const Planet = mongoose.model("Planet", Planetchema);

module.exports = Planet;
