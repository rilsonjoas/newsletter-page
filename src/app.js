//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios").default;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/index.html", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

axios
  .post(`https://us18.api.mailchimp.com/3.0/lists/${process.env.VITE_KEY}`, {jsonData})
  .then((res) => {
    console.log(res)
    // res.sendFile(__dirname + "public/sucess.html")
    .catch((err) => {
      console.log(err);
      // res.sendFile(__dirname + "public/failure.html");
    });
  });
});
