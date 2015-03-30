var express = require('express'), 
    http = require('http'), 
    path = require('path'),
    Post = require('./Post'),
    auth = require('./auth');
    mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// Render our home page with all blog posts
app.get('/', auth, function(request, response) {

    // TODO: How do we get a list of all model objects using a mongoose model?
    Post.find(function(err, posts) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.render('index', {
                posts:posts
            });
        }
    });
});

app.get('/posts',auth, function(req, res) {
     Post.find(function(err, posts) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            res.json(posts);
        }
    });
});


// Render a form to enter a new post
app.get('/new', function(request, response) {
    response.render('new', {});
});

// create a new blog post object
app.post('/create', function(request, response) {
    // TODO: Create and save a Post model
    var post = new Post({
         title: request.body.title,
        content: request.body.content
    });

    // TODO: Save the model
    post.save(function(err, model) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.redirect('/');
        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
