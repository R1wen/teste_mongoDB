//importation des utilitaires
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const path = require("path");
const app = express();

//middleware
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

/*******routage*******/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

//route post pour envoyer les données sur le serveur mongoDB (CREATE)
app.post("/api/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200);
    console.log(user);
    res.send("Données envoyées avec succès");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

//route get pour afficher les données sur le serveur mongoDB (READ)
app.get("/api/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route PUT pour modifier les données sur le serveur mongoDB en fonction d'un ID (UPDATE)
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route PUT pour supprimer les données sur le serveur mongoDB en fonction d'un ID (DELETE)
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//connexion a la base de donnees puis activation du serveur
mongoose
  .connect(
    "mongodb+srv://admin:admin@s3.koh03.mongodb.net/API-Test?retryWrites=true&w=majority&appName=s3"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
