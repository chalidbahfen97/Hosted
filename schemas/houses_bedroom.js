const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses_bedroom', {
    hobed_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hobed_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    hobed_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hobed_service_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hobed_house_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'houses',
        key: 'house_id'
      }
    },
    hobed_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'houses_bedroom',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hobed_id_pk",
        unique: true,
        fields: [
          { name: "hobed_id" },
        ]
      },
    ]
  });
};
