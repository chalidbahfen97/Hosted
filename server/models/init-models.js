import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect : "postgres",
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000,
    }
  }
)

const DataTypes = require("sequelize").DataTypes;
const _account_payment = require("./account_payment");
const _address = require("./address");
const _bank = require("./bank");
const _bank_account = require("./bank_account");
const _hosted = require("./hosted");
const _houses = require("./houses");
const _houses_bedroom = require("./houses_bedroom");
const _houses_images = require("./houses_images");
const _houses_reserve = require("./houses_reserve");
const _houses_reserve_lines = require("./houses_reserve_lines");
const _houses_reviews = require("./houses_reviews");
const _orders = require("./orders");
const _payment_transaction = require("./payment_transaction");
const _users = require("./users");

const initModels =(sequelize)=> {
  const account_payment = _account_payment(sequelize, DataTypes);
  const address = _address(sequelize, DataTypes);
  const bank = _bank(sequelize, DataTypes);
  const bank_account = _bank_account(sequelize, DataTypes);
  const hosted = _hosted(sequelize, DataTypes);
  const houses = _houses(sequelize, DataTypes);
  const houses_bedroom = _houses_bedroom(sequelize, DataTypes);
  const houses_images = _houses_images(sequelize, DataTypes);
  const houses_reserve = _houses_reserve(sequelize, DataTypes);
  const houses_reserve_lines = _houses_reserve_lines(sequelize, DataTypes);
  const houses_reviews = _houses_reviews(sequelize, DataTypes);
  const orders = _orders(sequelize, DataTypes);
  const payment_transaction = _payment_transaction(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  payment_transaction.belongsTo(account_payment, {foreignKey: "payt_acc_number"});
  account_payment.hasMany(payment_transaction, {foreignKey: "payt_acc_number"});
  
  bank_account.belongsTo(bank, {foreignKey: "baac_bank_id"});
  bank.hasMany(bank_account, {foreignKey: "baac_bank_id"});

  houses.belongsTo(hosted, {foreignKey: "house_hosted_account"});
  hosted.hasMany(houses, {foreignKey: "house_hosted_account"});
  
  houses_bedroom.belongsTo(houses, {foreignKey: "hobed_house_id"});
  houses.hasMany(houses_bedroom, {foreignKey: "hobed_house_id"});

  houses_images.belongsTo(houses, {foreignKey: "hoim_house_id"});
  houses.hasMany(houses_images, {foreignKey: "hoim_house_id"});

  houses_reserve_lines.belongsTo(houses, {foreignKey: "hrit_houses_id"});
  houses.hasMany(houses_reserve_lines, {foreignKey: "hrit_houses_id"});

  houses_reviews.belongsTo(houses, {foreignKey: "hore_house_id"});
  houses.hasMany(houses_reviews, {foreignKey: "hore_house_id"});

  houses_reserve_lines.belongsTo(houses_bedroom, {foreignKey: "hrit_hobed_id"});
  houses_bedroom.hasMany(houses_reserve_lines, {foreignKey: "hrit_hobed_id"});

  houses_reserve_lines.belongsTo(houses_reserve, {foreignKey: "hrit_hove_id"});
  houses_reserve.hasMany(houses_reserve_lines, {foreignKey: "hrit_hove_id"});

  houses_reserve_lines.belongsTo(orders, {foreignKey: "hrit_order_name"});
  orders.hasMany(houses_reserve_lines, {foreignKey: "hrit_order_name"});

  account_payment.belongsTo(users, {foreignKey: "acc_user_id"});
  users.hasMany(account_payment, {foreignKey: "acc_user_id"});

  address.belongsTo(users, {foreignKey: "addr_user_id"});
  users.hasMany(address, {foreignKey: "addr_user_id"});

  bank_account.belongsTo(users, {foreignKey: "baac_user_id"});
  users.hasMany(bank_account, {foreignKey: "baac_user_id"});

  hosted.belongsTo(users, {foreignKey: "hosted_user_id"});
  users.hasMany(hosted, {foreignKey: "hosted_user_id"});

  houses_reserve.belongsTo(users, {foreignKey: "hove_user_id"});
  users.hasMany(houses_reserve, {foreignKey: "hove_user_id"});

  houses_reviews.belongsTo(users, {foreignKey: "hore_user_id"});
  users.hasMany(houses_reviews, {foreignKey: "hore_user_id"});

  orders.belongsTo(users, {foreignKey: "order_user_id"});
  users.hasMany(orders, {foreignKey: "order_user_id"});

  return {
    account_payment,
    address,
    bank,
    bank_account,
    hosted,
    houses,
    houses_bedroom,
    houses_images,
    houses_reserve,
    houses_reserve_lines,
    houses_reviews,
    orders,
    payment_transaction,
    users,
  };
}

const models = initModels(sequelize);

export default models;
export {sequelize};

/*
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
*/