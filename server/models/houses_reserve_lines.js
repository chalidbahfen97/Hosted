const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses_reserve_lines', {
    hrit_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hrit_checkin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hrit_checkout: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hrit_adult: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hrit_children: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hrit_infant: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hrit_total_nights: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hrit_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hrit_service_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hrit_subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    hrit_houses_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'houses',
        key: 'house_id'
      }
    },
    hrit_hove_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'houses_reserve',
        key: 'hove_id'
      }
    },
    hrit_hobed_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'houses_bedroom',
        key: 'hobed_id'
      }
    },
    hrit_order_name: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'orders',
        key: 'order_name'
      }
    }
  }, {
    sequelize,
    tableName: 'houses_reserve_lines',
    schema: 'public',
    timestamps: false
  });
};
