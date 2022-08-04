//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require('lodash')

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const mongoose = require ("mongoose")

const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://PerciusT:test123@cluster0.idqnafo.mongodb.net/blogDB",{useNewUrlParser:true});mongoose.connect("mongodb+srv://PerciusT:test123@cluster0.idqnafo.mongodb.net/blogDB",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema=new mongoose.Schema({
  postTitle:{
    type:String,
    required:true
  },
  newPost:{
        type: String,
        required:true
  }
})

const posts=mongoose.model("post",postSchema)

let allPosts=[];

app.get('/',function(req,res){
  posts.find(function(err,items){
    // console.log(items)
    if(items.length!=0)
    {

      if(allPosts.length===0){
        items.forEach((i)=>
        {
          allPosts.push(i);    
        })

      }
    // res.render('home.ejs',{homeStartingContent:homeStartingContent, allPosts:allPosts})s
    }
    else
    {
      console.log("goes here")
      allPosts=[];
    }

  console.log(allPosts)
    res.render('home.ejs',{homeStartingContent:homeStartingContent, allPosts:allPosts})
    })
})
app.get('/about',function(req,res){
  res.render('about.ejs',{aboutContent:aboutContent})
})
app.get('/contact',function(req,res){
  res.render('contact.ejs',{contactContent:contactContent})
})
app.get('/compose',function(req,res){
  res.render('compose.ejs',{})
})
app.get('/posts/:title',function(req,res){
  let param=_.lowerCase(req.params.title)
  console.log(param)
  var title=null;
  var post;
  allPosts.forEach(function(i){
    if(_.lowerCase(i.postTitle)==param)
    {
      title=i.postTitle
      post=i.newPost
    }
  });
  if(title===null)
  {
    res.redirect('/')
  }
  else 
  {
    res.render('post.ejs',{posts:post,title:title})
  }
})

app.post('/compose',function(req,res){
  let post = req.body
  allPosts.push(post)
  let newPost= new posts({
    postTitle:req.body.postTitle,
    newPost:req.body.newPost
  })

  // console.log(allPosts)
  newPost.save()
  res.redirect('/');
})








app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
