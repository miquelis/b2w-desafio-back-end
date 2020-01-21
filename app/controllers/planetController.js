"use strict";

const Planet = require("../models/planet");
const fetch = require("node-fetch");

async function searchPlanets(planets, res) {
  const { name, climate, terrain } = planets;

  fetch(process.env.SWAPI + name)
    .then(res => res.json())
    .then(data => {
      const results = data.results;
      results.map(data => {
        const { films } = data;
        return res.send({ name, climate, terrain, films });
      });
    })
    .catch(error => {
      return res.send({
        name,
        climate,
        terrain,
        films: "SWAPI did not return the data"
      });
    });
}

exports.list = async function(req, res) {
  try {
    const name = req.query.name;
    let planets = null;

    if (name) {
      planets = await Planet.findOne({ name: name });
      searchPlanets(planets, res);
    } else {
      planets = await Planet.find();
      return res.send({ planets });
    }
  } catch (error) {
    return res.status(400).send({ error: "Error loading planets" });
  }
};

exports.listId = async function(req, res) {
  try {
    const planets = await Planet.findById(req.params.id);
    searchPlanets(planets, res);
  } catch (error) {
    return res.status(400).send({ error: "Error loading planet" });
  }
};

exports.create = async function(req, res) {
  try {
    const planet = await Planet.create({ ...req.body });

    return res.send({ planet });
  } catch (error) {
    return res.status(400).send({ error: "Error creating new planet" });
  }
};

exports.update = async function(req, res) {
  try {
    const { name, climate, terrain } = req.body;
    const planet = await Planet.findByIdAndUpdate(
      req.params.id,
      {
        name,
        climate,
        terrain
      },
      { new: true }
    );

    return res.send({ planet });
  } catch (error) {
    return res.status(400).send({ error: "Error creating new planet" });
  }
};

exports.delete = async function(req, res) {
  try {
    await Planet.findByIdAndRemove(req.params.id);

    return res.send({ success: "Planet successfully removed!" });
  } catch (error) {
    return res.status(400).send({ error: "Error deleting planet" });
  }
};
