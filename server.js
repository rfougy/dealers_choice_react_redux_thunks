//////////////// SERVER ////////////////

const express = require("express");
const app = express();
const path = require("path");

//Middlware...
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//Route Requests...
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/api/pokemon", async (req, res, next) => {
  try {
    const pokemonList = await Pokemon.findAll();
    res.json(pokemonList);
  } catch (err) {
    next(err);
  }
});
app.get("/api/pokemon/:pokemonId", async (req, res, next) => {
  try {
    const selectedPokemon = await Pokemon.findByPk(req.params.pokemonId);
    res.json(selectedPokemon);
  } catch (err) {
    next(err);
  }
});
app.get("/api/owners", async (req, res, next) => {
  try {
    const ownerList = await Owner.findAll({
      include: {
        model: Pokemon,
        as: "pokemon",
      },
    });
    res.json(ownerList);
  } catch (err) {
    next(err);
  }
});
app.post("/api/pokemon", async (req, res, next) => {
  try {
    const newPokemon = await Pokemon.create(req.body);
    res.send(newPokemon);
  } catch (err) {
    next(err);
  }
});
app.put("/api/pokemon", async (req, res, next) => {
  try {
    const selectedPokemon = await Pokemon.findByPk(req.params.id);
    await selectedPokemon.update(req.body);
    res.send(selectedPokemon);
  } catch (err) {
    next(err);
  }
});
app.delete("/api/pokemon", async (req, res, next) => {
  try {
    const selectedPokemon = await Pokemon.findByPk(req.params.id);
    await Pokemon.destroy(selectedPokemon);
    res.send(Pokemon);
  } catch (err) {
    next(err);
  }
});

//Middleware: Error Handler...
app.use(async (err, req, res, next) => {
  res.status(err.status || 500).send("An error has occurred!");
});

//Initializing Server...
const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

//////////////// DB ////////////////

const Sequelize = require("sequelize");
const { STRING, ENUM } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealers-choice-thunks-db"
);
const faker = require("faker");
const { resourceLimits } = require("worker_threads");

//Creating Tables...
const Pokemon = db.define("pokemon", {
  name: {
    type: STRING,
    allowNull: false,
  },
  element: {
    type: ENUM("electric", "fire", "water", "earth", "unknown"),
    defaultValue: "unknown",
    allowNull: false,
  },
});

const Owner = db.define("owner", {
  name: {
    type: STRING,
    allowNull: false,
  },
});

//Creating DB Relationships...
Pokemon.belongsTo(Owner, { as: "owner" });
Owner.hasMany(Pokemon, { as: "pokemon", foreignKey: "ownerId" });

//Inserting Data into Tables...
const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [pikachu, charizard, bulbasaur, squirtle, ash, brock, misty] =
    await Promise.all([
      Pokemon.create({ name: "pikachu", element: "electric" }),
      Pokemon.create({ name: "charizard", element: "fire" }),
      Pokemon.create({ name: "bulbasaur", element: "earth" }),
      Pokemon.create({ name: "squirtle", element: "water" }),

      Owner.create({ name: "ash" }),
      Owner.create({ name: "brock" }),
      Owner.create({ name: "misty" }),
    ]);
  //Creating Relationships Between Specific Data...
  pikachu.ownerId = ash.id;
  charizard.ownerId = ash.id;
  bulbasaur.ownerId = brock.id;
  squirtle.ownerId = misty.id;
  //Saving Relationships Declared Above...
  await Promise.all([
    await pikachu.save(),
    await charizard.save(),
    await bulbasaur.save(),
    await squirtle.save(),
  ]);
};

//////////////// INITIATE SERVER ////////////////

init();
