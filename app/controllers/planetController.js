"use strict";

const Planet = require("../models/planet");
const fetch = require("node-fetch");
const { SWAPI } = require("config");

/**
 * Retornar os dados da api SWAPI
 */
async function searchPlanets(arrayPlanets, res) {
  let urls = new Array();

  arrayPlanets.filter(planet => {
    urls.push(SWAPI + planet.name);
  });

  Promise.all(
    urls.map(url =>
      fetch(url)
        .then(res => res.json())
        .catch(error => console.error("SWAPI did not return the data"))
    )
  )
    .then(data => {
      let planets = new Array();
      arrayPlanets.filter(planet => {
        data.map(async data => {
          if (data)
            data.results.map(result => {
              const { name, climate, terrain, films } = result;
              if (
                planet.name === name &&
                planet.climate === climate &&
                planet.terrain === terrain
              )
                planets.push({
                  id: planet.id,
                  name,
                  climate,
                  terrain,
                  films
                });
            });
        });
      });

      if (planets.length == 0) planets = planet;

      return res.send(planets);
    })
    .catch(error => {
      return res.status(400).send({ error: "Error loading planets" });
    });
}

/**
 * Retornar todos os planetas ou retornar um único planeta
 * passando o parametro name="Nome do Planeta"
 */

exports.list = async function(req, res) {
  try {
    const name = req.query.name;
    let planets = null;

    if (name) {
      planets = await Planet.findOne({ name: name });
      searchPlanets(new Array(planets), res);
    } else {
      planets = await Planet.find();
      searchPlanets(planets, res);
    }
  } catch (error) {
    return res.status(400).send({ error: "Error loading planets" });
  }
};

/**
 * Retornar  um único planeta passando o id
 */

exports.listId = async function(req, res) {
  try {
    const planets = await Planet.findById(req.params.id);
    searchPlanets(new Array(planets), res);
  } catch (error) {
    return res.status(400).send({ error: "Error loading planet" });
  }
};

/**
 * Criar um planeta passados os dados name, climate e terrain
 */
exports.create = async function(req, res) {
  try {
    const planet = await Planet.create({ ...req.body });

    return res.send(planet);
  } catch (error) {
    return res.status(400).send({ error: "Error creating new planet" });
  }
};

/**
 * Alterando os dados passando o id
 */
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

    return res.send(planet);
  } catch (error) {
    return res.status(400).send({ error: "Error creating new planet" });
  }
};

/**
 * Removendo os dados passando o id
 */
exports.delete = async function(req, res) {
  try {
    await Planet.findByIdAndRemove(req.params.id);

    return res.send({ success: "Planet successfully removed!" });
  } catch (error) {
    return res.status(400).send({ error: "Error deleting planet" });
  }
};
