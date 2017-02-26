'use strict';
module.exports = function(sequelize, DataTypes) {
  var Participant = sequelize.define('Participant', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Participant.hasMany(models.Case);
      }
    }
  }, {
    tableName: 'participant'
  });
  return Participant;
};