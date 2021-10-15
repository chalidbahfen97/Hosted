const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses_images', {
    hoim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hoim_url_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hoim_filesize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hoim_filetype: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    hoim_house_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'houses',
        key: 'house_id'
      }
    }
  }, {
    sequelize,
    tableName: 'houses_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "hoim_id_pk",
        unique: true,
        fields: [
          { name: "hoim_id" },
        ]
      },
    ]
  });
};
