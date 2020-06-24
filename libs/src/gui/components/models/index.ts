'use strict';

import fs from 'fs';
import path from 'path';
import * as Sequelize from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = { sequelize: null as Sequelize.Sequelize, Sequelize: Sequelize };

let sequelize: Sequelize.Sequelize;
if (config.use_env_variable) {
  db.sequelize = new Sequelize.Sequelize(
    process.env[config.use_env_variable],
    config
  );
} else {
  db.sequelize = new Sequelize.Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
export = db;
