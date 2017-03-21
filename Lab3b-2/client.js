var express 		 = require('express');
var app          	 = express();
var bodyParser  	 = require('body-parser');
var morgan     		 = require('morgan');
var hmacsha1Generate = require("hmacsha1-generate");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

var config = require('./config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.set('superSecret', config.secret); // secret variable

var port = process.env.PORT || 8081;

app.listen(port, function() {
	console.log('Connect at http://localhost:' + port);
});

app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port);
});

app.get('/sendPost', function(req, res) {
    var data = {
        username: 'kennanseno',
        password: 'xavier123',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imtlbm5uYW5zZW5vIiwiaWF0IjoxNDkwMTAzNDc0LCJleHAiOjE0OTAxODk4NzR9.f5xa3GmiExvVmU7T6s66jdtRy15FoEa0Z5RvILVTH7U'
    };

    var computedSignature = hmacsha1Generate.generateSignature(app.get('superSecret'), data);

    xhr.open("POST", "http://localhost:8080/api/users");
    xhr.setRequestHeader("X-Signature", computedSignature);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        console.log(xhr.status, xhr.responseText);
    }
    xhr.send(JSON.stringify(data));
    console.log('data', JSON.stringify(data));
});

