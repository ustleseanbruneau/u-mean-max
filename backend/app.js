const express = require('express');
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

// fix CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

/* app.use((req, res, next) => {
    console.log('First Middleware');
    next();
});
 */

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post)
    // new resource created
    res.status(201).json({
        message: 'Post added successfully'
    })
});


//app.use('/api/posts', (req,res,next) => {
app.get('/api/posts', (req,res,next) => {
    //res.send('Hello from express');
    
    const posts = [
        { id: 'fasdfasdg', title: 'first server-side post', content: "this is coming from the server"},
        { id: '546y5trg', title: 'second server-side post', content: "this is coming from the server"},

    ]
    
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
});

module.exports = app;
