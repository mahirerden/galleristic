module.exports = function(sequelize, DataTypes) {
  var Arts = sequelize.define("Arts", {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    file: {
      type: DataTypes.TEXT,
      len: [1]
    },
  comment: {
  type: DataTypes.TEXT,
  len: [1]
  }
  });

  // Associate with Artist
  Arts.associate = function(models) {
    // We're saying that a Arts should belong to an Artist
    // An Art can't be created without an Artist due to the foreign key constraint
    Arts.belongsTo(models.Artist, {
      foreignKey: {
        allowNull: true
      }
    });
    
    Arts.belongsTo(models.Category, {
      foreignKey: {
        allowNull: true
      }
    });

    Arts.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Arts;
};
