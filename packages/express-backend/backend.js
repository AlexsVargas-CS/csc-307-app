import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());// allows our backend to respond to calls coming from a diff origin.
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};





const findUserByNameandJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job !== undefined) {
    let result = findUserByNameandJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).send(addedUser);
});


app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    let userToDelete = deleteUser(id);
    if (userToDelete === undefined) {
        res.status(404).send("Resource Not Found!");
    } else{ 
        res.send();
    }
    
});


const deleteUser = (id) => {
    const index = users["users_list"].findIndex((user) => user.id === id);
    if (index !== -1) {
        const deletedUser = users["users_list"].splice(index, 1)[0];
        return deletedUser;
    }
    return undefined;
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
