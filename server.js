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
var phrases =[
  {id: 1, name: "Why coding", desc: "I am very passionate about several startup ideas and all these ideas require me to build a robust website and mobile app. In the process of looking for co-founders, I have realized a few problems. First, web development engineers are too popular. I have attended several team formation sessions, and tried to look for a co-founder who has strong engineering background. To my disappointment, it has been very hard to convince an engineer to commit to a project, because the MBA and engineer ratio is about 10:1 and engineers have too many options. Second, without coding background, I do not even know how to evaluate the quality of the engineers. Third, without coding background, I do not know how to work closely with engineers. I believe if I speak the engineering language, I will be able to deliver my product design/strategy ideas to engineers much more effectively."},
  {id: 2, name: "Work and education", desc: "I am currently a full-time MBA student and willing be graduating in June 2016. Prior to MBA, I worked at Tencent (HKSE: 0700), one of the largest internet companies in China. I spent three years at Tencent headquarters, in Shenzhen China and another four years at Tencent US office, in Palo Alto. I was senior business development manager for Tencent Games Group at the first five years and later moved to the Tencent Online Media Group. I worked closely with the Silicon Valley game developers and the Hollywood celebrity agencies. My main job responsibility was to explore partnerships with the U.S.based companies and bring top quality U.S. content to China."},
  {id: 3, name: "Family", desc: "I was born and raised in a small town in China. Both of my parents were teachers when I was a kid. When China opened its door to the outside world, my father went to Southern China (the Guangzhou area) to work, hoping to make a better future for the family. He later started his own company but failed miserably. However, Failure was only a great lesson and inspiration for my father. He soon worked hard and paid off all his debt and started another new company, which turned out to be a huge success. Growing up, I have been deeply influenced and inspired by my father’s entrepreneurial spirit and I know it is in my genes already."},
  {id: 8, name: "JSON", desc: "JavaScript Object Notation"}
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