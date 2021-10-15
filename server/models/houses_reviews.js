const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses_reviews', {
    hore_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hore_comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hore_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hore_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    hore_house_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'houses',
        key: 'house_id'
      }
    }
  }, {
    sequelize,
    tableName: 'houses_reviews',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hore_id_pk",
        unique: true,
        fields: [
          { name: "hore_id" },
        ]
      },
    ]
  });
};
