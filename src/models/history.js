'use strict';

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/imagesearch');

var History = db.define('history', {
  searchTerm: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  }
});

module.exports = {
  History
}
