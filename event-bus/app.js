const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(req.body);
  //submit
  axios.post("http://localhost:4001/api/events", event);
  axios.post("http://localhost:4002/api/events", event);
  axios.post("http://localhost:4003/api/events", event);

  res.send("Event Submitted");
});

app.listen(4005, () => {
  console.log("run on port 4005");
});
