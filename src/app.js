const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");
// console.log(__dirname);   ///Users/alanshi/Desktop/node-course/web-server/src
// console.log(__filename);  ///Users/alanshi/Desktop/node-course/web-server/src/app.js
// console.log(path.join(__dirname, "../public"));
const app = express(); //这是一个类

// Define paths for Express config
const publicpath = path.join(__dirname, "../public"); //将URL路径换到了public下
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Setup hbs
app.set("view engine", "hbs"); //dynamic page 会自己寻找views文件夹 改名后需要redirect to viewspath
app.set("views", viewsPath); //redirect path
hbs.registerPartials(partialsPath);

//Setup static dictionary to serve.
app.use(express.static(publicpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    author: "Wai To Shi"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Wai To Shi"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help",
    title: "Help",
    author: "Wai To Shi"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to enter an address."
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err
      });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          error: err
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    errorType: "Help article not found"
  });
});
app.get("*", (req, res) => {
  res.render("404page", {
    errorType: "Page not found"
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
