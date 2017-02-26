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

app.get('/case/:id', function(req, res) {
 Case.findAll({
    where: {
        id: req.params.id
    }
  }).then(function(result) {
    res.json(result);
  });
});

app.get('/case/create/:id/judge_id/:judge_id/courtroom_id/:courtroom_id/respondent_id/:respondent_id/claimant_id/:claimant_id/start_date/:start_date/duration/:duration/result/:result', function(req, res) {
 Case.create({
    id: req.params.id,
    judge_id: req.params.judge_id,
    courtroom_id: req.params.courtroom_id,
    respondent_id: req.params.respondent_id,
    claimant_id: req.params.claimant_id,
    start_date: req.params.start_date,
    duration: req.params.duration,
    result: req.params.result
  }).then(function(result) {
    res.json(result);
  });
});

app.get('/case/delete/:id', function(req, res) {
 Case.destroy({
    where: {
        id: req.params.id
    }
  }).then(function(result) {
    res.json(result);
  });
});

app.get('/case/update/:id/judge_id/:judge_id/courtroom_id/:courtroom_id/respondent_id/:respondent_id/claimant_id/:claimant_id/start_date/:start_date/duration/:duration/result/:result', function(req, res) {
 Case.update({
    judge_id: req.params.judge_id,
    courtroom_id: req.params.courtroom_id,
    respondent_id: req.params.respondent_id,
    claimant_id: req.params.claimant_id,
    start_date: req.params.start_date,
    duration: req.params.duration,
    result: req.params.result
  }, {
      where: {
          id: req.params.id
      } 
  }).then(function(result) {
    res.json(result);
  });
});

// COURTROOM ********

app.get('/courtroom/:id', function(req, res) {
 Courtroom.findAll({
    where: {
        id: req.params.id
    }
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

app.get('/courtroom/create/:id/number/:number', function(req, res) {
 Courtroom.create({
    id: req.params.id,
    number: req.params.number
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

app.get('/courtroom/delete/:id', function(req, res) {
 Courtroom.destroy({
    where: {
        id: req.params.id
    }
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

app.get('/courtroom/update/:id/number/:number', function(req, res) {
 Courtroom.update({
    number: req.params.number
  }, {
      where: {
          id: req.params.id
      } 
  }).then(function(courtroom) {
    res.json(courtroom);
  });
});

// JUDGE *******

app.get('/judge/:id', function(req, res) {
    console.log('ss');
  Judge.findAll({
    where: {
        id: req.params.id
    }
  }).then(function(judge) {
    res.json(judge);
  });
});

app.get('/judge/create/:id/name/:name/room/:room/ext/:ext', function(req, res) {
    console.log('dasdas');
  Judge.create({
    id: req.params.id,
    name: req.params.name,
    room: req.params.room,
    ext: req.params.ext
  }).then(function(user) {
    res.json(user);
  });
});

app.get('/judge/delete/:id', function(req, res) {
  Judge.destroy({
   where: {
       id: req.params.id
   }
  }).then(function(judge) {
    res.json(judge);
  });
});

app.get('/judge/update/:id/name/:name/room/:room/ext/:ext', function(req, res) {
  Judge.update({
    name: req.params.name,
    room: req.params.room,
    ext: req.params.ext
  }, {
      where: {
          id: req.params.id
      }
  }).then(function(user) {
    res.json(user);
  });
});

// PARTICIPANT ********

app.get('/participant/:id', function(req, res) {
 Participant.findAll({
    where: {
        id: req.params.id
    }
  }).then(function(participant) {
    res.json(participant);
  });
});

app.get('/participant/create/:id/name/:name/address/:address/type/:type', function(req, res) {
 Participant.create({
    id: req.params.id,
    name: req.params.name,
    address: req.params.address,
    type: req.params.type
  }).then(function(participant) {
    res.json(participant);
  });
});

app.get('/participant/delete/:id', function(req, res) {
 Participant.destroy({
    where: {
        id: req.params.id
    }
  }).then(function(participant) {
    res.json(participant);
  });
});

app.get('/participant/update/:id/name/:name/address/:address/type/:type', function(req, res) {
 Participant.update({
    name: req.params.name,
    address: req.params.address,
    type: req.params.type
  }, {
      where: {
          id: req.params.id
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

// Judge.sync().then(function () {
//   return Judge.create({
//     id: 1234,
//     name: 'Hancock',
//     room: 1,
//     ext: 'ext1'
//   });
// });

// Courtroom.sync().then(function () {
//   return Courtroom.create({
//     id: 123,
//     number: 22
//   });
// });

// Participant.sync().then(function () {
//   return Participant.create({
//     id: 12345,
//     name: 'Clarke',
//     address: '25 Milsltead',
//     type: 'claimant'
//   });
// });

// Participant.sync().then(function () {
//   return Participant.create({
//     id: 12346,
//     name: 'John',
//     address: '24 Millstead',
//     type: 'respondent'
//   });
// });

// Case.sync().then(function () {
//     return Case.create({
//     id: 1,
//     judge_id: 1234,
//     courtroom_id: 123,
//     claimant_id: 12345,
//     respondent_id: 12346,
//     start_date: 211017,
//     duration: 100,
//     result: true
//     });
// });




