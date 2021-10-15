const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses_reserve', {
    hove_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hove_created: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hove_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    hove_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'houses_reserve',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hove_id_pk",
        unique: true,
        fields: [
          { name: "hove_id" },
        ]
      },
    ]
  });
};
