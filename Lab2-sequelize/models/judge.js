'use strict';
module.exports = function(sequelize, DataTypes) {
  var Judge = sequelize.define('Judge', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    room: DataTypes.INTEGER,
    ext: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Judge.hasMany(models.Case);
      }
    }
  }, {
    tableName: 'judge'
  });
  return Judge;
};