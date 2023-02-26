const express = require("express");
const morgan = require("morgan");
const { mongoclient, collection } = require("./dataSource");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("tiny"));

mongoclient
  .connect()
  .then(() => {
    console.log("Data source has been connected to the database!");
  })
  .catch((err) => {
    console.log("Data source has failed to connect to the database!", err);
  });

app.get("/player", (req, res) => {
  const name = req.body.name;
  const query = { name: name };
  collection.findOne(query).then((result) => {
    res.status(200).send(result);
  });
});

app.post("/player", (req, res) => {
  const name = req.body.name;
  const team = req.body.team;
  const nationality = req.body.nationality;
  const doc = { name: name, team: team, nationality: nationality };
  collection.insertOne(doc).then((result) => {
    res.send(`A document was inserted with the _id: ${result.insertedId}`);
  });
});

app.patch("/player", (req, res) => {
  const oldName = req.body.oldName;
  const oldTeam = req.body.oldTeam;
  const newName = req.body.newName;
  const newTeam = req.body.newTeam;
  const updateDoc = {
    $set: {
      name: newName,
      team: newTeam,
    },
  };
  const filter = { name: oldName, team: oldTeam };
  collection.updateOne(filter, updateDoc, { upsert: true }).then(() => {
    res.status(200).send("Successfully updated");
  });
});

app.delete("/player", (req, res) => {
  const name = req.body.name;
  const query = { name: name };
  collection.deleteOne(query).then(() => {
    res.status(200).send("Successfully deleted");
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
