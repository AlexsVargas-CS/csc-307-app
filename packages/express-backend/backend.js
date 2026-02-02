import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userService from "./services/user-service.js";


dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));
  
const app = express();
const port = 8000;

app.use(cors()); // allows our backend to respond to calls coming from a diff origin.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("add /users to the link above to see users info!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  userService.findUserById(id)
  .then(
    (result) => { 
      if (result) {
        res.send(result);
      } else 
        {
          res.status(404).send(`Not Found: ${id}`);
        }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    })
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService.addUser(userToAdd)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});


app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userService.deleteUserById(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource Not Found!");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
