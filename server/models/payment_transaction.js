const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_transaction', {
    payt_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    payt_trx_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('trx_number')
    },
    payt_order_number: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    payt_baac_acc_bank: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    payt_trx_number_ref: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    payt_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    payt_debet: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payt_credit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payt_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    payt_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    payt_promo_point: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payt_acc_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'account_payment',
        key: 'acc_number'
      }
    }
  }, {
    sequelize,
    tableName: 'payment_transaction',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payt_id_pk",
        unique: true,
        fields: [
          { name: "payt_id" },
        ]
      },
    ]
  });
};
