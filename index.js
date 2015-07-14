// SERVER-SIDE JAVASCRIPT

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore");

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));

//*****************************//
// 

// pre-seeded data
var blogs =[
  {id: 1, name: "Why coding", desc: "I think it's cool."},
  {id: 2, name: "Work and education", desc: "I'm a student"},
  {id: 3, name: "Family", desc: "My family is in China."},
];
var totalBlogCount = 8;


// ROUTES
// root route (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// blog index
app.get('/api/blogs', function (req, res) {
  // send all blogs as JSON response
  res.json(blogs);
});

// create new blog
app.post('/api/blogs', function (req, res) {
  // grab params (word and definition) from form data
  var newBlog = {}
  newBlog.desc = req.body.desc;
  newBlog.name = req.body.name;
  
  // set a unique id never used by a blog until now
  totalBlogCount++;
  newBlog.id = totalBlogCount;

  // add newBlog to `blogs` array
  blogs.push(newBlog);
  
  // send newBlog as JSON response
  res.json(newBlog);
});

// update blog
app.put('/api/blogs/:id', function(req, res) {

  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in `blogs` array matching the id
  var foundBlog = _.findWhere(blogs, {id: targetId});

  // update the blog's word
  foundBlog.name = req.body.name;

  // update the blog's definition
  foundBlog.desc = req.body.desc;

  // send back edited object
  res.json(foundBlog);
});

// delete blog
app.delete('/api/blogs/:id', function(req, res) {
  
  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in `blogs` array matching the id
  var foundBlog = _.findWhere(blogs, {id: targetId});

  // get the index of the found item
  var index = blogs.indexOf(foundBlog);
  
  // remove the item at that index, only remove 1 item
  blogs.splice(index, 1);
  
  // send back deleted object
  res.json(foundBlog);
});

// set server to localhost:3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});