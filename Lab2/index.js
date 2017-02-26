var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var assert = require('assert');
var massive = require('massive');

app.use(bodyParser());
app.use(express.static('public'));

//connect to postgres database
var db = massive.connectSync({
	db: 'pgguide'
});

app.listen(3000, function() {
    console.log('Application listening on Port 3000');
});

app.get('/products/hack', function(req, res) {
	var id = req.query.id;
	
	db.run('select * from products where id = ' + id, function(err, docs){
		res.send(docs);
	});
});

// PARAMETERIZED FIX
app.get('/products/1', function(req, res) {
	var id = req.query.id;
	
	db.run('select * from products where id = $1', [id], function(err, docs){
		res.send(docs);
	});
});

// STORED PROCEDURE FIX
app.get('/products/2', function(req, res) {
	var id = req.query.id;
	
	db.run('select get_product($1)', [id], function(err, docs){
		res.send(docs);
	});
});

