const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express();

/*
mongoose.connect("")
.then(() => {
  console.log("Connected to database!")
})
.catch(() => {
  console.log("Connection failed!")
})
*/

mongoose.connect("")
.then(() => {
  console.log("Connected to database!")
})
.catch(() => {
  console.log("Connection failed!")
})

const Post = require('./models/post')

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

// fix CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  next();
});

/* app.use((req, res, next) => {
    console.log('First Middleware');
    next();
});
 */

//

/* before mongoose
app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post)
  // new resource created
  res.status(201).json({
    message: 'Post added successfully'
  })
});
*/

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  
  // without database save
  //console.log(post)
  // with database save - before adding id assignment
  //post.save()
  // new resource created - before adding id assignment
  //res.status(201).json({
  //  message: 'Post added successfully'
  //})

  post.save().then(createdPost => {
    console.log(createdPost)
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    })
  })

});



//app.use('/api/posts', (req,res,next) => {
app.get('/api/posts', (req,res,next) => {
  //res.send('Hello from express');
  
  /* Test data for initial app dev, server startup
  const posts = [
      { id: 'fasdfasdg', title: 'first server-side post', content: "this is coming from the server"},
      { id: '546y5trg', title: 'second server-side post', content: "this is coming from the server"},

  ]
  res.status(200).json({
      message: 'Posts fetched successfully',
      posts: posts
  });
  */

  // fetch data from server (mongoose)
  Post.find().then(documents => {
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
    });
  });
    
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result)
    res.status(200).json({ message: 'Update successful!'})
  })
})  

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: 'Post not found!'})
    }
  })
})

app.delete("/api/posts/:id", (req,res, next) => {
  //console.log(req.params.id)
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: 'Post deleted!'})
  })
  
});

module.exports = app;
