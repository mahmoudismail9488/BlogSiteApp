const express = require("express");
const bodyParser = require("body-parser");
const _ =require("lodash")
const mongoose = require("mongoose")
const ejs = require("ejs");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//connect pur MongoDB
mongoose.connect("mongodb+srv://ToDo:Test123@cluster0.6jwl4ly.mongodb.net/BlogApp?retryWrites=true&w=majority")
// posts schema
const postSchecma = {
  title:String,
  data:String
}
//creating the posy model
const Post = mongoose.model("Post",postSchecma)
// root page get method 
app.get("/",async function(res,res){
  res.render("home",{home_text:homeStartingContent,my_post_data:await Post.find({})})
})
// about page get method
app.get("/about",function(res,res){
  res.render("about",{my_about_text:aboutContent})
})
// contact page get method 
app.get("/contact",function(res,res){
  res.render("contact",{my_contact_text:contactContent})
})
// compose page get method 
app.get("/compose",function(res,res){
  res.render("compose")
})
// routing parameters 
app.get("/posts/:topicId",async function(req,res){
  const my_post = await Post.findById(req.params.topicId).exec()
  res.render("post",{post_title:my_post.title,post_content:my_post.data})
})

// post method for our compose page

app.post("/compose",function(req,res){
  const my_post = new Post({title:req.body.postTitle,
                  data:req.body.myPost})

  my_post.save()
  res.redirect("/")
})
app.listen(3800, function() {
  console.log("Server started on port 3000");
});
