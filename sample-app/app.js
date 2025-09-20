//Express フレームワークを読み込む
var express = require('express');
var app = express();
var qs   = require('querystring');
var config = require('./config');

// ビューエンジンをejsにセットする
app.set('view engine', 'ejs');
app.use("/sample-app", express.static('sample-app'));
var posts = [];

// indexのテンプレートを呼び出す
app.get('/', function(req, res) {
    var data = {
        posts: posts
    };
    res.render('pages/index', data);
});

app.post('/', function(req, res) {
    req.data = "";
    // フォームからのデータを受信
    req.on("readable", function() {
        // read()はnullが来る場合もあるので空文字にする
        req.data += req.read() || '';
        console.log(req.data);
    });
    req.on("end", function() {
        // パースすると、formから入力された値をquery.nameのように使えるようになる
        var query = qs.parse(req.data);
        console.log(query);
        posts.push(query.user_name);
        var data = {
            posts: posts
        };
        console.log(data);
        res.render('pages/index', data);
    });
});

// aboutページのテンプレートを呼び出す
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// servicesページのテンプレートを呼び出す
app.get('/services', function(req, res) {
  res.render('pages/services');
});

// portfolioページのテンプレートを呼び出す
app.get('/portfolio', function(req, res) {
  res.render('pages/portfolio');
});

// contactページのテンプレートを呼び出す
app.get('/contact', function(req, res) {
  res.render('pages/contact');
});

// ポート8082をオープンにする
app.listen(config.port);