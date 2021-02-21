const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://Mayank-Singh-Negi:test123@cluster0.g5r5n.mongodb.net/BlogDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const contentSchema = {
  content: String,
};

const Content = mongoose.model("content", contentSchema);

const contentHome = new Content({
  content:
    "Welcome to the Official Blog Website Of Mayank Singh Negi, I hope You will enjoy reading articles here and also suggest topics for which you want to read, I will definetly try to add those topics. ",
});

const aboutContent = new Content({
  content:
    "Hey Everyone, My Name is Mayank Singh Negi and I'm currently living in Dehradun,uttrakhand.I'm a BTECH 1st year student at Graphic Era University.",
});

const contactContent = new Content({
  content: "You can Contact me at msngi24july@gmail.com .",
});

const postSchema = {
  tittle: String,
  postcontent: String,
};

const Post = mongoose.model("post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", { homecontent: contentHome.content, newPosts: posts });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutcontent: aboutContent.content });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactcontent: contactContent.content });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const postTittle = req.body.postTittle;
  const postContent = req.body.postContent;

  const newPost = new Post({
    tittle: postTittle,
    postcontent: postContent,
  });
  newPost.save();

  res.redirect("/");
});

app.get("/posts/:postID", function (req, res) {
  const postID = req.params.postID;

  Post.findOne({ _id: postID }, function (err, post) {
    res.render("post", {
      tittle: post.tittle,
      content: post.postcontent,
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
