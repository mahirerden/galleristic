module.exports = function(sequelize, DataTypes) {
  var Arts = sequelize.define("Arts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  // Associate with Artist
  Arts.associate = function(models) {
    // We're saying that a Arts should belong to an Artist
    // An Art can't be created without an Artist due to the foreign key constraint
    Arts.belongsTo(models.Artist, {
      foreignKey: {
        allowNull: false
      }
    });
    
    Arts.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });

    Arts.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Arts;
};
