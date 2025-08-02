const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.Transaction = require("./transaction.model")(sequelize, DataTypes);
db.User = require("./user.model")(sequelize, DataTypes);
db.Product = require("./product.model")(sequelize, DataTypes);
// db.User = require("../../user_service/models/user.model")(sequelize, DataTypes);
// db.Product = require("../../product_service/models/product.model")(sequelize,DataTypes);
// Object.keys(db).forEach((modelName) => {
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

module.exports = db;
