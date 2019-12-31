const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const detailPage = require('./detail.js');
const privacyPage = require('./privacy.js');
const page = require('./page.js');
const termsPage = require('./terms.js');
const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/ecom1', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const ReviewSchema = new mongoose.Schema({
    email: String, 
    name: String, 
    comment: String, 
    timestamp: String, 
    hidden: Boolean, 
    stars: Number
});
const ReviewModel = new mongoose.model('ReviewModel', ReviewSchema);

ReviewModel.find(function(err, docs) {
    if (err) console.log(err);
    if (docs.length == 0) {
        const reviewModel = new ReviewModel({
            email: 'foo@mail.com', 
            name: 'foo manchu', 
            comment: 'this is a pretty good itemz foo', 
            timestamp: Date.now(), 
            hidden: false, 
            stars: 3
        });
        reviewModel.save();

        const reviewModel2 = new ReviewModel({
            email: 'foo@mail.com', 
            name: 'bar me', 
            comment: 'best one ever for realz', 
            timestamp: Date.now(), 
            hidden: false, 
            stars: 4
        });
        reviewModel2.save();
    }
})

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.post('/post-comment', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;
    const timestamp = Date.now() + '';
    const stars = req.body.stars;

    if (!(name && email && comment && timestamp && stars)) {
        res.sendStatus(400);
        return;
    }
    if (stars > 5 || stars < 1) {
        res.sendStatus(400);
        return;
    }

    const reviewModel = new ReviewModel({
        name: name,
        email: email,
        comment: comment,
        hidden: true,
        timestamp: timestamp,
        stars: stars
    });

    console.log('saving model');
    reviewModel.save((err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        if (doc) {
            console.log("save success");
            res.send(true);
        }
        return;
    });
    return;
});

app.get('/privacy', function(req, res) {
    res.writeHead(200);
    res.end(page(privacyPage()));
});

app.get('/terms', function(req, res) {
    res.writeHead(200);
    res.end(page(termsPage()));
});

console.log("SETTING UP GET");
app.get('/', function(req, res) {
    console.log("GET FIRED");
    ReviewModel.find(function(err, docs) {
        if (err) {
            console.log(err);
            res.end(page(detailPage([])));
        }
        if (docs) {
            res.writeHead(200);
            res.end(page(detailPage(docs)));
        }
    });
});

https.createServer(options, app).listen(3000, function() {
    console.log("server running on port 3000");
});