var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var assert = require('assert');
var Sequelize = require('sequelize');

app.use(bodyParser());
app.use(express.static('public'));
app.listen(3000, function() {
    console.log('Application listening on Port 3000');
});

var sequelize = new Sequelize('lab2', 'kennanseno', '', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// ------CASE *******

app.post('/case', function(req, res) {
 Case.findAll({
    where: {
        id: req.body.id
    }
  }).then(function(result) {
    res.json(result);
  });
});

app.post('/case/create', function(req, res) {
 Case.create({
    id: req.body.id,
    judge_id: req.body.judge_id,
    courtroom_id: req.body.courtroom_id,
    respondent_id: req.body.respondent_id,
    claimant_id: req.body.claimant_id,
    start_date: req.body.start_date,
    duration: req.body.duration,
    result: req.body.result
  }).then(function(result) {
    res.json(result);
  });
});

app.post('/case/delete', function(req, res) {
 Case.destroy({
    where: {
        id: req.body.id
    }
  }).then(function(result) {
    res.json(result);
  });
});

app.post('/case/update', function(req, res) {
 Case.update({
    number: req.body.number
  }, {
      where: {
          id: req.body.id
      } 
  }).then(function(result) {
    res.json(result);
  });
});

// COURTROOM ********

app.post('/courtroom', function(req, res) {
 Courtroom.findAll({
    where: {
        id: req.body.id
    }
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

app.post('/courtroom/create', function(req, res) {
 Courtroom.create({
    id: req.body.id,
    number: req.body.number
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

app.post('/courtroom/delete', function(req, res) {
 Courtroom.destroy({
    where: {
        id: req.body.id
    }
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

app.post('/courtroom/update', function(req, res) {
 Courtroom.update({
    number: req.body.number
  }, {
      where: {
          id: req.body.id
      } 
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

// JUDGE *******

app.post('/judge', function(req, res) {
  Judge.findAll({
    where: {
        id: req.body.id
    }
  }).then(function(judge) {
    res.json(judge);
  });
});

app.post('/judge/create', function(req, res) {
  Judge.create({
    id: req.body.id,
    name: req.body.name,
    room: req.body.room,
    ext: req.body.string
  }).then(function(user) {
    res.json(user);
  });
});

app.post('/judge/delete', function(req, res) {
  Judge.destroy({
   where: {
       id: req.body.id
   }
  }).then(function(judge) {
    res.json(judge);
  });
});

app.post('/judge/update', function(req, res) {
  Judge.update({
    name: req.body.name,
    room: req.body.room,
    ext: req.body.string
  }, {
      where: {
          id: req.body.id
      }
  }).then(function(user) {
    res.json(user);
  });
});

// PARTICIPANT ********

app.post('/participant', function(req, res) {
  Participant.create({
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    type: req.body.type
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

app.post('/participant', function(req, res) {
 Participant.findAll({
    where: {
        id: req.body.id
    }
  }).then(function(participant) {
    res.json(participant);
  });
});

app.post('/participant/create', function(req, res) {
 Participant.create({
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    type: req.body.type
  }).then(function(participant) {
    res.json(participant);
  });
});

app.post('/participant/delete', function(req, res) {
 Participant.destroy({
    where: {
        id: req.body.id
    }
  }).then(function(participant) {
    res.json(participant);
  });
});

app.post('/participant/update', function(req, res) {
 Participant.update({
    name: req.body.name,
    address: req.body.address,
    type: req.body.type
  }, {
      where: {
          id: req.body.id
      } 
  }).then(function(participant) {
    res.json(participant);
  });
});


//  MODELS ************

var Judge = sequelize.define('Judge', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    room: {
        type: Sequelize.INTEGER
    },
    ext: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'judge'
});

var Courtroom = sequelize.define('Courtroom', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    number: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: 'courtroom'
});

var Participant = sequelize.define('Participant', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING,
        values: ['claimant', 'respondent']
    }
}, {
    tableName: 'participant'
});

var Case = sequelize.define('Case', {
    start_date: {
        type: Sequelize.DATE
    },
    duration: {
        type: Sequelize.INTEGER
    },
    result: {
        type: Sequelize.BOOLEAN
    }
}, {
    tableName: 'case'
});

Case.belongsTo(Judge, { foreignKey: 'judge_id', primaryKey: true});
Case.belongsTo(Participant, { foreignKey: 'claimant_id', primaryKey: true });
Case.belongsTo(Participant, { foreignKey: 'respondent_id', primaryKey: true});
Case.belongsTo(Courtroom, {foreignKey: 'courtroom_id', primaryKey: true});

//TEST DATA *********

Judge.sync().then(function () {
  return Judge.create({
    id: 1234,
    name: 'Hancock',
    room: 1,
    ext: 'ext1'
  });
});

Courtroom.sync().then(function () {
  return Courtroom.create({
    id: 123,
    number: 22
  });
});

Participant.sync().then(function () {
  return Participant.create({
    id: 12345,
    name: 'Clarke',
    address: '25 Milsltead',
    type: 'claimant'
  });
});

Participant.sync().then(function () {
  return Participant.create({
    id: 12346,
    name: 'John',
    address: '24 Millstead',
    type: 'respondent'
  });
});

Case.sync().then(function () {
    return Case.create({
    id: 1,
    judge_id: 1234,
    courtroom_id: 123,
    claimant_id: 12345,
    respondent_id: 12346,
    start_date: 211017,
    duration: 100,
    result: true
    });
});




