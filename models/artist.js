var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    islocal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Artist.associate = function(models) {
    // Associating Artist with Arts
    // When an Artist is deleted, also delete any associated Arts
    Artist.hasMany(models.Arts, {
      onDelete: "cascade"
    });
  };

  return Artist;
};
