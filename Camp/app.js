const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");

mongoose.connect(
  "mongodb+srv://Nutika:Nutika123@cluster0.gteklit.mongodb.net/Project?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
