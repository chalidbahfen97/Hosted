const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses', {
    house_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    house_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    house_title: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    house_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    house_bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    house_occupied: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    house_beds: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    house_baths: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    house_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    house_province: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    house_city: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    house_country: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    house_latitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    house_longitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    house_offer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    house_approval: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    house_hosted_account: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'hosted',
        key: 'hosted_acc'
      }
    }
  }, {
    sequelize,
    tableName: 'houses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "house_id_pk",
        unique: true,
        fields: [
          { name: "house_id" },
        ]
      },
    ]
  });
};
