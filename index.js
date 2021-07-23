const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./connect");
const app = express();
const PORT = 5000;

const Person = require('./model/personModel');
connectDB();
app.use(express.json());

app.listen(PORT, (err) =>
  err ? console.log( err) : console.log(`server is running on http://localhost :${PORT}`)
);


app.get('/', function(req, res) {
    res.send( '<h1>hello guys</h1>');
  });

 // Create and Save a Record of a Model:

  app.get("/add", (req, res) => {
    const personOne = new Person({
      name: "amal",
      age: 27,
      favoriteFoods: ["Salade", "Pasta", "Plat-Tunisien"],
    });
    personOne.save((err) => {
      err ? console.log(err) : console.log(" successfully saved");
    });
  });


// add an array of many people for the model 
app.get("/add_many", (req, res) => {
    Person.create([
      { name: "Tasnim", age: 28, favoriteFoods: ["coscous", "pasta", "Kafteji"] },
      { name: "Dekra", age: 24, favoriteFoods: ["Mloukeya", "Riz", "Makloub"] },
      { name: "Hela", age: 40, favoriteFoods: ["Poisson", "Lablebi", "Banane"] },
      { name: "Mohamed", age: 20, favoriteFoods: ["Hargma", "loubya", "Lasagne"] },
    ])

    .then((result) => {
      console.log(result);
      res.send(result);

    })
    .catch((err) => {
      console.log("error");
    });
  });

//Find just one person with a favorites food using Model.findOne()
  app.get("/findOne", (req, res) => {
    Person.findOne({ favoriteFoods: { $in: ["Poisson"] } })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(" No person with this information", err);
      });
  });

// Find all the people having a given name, using Model.find() -> [Person]

let name = "Bourezgui";       
app.get("/search", (req, res) => {
  Person.find({ name: name })
    .then((result) => {
      console.log(result);
      res.send(result);

    })
    .catch((err) => {
      console.log("error there is no person with this information", err);
    });
});

// find person by id 

const personId = "60fa1077e00ca55d2fbf2f2b";
app.get("/update", (req, res) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      console.log("error");
    } else {
      personFound.favoriteFoods.push("Pizza");
      personFound
        .save()
        .then((response) => {
          console.log("person saved successfully", personFound);
        })
        .catch((err) => console.log("error"));
    }
  });
});




