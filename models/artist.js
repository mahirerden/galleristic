module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
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
