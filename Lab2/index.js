var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var assert = require('assert');
var massive = require('massive');

app.use(bodyParser());
app.use(express.static('public'));

//connect to postgres database
var db = massive.connectSync({db: 'postgres'});

app.listen(3000, function() {
    console.log('Application listening on Port 3000');
});

app.get('/products', function(req, res) {
	db.products.find({}, function(err, result) {
		res.send(result);
	})
});

app.get('/users', function(req, res) {
    db.users.find({}, function(err, result) {
		res.send(result);
	})
});

app.get('/purchases', function(req, res) {
    db.purchases.find({}, function(err, result) {
		res.send(result);
	})
});

app.get('/products/:id', function(req, res) {
	var id = req.params.id;
	
	console.log("Before:", id);
	db.run("select * from products where id = " + id, function(err, docs){
		console.log("After:", docs);
		res.send(docs);
	});
});

app.get('/users', function (req, res) {
	

})

app.get('/users/:id', function(req, res) {
	var data = {
		id: req.params.id
	}
	
    db.users.find(data, function(err, result) {
		res.send(result);
	})
});

app.get('/purchases/:id', function(req, res) {
	var data = {
		id: req.params.id
	}

    db.purchases.find(data, function(err, result) {
		res.send(result);
	})
});